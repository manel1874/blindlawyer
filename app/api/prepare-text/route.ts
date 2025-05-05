import { NextResponse } from "next/server";
import { formatter } from "blinddocumind/extractor/src/services/formatter"; // Using blinddocumind for PDF processing
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

require('dotenv').config({ override: true });
// Make sure environment variables are available to blinddocumind
if (process.env.OPENAI_BASE_URL) {
  process.env.BASE_URL = process.env.OPENAI_BASE_URL;
}

export const dynamic = "force-dynamic";

// Define the local storage directory - make sure this directory exists and is writable
const UPLOAD_DIR = join(process.cwd(), "uploads");

export const POST = async (req: Request) => {
  try {
    // Handle file upload
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create the upload directory if it doesn't exist
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
      console.error("Error creating upload directory:", error);
    }

    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}.${fileExt}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // Convert file to buffer and save it locally
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    await writeFile(filePath, uint8Array);

    // Extract text using blinddocumind if needed
    // You can use the local file path directly if your blinddocumind version supports it
    // or you can create a file:// URL

    // Use blinddocumind directly
    const extractedText = await formatter.plaintext({ file: filePath, model: process.env.OPENAI_MODEL });

    return NextResponse.json({
      extractedText: extractedText,
      fileUrl: filePath,
    });
  } catch (error: any) {
    console.error("Error in prepare-text API route:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
};
import { NextResponse } from "next/server";
import { extract, formatter } from "documind"; // Using documind for PDF processing
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

// Make sure environment variables are available to documind
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
    
    // Extract text using documind if needed
    // You can use the local file path directly if your documind version supports it
    // or you can create a file:// URL

    // Use documind directly
    const fileUrl = `file://${filePath}`;
    console.log(fileUrl);
    // const extractedText = await formatter.plaintext({ file: fileUrl, model: "12fasdf1" });

    return NextResponse.json({
    //   text: extractedText,
      localFilePath: filePath,
      fileName: fileName,
      fileSize: uint8Array.length,
      fileUrl: fileUrl,
      success: true
    });
  } catch (error: any) {
    console.error("Error in prepare-text API route:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
};



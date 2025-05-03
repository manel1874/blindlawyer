import { NextResponse } from "next/server";
import { extract } from "nildocumind/extractor/src/services/extract";
import { v4 as uuidv4 } from "uuid";

interface Issue {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface Section {
  id: string;
  type: string;
  range: [number, number];
}

export const dynamic = "force-dynamic";

// Normalize function to handle whitespace and special characters
function normalizeText(text: string) {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const fileUrl = body.fileUrl;
    const extractedText = body.extractedText;
    
    if (!fileUrl) {
      return NextResponse.json({ error: "File URL is required" }, { status: 400 });
    }

    if (!extractedText) {
      return NextResponse.json({ error: "Extracted text is required" }, { status: 400 });
    }

    // Analyze the contract
    const analyzedText = await extract({
      file: fileUrl,
      schema: [
        {
          name: "contractSuggestions",
          type: "array",
          description: "An array of clause suggestions extracted from the contract document.",
          children: [
            { name: "type", type: "string", description: "Clause type." },
            { name: "title", type: "string", description: "Clause title." },
            { name: "description", type: "string", description: "Clause description." },
            { name: "exactClause", type: "string", description: "Exact text of the clause." },
          ],
        },
      ],
      model: process.env.OPENAI_MODEL,
    });

    const suggestions = analyzedText?.data?.contractSuggestions || [];
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      return NextResponse.json({ error: "No contract suggestions found." }, { status: 400 });
    }

    // Initialize result with explicit types
    const result: { issues: Issue[]; sections: Section[] } = {
      issues: [],
      sections: [],
    };

    for (const suggestion of suggestions) {
      const id = uuidv4(); // Generate a unique ID
      const type = suggestion.type.toLowerCase();

      // Add to issues array
      result.issues.push({
        id,
        type,
        title: suggestion.title,
        description: suggestion.description,
      });

      let start = 0;
      let end = 0;

      // Find the range for `exactClause`
      const normalizedExtractedText = normalizeText(extractedText);
      const normalizedClause = normalizeText(suggestion.exactClause.slice(0, 3));

      // Use includes instead of exact match with indexOf
      const hasMatch = normalizedExtractedText.includes(normalizedClause);

      if (!hasMatch) {
        console.warn(`Could not find exactClause in extracted text: ${suggestion.normalizedClause}`);
        // Optional: Implement fuzzy matching here
      } else {
        // Find the actual position in the original text
        start = extractedText.toLowerCase().indexOf(suggestion.exactClause.toLowerCase());
        end = start + suggestion.exactClause.length;
      }

      // Add to sections array
      result.sections.push({
        id,
        type,
        range: [start, end],
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error || "An unknown error occurred" },
      { status: 500 }
    );
  }
};

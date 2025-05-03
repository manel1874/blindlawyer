export async function prepareText(file: File): Promise<{ extractedText: string, fileUrl: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the API route
    const res = await fetch('/api/prepare-text', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Failed to prepare text');
    }

    const { extractedText, fileUrl }: { extractedText: string, fileUrl: string } = await res.json();
    return { extractedText, fileUrl };
  } catch (error: any) {
    console.error('Error preparing text:', error.message);
    throw error;
  }
}

  
  export async function analyzeContract(fileUrl: string, extractedText: string) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl, extractedText }),
      });
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
    
      return data.result;
    } catch (error) {
      console.error('Error extracting text:', error);
      throw error;
    }
  }
  



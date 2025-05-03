"use client";

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { prepareText } from '@/lib/actions';

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  onFileUrl: (fileUrl: string) => void;
}

export default function FileUpload({ onTextExtracted, onFileUrl }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = async (file: File) => {
    try {
      setIsProcessing(true);
      const { fileUrl, extractedText } = await prepareText(file);
      onTextExtracted(extractedText);
      onFileUrl(fileUrl);
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        if (file.type === "application/pdf") {
          await processFile(file);
        }
      }
    },
    [onTextExtracted]
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        await processFile(file);
      }
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging ? "border-[#7834b5] bg-[#7834b5]/5" : "border-gray-700",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center gap-4">
        <Upload className="h-12 w-12 text-[#7834b5]" />
        <div className="space-y-2">
          <p className="text-lg font-medium text-white font-vietnam">
          {isProcessing ? (
           <div className="w-full py-4 flex flex-col items-center">
           <div className="flex items-center space-x-2 text-[#7834b5] mb-3">
             <div className="w-4 h-4 rounded-full bg-[#7834b5] animate-pulse"></div>
             <div className="w-4 h-4 rounded-full bg-[#7834b5] animate-pulse delay-150"></div>
             <div className="w-4 h-4 rounded-full bg-[#7834b5] animate-pulse delay-300"></div>
           </div>
           <p className="text-sm text-center text-gray-300">
             Processing your document through Nillion's secure blind computation...
           </p>
           <p className="text-xs text-center text-gray-400 mt-2 italic">
             Your data remains private and protected throughout analysis
           </p>
         </div>
          ) : (
              <>
                Drop your PDF here, or{" "}
                <label
                  htmlFor="file-upload"
                  className="text-[#7834b5] hover:text-[#7834b5]/90 cursor-pointer"
                >
                  browse
                </label>
              </>
            )}
          </p>
          {!isProcessing && (
            <p className="text-sm text-gray-400 font-vietnam">
              Blind processing using SecretLLM
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
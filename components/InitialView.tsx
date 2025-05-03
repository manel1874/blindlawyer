"use client";

import { useState, useEffect } from 'react';
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";

interface InitialViewProps {
  text: string;
  fileUrl: string;
  onTextChange: (text: string) => void;
  onTextExtracted: (text: string) => void;
  onFileUrl: (fileUrl: string) => void;
  onAnalyze: () => void;
}

export default function InitialView({
  text,
  fileUrl,
  onTextChange,
  onTextExtracted,
  onFileUrl,
  onAnalyze,
}: InitialViewProps) {

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
        <FileUpload onTextExtracted={onTextExtracted} onFileUrl={onFileUrl} />
        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>

        </div>

        <Textarea
          placeholder="Your processed contract text here..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[300px] bg-white/5 border-gray-700 text-gray-200 placeholder:text-gray-500 font-ghost"
        />

        <Button
          onClick={onAnalyze}
          disabled={!text}
          className="w-full mt-6 bg-[#7834b5] hover:bg-[#041b87]/90 text-white py-6 rounded-xl text-lg font-ghost transition-colors"
        >
          <FileText className="mr-2 h-5 w-5" />
          Analyze Contract
        </Button>
      </div>
    </div>
  );
}
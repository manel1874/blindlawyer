"use client";

import { useState } from "react";
import { analyzeContract } from '@/lib/actions';
import AnalysisView from "@/components/analysis/AnalysisView";
import InitialView from "@/components/InitialView";
import LoadingView from "@/components/LoadingView";

export default function Home() {
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ issues: any[]; sections: any[] } | null>(null);
  // State to store the analysis result

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    const analysis = await analyzeContract(fileUrl, text);
    setAnalysisResult(analysis); // Store the analysis result in state
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleTextExtracted = (extractedText: string) => {
    setText(extractedText);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <img 
            src="/blindlawyer.png" 
            alt="blindlawyer" 
            width={150} 
            height={150} 
            className="mb-4" // Margin bottom for spacing between image and text
          />
        </div>
        <h1 className="font-arizona text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4">
          Blind Lawyer
        </h1>
        <p className="text-gray-400 text-center text-lg mb-12 font-ghost">
          What would you like me to analyze in this secure chamber?
        </p>

        {isAnalyzing ? (
          <LoadingView />
        ) : !analysisComplete ? (
          <InitialView
            text={text}
            fileUrl={fileUrl}
            onTextChange={setText}
            onTextExtracted={handleTextExtracted}
            onFileUrl={setFileUrl}
            onAnalyze={handleAnalysis}
          />
        ) : (
          <AnalysisView text={text} analysis={analysisResult!} />
        )}
      </div>
      {/* "max-w-[1400px] mx-auto px-4 py-8" */}
      <div className="flex flex-col text-center mt-auto px-4 gap-2 max-w-[600px] mx-auto">
        <p className="text-gray-400 text-center text-lg mb-12 font-ghost">
          Blind Lawyer is a tool that uses 
          <a href="https://docs.nillion.com/build/secretLlm/overview?utm_source=blind_guru" target="_blank" className="underline text-white"> nilAI (SecretLLM) </a>
          to analyze contracts and legal documents for potential issues.
        </p>
      </div>
    </main>
  );
}
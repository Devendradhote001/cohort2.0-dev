import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody, ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { resumeText } = body;

    if (!resumeText)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 }
      );

    const prompt = `
      You are an expert ATS (Applicant Tracking System) evaluator, technical recruiter, and resume reviewer.
      
      Analyze the resume content below and provide an ATS assessment.
      
      Resume Content:
      ${resumeText}
      
      Rules:
      
      1. Evaluate the resume based on:
         - ATS keyword optimization
         - Professional summary quality
         - Work experience quality
         - Skills relevance
         - Project descriptions
         - Readability and clarity
         - Action-oriented language
         - Overall resume effectiveness
      
      2. Assign an ATS score between 0 and 100.
      
      3. Provide:
         - Overall ATS score
         - Strengths
         - Areas for improvement
         - ATS optimization recommendations
      
      4. Be realistic and objective.
      5. Do not inflate scores unnecessarily.
      6. If important sections are missing, deduct points accordingly.
      7. Recommendations should be actionable and ATS-focused.
      8. Return ONLY valid JSON.
      9. Do not include markdown, code blocks, explanations, or additional text.
      
      Required JSON Format:
      
      {
        "atsScore": 85,
        "summary": "Brief overall assessment of the resume.",
        "strengths": [
          "Strong technical keyword coverage",
          "Well-structured experience section",
          "Relevant project descriptions"
        ],
        "improvements": [
          "Add more measurable achievements",
          "Include additional industry-specific keywords",
          "Strengthen professional summary"
        ],
        "recommendations": [
          "Quantify accomplishments with metrics where possible",
          "Align keywords more closely with target job descriptions",
          "Expand project impact descriptions"
        ]
      }
      
      Output:
      Return ONLY the JSON object.
      `;

    const result = await generateAiContent(prompt);

    const AtsScore = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "AtsScore created",
        data: {
          AtsScore,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error in AtsScore api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

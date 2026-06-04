import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody, ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();

    const { content } = body;

    if (!content)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 }
      );

    const prompt = `
      You are an expert resume writer, ATS optimization specialist, and technical recruiter.
      
      Your task is to improve the following resume content while preserving its original meaning and intent.
      
      Resume Content:
      ${content}
      
      Rules:
      
      1. Return ONLY the improved content.
      2. Do NOT add headings, labels, explanations, notes, comments, markdown, or formatting.
      3. Improve grammar, spelling, punctuation, and sentence structure.
      4. Rewrite the content to sound more professional, concise, and impactful.
      5. Optimize the content for ATS (Applicant Tracking System) compatibility.
      6. Replace weak or generic language with strong, professional, achievement-oriented wording.
      7. Use industry-standard resume terminology and action verbs where appropriate.
      8. Improve readability and clarity without changing the core information.
      9. Preserve all important skills, technologies, responsibilities, and achievements mentioned in the original content.
      10. Do NOT invent experience, achievements, certifications, projects, skills, companies, or qualifications that are not present in the original content.
      11. Remove redundant words, filler phrases, and unnecessary repetition.
      12. Ensure the content sounds natural and written by a professional.
      13. Maintain the same content type:
          - If the input is a resume summary, return an improved resume summary.
          - If the input is a work experience description, return an improved work experience description.
          - If the input is a project description, return an improved project description.
          - If the input is a skills section, return an improved skills section.
      14. Use ATS-friendly keywords whenever they naturally fit the existing content.
      15. Keep the output length similar to the original unless improvements require minor expansion or reduction.
      16. Do NOT use first-person pronouns such as "I", "me", or "my".
      17. Return plain text only.
      
      Output:
      Return ONLY the improved ATS-friendly resume content.
      `;

    const result = await generateAiContent(prompt);

    const improvedContent = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "improvedContent created",
        data: {
          improvedContent,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error in improvedContent api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

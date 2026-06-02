import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateSummaryBody = await req.json();

        const { experienceLevel, skills, jobTitle } = body;

        if (!experienceLevel || !skills || !jobTitle)
            return NextResponse.json<ApiResponse>({
                success: false, message: "Missing fields"
            }, { status: 400 });

        const prompt = `
        You are an expert resume writer and ATS optimization specialist.
        
        Generate a professional ATS-friendly resume summary using the details below.
        
        Job Title:
        ${jobTitle}
        
        Skills:
        ${skills}
        
        Experience Level:
        ${experienceLevel}
        
        Rules:
        1. Write ONLY the resume summary.
        2. The summary MUST be between 50 and 80 words.
        3. Do not generate headings, titles, labels, bullet points, numbering, markdown, or explanations.
        4. Naturally incorporate the provided job title and key skills.
        5. Use ATS-friendly keywords relevant to the role.
        6. Highlight professional strengths, technical expertise, and value to employers.
        7. Adapt the content based on experience level:
           - Fresher: focus on academic projects, learning ability, and foundational skills.
           - Mid-Level: focus on practical experience, ownership, and contributions.
           - Senior-Level: focus on leadership, strategy, mentoring, and business impact.
        8. Avoid generic phrases such as "hardworking", "team player", or "seeking opportunities".
        9. Do not use first-person pronouns (I, me, my).
        10. Ensure the summary is concise, impactful, professional, and tailored to the provided role.
        11. Optimize for ATS systems while maintaining natural readability.
        12. Return plain text only.
        13. The final output must contain a minimum of 50 words and a maximum of 80 words.
        
        Output:
        Return only the resume summary text.
        `;

        const result = await generateAiContent(prompt);

        const summary = result;

        return NextResponse.json<ApiResponse>({
            success: true, message: "Summary created", data: {
                summary
            }
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error in Generate summary api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}

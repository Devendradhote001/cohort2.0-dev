import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateExperienceDescriptionBody = await req.json();

        const { experienceLevel, yearsOfExperience, techStack, jobRole } = body;

        if (!experienceLevel || !jobRole || !techStack)
            return NextResponse.json<ApiResponse>({
                success: false, message: "Missing fields"
            }, { status: 400 });

        const prompt = `
            You are an expert resume writer, ATS optimization specialist, and technical recruiter.
            
            Generate a professional ATS-friendly work experience description based on the details below.
            
            Job Role:
            ${jobRole}
            
            Experience Level:
            ${experienceLevel}
            
            Years of Experience:
            ${yearsOfExperience}
            j
            Tech Stack:
            ${techStack}
            
            Rules:
            
            1. Generate ONLY the work experience description.
            2. Do NOT generate company names, dates, locations, headings, titles, labels, bullet points, numbering, or explanations.
            3. The description must be between 80 and 150 words.
            4. Write in a professional resume style optimized for ATS systems.
            5. Naturally incorporate the technologies from the provided tech stack.
            6. Describe realistic responsibilities, technical contributions, and achievements expected from someone with the specified role and years of experience.
            7. Use strong action verbs such as Developed, Designed, Implemented, Built, Integrated, Optimized, Automated, Collaborated, Engineered, and Maintained.
            8. Highlight technical problem-solving, performance improvements, scalability, system reliability, code quality, and business impact where appropriate.
            9. Do NOT use first-person pronouns such as "I", "me", or "my".
            10. Avoid generic phrases, buzzwords, and filler content.
            11. Adapt the complexity of responsibilities according to the experience level and years of experience:
                - Fresher (0-1 years): Focus on internships, training, debugging, feature implementation, and learning.
                - Junior (1-3 years): Focus on feature development, API integration, bug fixing, testing, and collaboration.
                - Mid-Level (3-6 years): Focus on ownership of modules, performance optimization, architecture decisions, and mentoring junior developers.
                - Senior (6+ years): Focus on system design, technical leadership, scalability, architecture, code reviews, and strategic technical decisions.
            12. Include ATS-friendly keywords relevant to the provided role.
            13. Make the description realistic and suitable for a professional resume.
            14. Return plain text only.
            15. Do not mention years of experience directly in the output unless it fits naturally within the description.
            
            Output:
            Return ONLY the work experience description text.
            `;

        const result = await generateAiContent(prompt);

        let workExperienceDescription = result;


        return NextResponse.json<ApiResponse>({
            success: true, message: "workExperienceDescription created", data: {
                workExperienceDescription
            }
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error in workExperienceDescription generation api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}

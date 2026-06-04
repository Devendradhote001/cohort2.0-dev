"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  const { resumeId } = useParams();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      console.log("main resume in data", data);

      setResume(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Actions */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border sticky top-6">
              <h2 className="font-bold text-xl mb-6">Resume Actions</h2>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 bg-violet-600 text-white px-4 py-3 rounded-xl">
                  <Sparkles size={18} />
                  ATS Score
                </button>

                <button className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl">
                  <Download size={18} />
                  Download PDF
                </button>

                <button className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl">
                  <Eye size={18} />
                  Edit Resume
                </button>
              </div>
            </div>
          </div>

          {/* Resume */}

          <div className="lg:col-span-3">
            <div
              id="resume-preview"
              className="bg-white shadow-lg rounded-lg p-10"
            >
              {/* Header */}

              <div className="border-b pb-6">
                <h1 className="text-4xl font-bold">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="mt-3 text-gray-600 text-sm flex flex-wrap gap-4">
                  <span>{resume.personalInfo?.email}</span>

                  <span>{resume.personalInfo?.mobile}</span>

                  <span>{resume.personalInfo?.location}</span>
                </div>

                <div className="mt-2 flex gap-4 text-sm">
                  <span>{resume.personalInfo?.github}</span>

                  <span>{resume.personalInfo?.portfolio}</span>
                </div>
              </div>

              {/* Summary */}

              {resume.summary && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl mb-3">
                    Professional Summary
                  </h2>

                  <p className="text-gray-700 leading-7">{resume.summary}</p>
                </section>
              )}

              {/* Skills */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-3">Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 px-3 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Experience */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Work Experience</h2>

                {resume.workExperience?.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold">{exp.position}</h3>

                    <p className="text-gray-500 text-sm">{exp.company}</p>

                    <p className="text-sm text-gray-500">
                      {exp.startDate}
                      {" - "}
                      {exp.endDate}
                    </p>

                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Projects</h2>

                {resume.projects?.map((project, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold">{project.title}</h3>

                    <p className="mt-2 text-gray-700">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="bg-violet-100 text-violet-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Education */}

              <section className="mt-8">
                <h2 className="font-bold text-xl mb-4">Education</h2>

                {resume.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>

                    <p className="text-gray-600">{edu.institute}</p>

                    <p className="text-sm text-gray-500">
                      {edu.startDate}
                      {" - "}
                      {edu.endDate}
                    </p>
                  </div>
                ))}
              </section>

              {/* Certifications */}

              {resume.certifications?.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl mb-4">Certifications</h2>

                  <ul className="list-disc pl-5">
                    {resume.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

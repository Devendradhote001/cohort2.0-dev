"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";

interface Props {
  resumeId: any;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [
        {
          title: "",
          techStack: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.resume.projects?.length) {
        reset({
          projects: data.resume.projects.map((project: any) => ({
            ...project,
            techStack: Array.isArray(project.techStack)
              ? project.techStack.join(", ")
              : "",
          })),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const project = watch(`projects.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.resume;

      const { data } = await axios.post(
        "/api/ai/generate-project-description",
        {
          jobTitle: "web developer",
          experienceLevel: "mid-level",
          techStack: ["html", "css", "react", "nodejs"],
        }
      );
      console.log("data we get from project description", data);

      setValue(`projects.${index}.description`, data.data.projectDescription);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((project) => ({
        ...project,
        techStack: project.techStack.split(",").map((tech) => tech.trim()),
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        projects: formattedProjects,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>Step 4 of 8</span>

            <span>50%</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full">
            <div className="h-full w-[50%] bg-violet-600 rounded-full" />
          </div>
        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>

              <p className="text-slate-500 mt-2">Showcase your best work.</p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  techStack: "",
                  description: "",
                  githubUrl: "",
                  liveUrl: "",
                })
              }
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-xl"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-2xl p-6 relative">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-red-500"
                  >
                    <Trash2 />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    {...register(`projects.${index}.title`)}
                    placeholder="Project Title"
                    className="border rounded-xl p-3"
                  />

                  <input
                    {...register(`projects.${index}.techStack`)}
                    placeholder="React, Next.js, MongoDB"
                    className="border rounded-xl p-3"
                  />

                  <input
                    {...register(`projects.${index}.githubUrl`)}
                    placeholder="GitHub URL"
                    className="border rounded-xl p-3"
                  />

                  <input
                    {...register(`projects.${index}.liveUrl`)}
                    placeholder="Live URL"
                    className="border rounded-xl p-3"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      className="flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-xl"
                    >
                      <Sparkles size={18} />
                      Generate Description
                    </button>
                  </div>

                  <textarea
                    rows={5}
                    {...register(`projects.${index}.description`)}
                    placeholder="Project Description"
                    className="w-full border rounded-xl p-4"
                  />
                </div>
              </div>
            ))}

            {/* Footer */}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 border rounded-xl"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl"
              >
                {isSubmitting ? "Saving..." : "Continue"}

                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

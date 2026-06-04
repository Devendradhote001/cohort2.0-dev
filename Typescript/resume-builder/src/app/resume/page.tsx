"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, FileText, Trash2, Briefcase } from "lucide-react";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });

      console.log(response);

      const resumeId = response.data._id;
      console.log("reached...");

      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Resumes</h1>

            <p className="text-slate-500 mt-2">
              Create ATS-friendly resumes using AI.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Create Resume
          </button>
        </div>

        {/* Empty State */}

        {!loading && resumes.length === 0 && (
          <div className="bg-white rounded-3xl border p-16 text-center">
            <FileText size={70} className="mx-auto text-slate-300" />

            <h2 className="text-2xl font-semibold mt-6">No Resume Yet</h2>

            <p className="text-slate-500 mt-2">
              Create your first AI powered resume.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-xl"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl">{resume.title}</h2>

                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <Briefcase size={16} />
                    {resume.jobTitle}
                  </div>

                  <span className="inline-block mt-4 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
                    {resume.experienceLevel}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <button
                onClick={() => router.push(`/resume/${resume._id}`)}
                className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl"
              >
                Continue Building
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Create Resume</h2>

            <div className="space-y-4">
              <input
                placeholder="Resume Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobTitle: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceLevel: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              >
                <option>Fresher</option>

                <option>Junior</option>

                <option>Mid-Level</option>

                <option>Senior</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-3 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateResume}
                className="px-5 py-3 bg-violet-600 text-white rounded-xl"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

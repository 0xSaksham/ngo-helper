"use client";

import { useState } from "react";
import ReportForm from "@/app/components/ReportForm";
import { ReportFormData } from "@/types/reports";
import { submitReport } from "@/actions/reportActions";
import { toast, Toaster } from "sonner";
import { SparklesCore } from "@/app/components/ui/sparkles";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubmitReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: ReportFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitReport(formData);

      if (result.success) {
        toast.success("Report Submitted", {
          description: "Your NGO report has been successfully submitted.",
        });
        // Redirect to dashboard after successful submission
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500); // Wait for 1.5s so the user can see the success message
      } else {
        toast.error("Submission Failed", {
          description:
            result.error || "There was an error submitting your report.",
        });
      }
    } catch (error) {
      toast.warning("Submission Error", {
        description: "An unexpected error occurred. Please try again. " + error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black/90 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesform"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.2}
        />
      </div>

      <div className="max-w-2xl w-full relative z-20">
        <div className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-4 sm:p-8 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
              Submit Monthly NGO Report
            </h1>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="text-neutral-200 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-neutral-200 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="mb-8">
            <p className="text-gray-300 text-sm sm:text-base">
              Use this form to submit your NGO&apos;s monthly activities report.
              All fields are required. Don&apos;t worry if you&apos;ve already
              submitted a report for this month.
            </p>
          </div>
          <Toaster position="top-right" expand={true} richColors />
          <ReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;

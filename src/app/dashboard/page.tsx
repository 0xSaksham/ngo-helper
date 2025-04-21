"use client";

import { useEffect, useState } from "react";
import { getMonthlyStats, getMonthlyNGOReports } from "@/actions/reportActions";
import { DashboardStats, NGOReport } from "@/types/reports";
import StatsCard from "@/app/components/StatsCard";
import NGOReportList from "@/app/components/NGOReportList";
import { SparklesCore } from "@/app/components/ui/sparkles";
import Link from "next/link";
import { toast } from "sonner";
import DownloadPDFButton from "@/app/components/DownloadPDFButton";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalNgosReporting: 0,
    totalPeopleHelped: 0,
    totalEventsConducted: 0,
    totalFundsUtilized: 0,
  });
  const [reports, setReports] = useState<NGOReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set initial month to March 2025 where we have data
  const [selectedMonth, setSelectedMonth] = useState("2025-03");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both stats and reports in parallel
        const [statsResult, reportsResult] = await Promise.all([
          getMonthlyStats(selectedMonth),
          getMonthlyNGOReports(selectedMonth),
        ]);

        if (statsResult.success && statsResult.data && statsResult.data[0]) {
          const data = statsResult.data[0];
          const statsData: DashboardStats = {
            totalNgosReporting: data.total_ngos_reporting,
            totalPeopleHelped: data.total_people_helped,
            totalEventsConducted: data.total_events_conducted,
            totalFundsUtilized: data.total_funds_utilized,
          };
          setStats(statsData);
        } else {
          setError("No data available for selected month");
          setStats({
            totalNgosReporting: 0,
            totalPeopleHelped: 0,
            totalEventsConducted: 0,
            totalFundsUtilized: 0,
          });
        }

        if (reportsResult.success && reportsResult.data) {
          setReports(reportsResult.data);
        }
      } catch (error) {
        toast.error("Failed to fetch reports", {
          description: `There was an error loading the reports. Please try again. ${error}`,
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen w-full bg-black/90 relative overflow-x-hidden">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesdashboard"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.2}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-4 sm:py-8">
        <div className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-4 sm:p-8 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
              NGO Activity Dashboard
            </h1>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="text-neutral-200 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/submit-report"
                className="text-neutral-200 hover:text-white transition-colors"
              >
                Submit Report
              </Link>
            </nav>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label
                htmlFor="month"
                className="text-gray-300 whitespace-nowrap"
              >
                Select Month:
              </label>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                  type="month"
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
                />
                {reports.length > 0 && (
                  <DownloadPDFButton reports={reports} month={selectedMonth} />
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-white py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatsCard
                  title="NGOs Reporting"
                  value={stats.totalNgosReporting}
                  icon="📋"
                />
                <StatsCard
                  title="People Helped"
                  value={stats.totalPeopleHelped}
                  icon="🤝"
                />
                <StatsCard
                  title="Events Conducted"
                  value={stats.totalEventsConducted}
                  icon="🎯"
                />
                <StatsCard
                  title="Funds Utilized (₹)"
                  value={stats.totalFundsUtilized}
                  icon="💰"
                />
              </div>

              {reports.length > 0 ? (
                <NGOReportList reports={reports} />
              ) : (
                <div className="text-center text-gray-400 mt-8">
                  No NGO reports available for this month
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

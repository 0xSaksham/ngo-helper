import { NGOReport } from "@/types/reports";

interface NGOReportListProps {
  reports: NGOReport[];
}

export default function NGOReportList({ reports }: NGOReportListProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
        NGO Reports
      </h2>
      <div className="grid gap-4 sm:gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="backdrop-blur-md bg-white/5 p-4 sm:p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                  NGO ID: {report.ngo_id}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      People Helped
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-bold">
                      {report.people_helped.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      Events Conducted
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-bold">
                      {report.events_conducted.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      Funds Utilized
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-bold">
                      ₹{report.funds_utilized.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 sm:text-right">
                {report.created_at
                  ? new Date(report.created_at).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

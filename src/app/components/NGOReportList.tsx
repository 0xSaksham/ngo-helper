import { NGOReport } from "@/types/reports";

interface NGOReportListProps {
  reports: NGOReport[];
}

export default function NGOReportList({ reports }: NGOReportListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">NGO Reports</h2>
      <div className="grid gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="backdrop-blur-md bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="text-lg font-semibold text-white mb-4">
                  NGO ID: {report.ngo_id}
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">People Helped</p>
                    <p className="text-white text-2xl font-bold">
                      {report.people_helped}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">
                      Events Conducted
                    </p>
                    <p className="text-white text-2xl font-bold">
                      {report.events_conducted}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Funds Utilized</p>
                    <p className="text-white text-2xl font-bold">
                      ₹{report.funds_utilized}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
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

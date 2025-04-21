import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NGOReportPDF from "./NGOReportPDF";
import { NGOReport } from "@/types/reports";

interface DownloadPDFButtonProps {
  reports: NGOReport[];
  month: string;
}

const DownloadPDFButton = ({ reports, month }: DownloadPDFButtonProps) => {
  const [isClient, setIsClient] = useState(false);

  // React-PDF requires client-side rendering
  useState(() => {
    setIsClient(true);
  });

  if (!isClient) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={<NGOReportPDF reports={reports} month={month} />}
      fileName={`ngo-report-${month}.pdf`}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
    >
      {({ loading }) =>
        loading ? (
          <span>Preparing PDF...</span>
        ) : (
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF Report
          </span>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;

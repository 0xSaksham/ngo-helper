// Types for the Report form and data
export interface ReportFormData {
  ngo_id: string;
  people_helped: number;
  events_conducted: number;
  funds_utilized: number;
  report_month: string; // YYYY-MM format
}

// Type for individual NGO reports
export interface NGOReport {
  id: string; // Changed from number to string to match database type
  ngo_id: string;
  people_helped: number;
  events_conducted: number;
  funds_utilized: number;
  report_month: string;
  created_at: string | null; // Added null as possible value to match database type
}

// Type for the dashboard statistics
export interface DashboardStats {
  totalNgosReporting: number;
  totalPeopleHelped: number;
  totalEventsConducted: number;
  totalFundsUtilized: number;
}

// Supabase RPC function response type
export type DashboardStatsResponse = DashboardStats | null;

import { supabase } from "@/supabase/client";
import { ReportFormData } from "@/types/reports";

export async function submitReport(data: ReportFormData) {
  try {
    // Format the month correctly if needed
    const reportData = {
      ...data,
      // Make sure report_month is in YYYY-MM format
      report_month: data.report_month,
    };

    const { error } = await supabase.from("reports").insert([reportData]);

    if (error) {
      console.error("Error submitting report:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Exception while submitting report:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getMonthlyStats(month: string) {
  try {
    const { data, error } = await supabase.rpc("get_monthly_dashboard_stats", {
      report_month_param: month,
    });

    if (error) {
      console.error("Error fetching monthly stats:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception while fetching monthly stats:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}

export async function getAllReports() {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("report_month", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all reports:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception while fetching all reports:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}

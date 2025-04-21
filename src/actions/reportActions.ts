import { supabase } from "@/supabase/client";
import { ReportFormData } from "@/types/reports";

export async function submitReport(data: ReportFormData) {
  try {
    // The data structure now exactly matches the database schema
    const { error } = await supabase.from("reports").insert([
      {
        ngo_id: data.ngo_id,
        people_helped: data.people_helped,
        events_conducted: data.events_conducted,
        funds_utilized: data.funds_utilized,
        report_month: data.report_month, // Already in YYYY-MM format
      },
    ]);

    if (error) {
      console.error("Error submitting report:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
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

export async function getMonthlyNGOReports(month: string) {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("report_month", month)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching monthly NGO reports:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception while fetching monthly NGO reports:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}

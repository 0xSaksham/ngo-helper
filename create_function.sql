CREATE OR REPLACE FUNCTION get_monthly_dashboard_stats(report_month_param text)
RETURNS TABLE (
    total_ngos_reporting bigint,
    total_people_helped bigint,
    total_events_conducted bigint,
    total_funds_utilized numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT ngo_id) as total_ngos_reporting,
        COALESCE(SUM(people_helped), 0) as total_people_helped,
        COALESCE(SUM(events_conducted), 0) as total_events_conducted,
        COALESCE(SUM(funds_utilized), 0) as total_funds_utilized
    FROM reports
    WHERE report_month = report_month_param;
END;
$$ LANGUAGE plpgsql;

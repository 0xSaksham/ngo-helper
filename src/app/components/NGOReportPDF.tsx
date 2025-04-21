import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { NGOReport } from "@/types/reports";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
    color: "#1a1a1a",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 25,
    color: "#4a4a4a",
    textAlign: "center",
  },
  table: {
    width: "100%",
    marginVertical: 30,
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 12,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 14,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
  summaryBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  summaryText: {
    fontSize: 13,
    marginBottom: 8,
    color: "#4a4a4a",
    lineHeight: 1.4,
  },
});

interface NGOReportPDFProps {
  reports: NGOReport[];
  month: string;
}

const NGOReportPDF = ({ reports, month }: NGOReportPDFProps) => {
  const totalPeopleHelped = reports.reduce(
    (sum, report) => sum + report.people_helped,
    0
  );
  const totalEvents = reports.reduce(
    (sum, report) => sum + report.events_conducted,
    0
  );
  const totalFunds = reports.reduce(
    (sum, report) => sum + report.funds_utilized,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>NGO Impact Report</Text>
        <Text style={styles.subheader}>Month: {month}</Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>NGO ID</Text>
            <Text style={styles.tableCell}>People Helped</Text>
            <Text style={styles.tableCell}>Events</Text>
            <Text style={styles.tableCell}>Funds (₹)</Text>
          </View>

          {reports.map((report) => (
            <View key={report.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{report.ngo_id}</Text>
              <Text style={styles.tableCell}>{report.people_helped}</Text>
              <Text style={styles.tableCell}>{report.events_conducted}</Text>
              <Text style={styles.tableCell}>
                ₹{report.funds_utilized.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Monthly Summary</Text>
          <Text style={styles.summaryText}>
            Total NGOs Reporting: {reports.length}
          </Text>
          <Text style={styles.summaryText}>
            Total People Helped: {totalPeopleHelped.toLocaleString()}
          </Text>
          <Text style={styles.summaryText}>
            Total Events Conducted: {totalEvents.toLocaleString()}
          </Text>
          <Text style={styles.summaryText}>
            Total Funds Utilized: ₹{totalFunds.toLocaleString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default NGOReportPDF;

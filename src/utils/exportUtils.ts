
import { toast } from "sonner";

export type ExportFormat = "pdf" | "csv" | "excel";
export type ExportDateRange = { startDate: Date | null; endDate: Date | null };

export interface ExportOptions {
  format: ExportFormat;
  dateRange: ExportDateRange;
  section: string;
}

export const handleExportData = (options: ExportOptions): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate export process
    console.log("Exporting data with options:", options);
    
    // Add a small timeout to simulate processing
    setTimeout(() => {
      // Show success toast
      toast.success(
        `Données exportées en ${options.format.toUpperCase()} avec succès`,
        {
          description: `Section: ${options.section}, Période: ${options.dateRange.startDate?.toLocaleDateString() || 'Non spécifiée'} - ${options.dateRange.endDate?.toLocaleDateString() || 'Non spécifiée'}`
        }
      );
      resolve();
    }, 500);
  });
};

// Mock function to get export data
export const getExportableData = (section: string) => {
  switch (section) {
    case "patients":
      return [
        { id: 1, name: "Sophie Martin", visits: 12, lastVisit: "2023-05-15" },
        { id: 2, name: "Thomas Dubois", visits: 8, lastVisit: "2023-06-02" },
        { id: 3, name: "Emma Petit", visits: 15, lastVisit: "2023-05-28" },
      ];
    case "appointments":
      return [
        { id: 1, patient: "Sophie Martin", date: "2023-05-15", status: "completed" },
        { id: 2, patient: "Thomas Dubois", date: "2023-06-02", status: "scheduled" },
        { id: 3, patient: "Emma Petit", date: "2023-05-28", status: "cancelled" },
      ];
    case "performance":
      return [
        { month: "Janvier", patients: 45, revenue: 4500 },
        { month: "Février", patients: 52, revenue: 5200 },
        { month: "Mars", patients: 48, revenue: 4800 },
      ];
    default:
      return [];
  }
};

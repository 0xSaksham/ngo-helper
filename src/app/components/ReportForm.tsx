import { ReportFormData } from "@/types/reports";
import { useState } from "react";

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => Promise<void>;
  isSubmitting: boolean;
}

const ReportForm = ({ onSubmit, isSubmitting }: ReportFormProps) => {
  const [formData, setFormData] = useState<ReportFormData>({
    ngo_id: "",
    people_helped: 0,
    events_conducted: 0,
    funds_utilized: 0,
    report_month: new Date().toISOString().slice(0, 7), // Default to current YYYY-MM
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      ["people_helped", "events_conducted", "funds_utilized"].includes(name)
    ) {
      // For numeric inputs
      if (value === "") {
        // If backspacing to empty, set to 0
        setFormData((prev) => ({ ...prev, [name]: 0 }));
      } else {
        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
          setFormData((prev) => ({ ...prev, [name]: numValue }));
        }
      }
    } else {
      // For text inputs like ngo_id and report_month
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      ["people_helped", "events_conducted", "funds_utilized"].includes(name) &&
      value === "0"
    ) {
      setFormData((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const inputClassName =
    "w-full bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 text-sm sm:text-base";
  const labelClassName =
    "block text-sm font-medium text-gray-200 mb-1.5 sm:mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="ngo_id" className={labelClassName}>
          NGO Registration Number
        </label>
        <input
          type="text"
          id="ngo_id"
          name="ngo_id"
          required
          value={formData.ngo_id}
          onChange={handleChange}
          className={inputClassName}
          placeholder="Enter your NGO registration number"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label htmlFor="people_helped" className={labelClassName}>
            Number of Beneficiaries
          </label>
          <input
            type="number"
            id="people_helped"
            name="people_helped"
            required
            min="0"
            value={formData.people_helped}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClassName}
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="events_conducted" className={labelClassName}>
            Events Conducted
          </label>
          <input
            type="number"
            id="events_conducted"
            name="events_conducted"
            required
            min="0"
            value={formData.events_conducted}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClassName}
            placeholder="0"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="funds_utilized" className={labelClassName}>
            Funds Utilized (₹)
          </label>
          <input
            type="number"
            id="funds_utilized"
            name="funds_utilized"
            required
            min="0"
            value={formData.funds_utilized}
            onChange={handleChange}
            onFocus={handleFocus}
            className={inputClassName}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="report_month" className={labelClassName}>
          Report Month
        </label>
        <input
          type="month"
          id="report_month"
          name="report_month"
          required
          value={formData.report_month}
          onChange={handleChange}
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm sm:text-base"
      >
        <span className="relative z-10">
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </form>
  );
};

export default ReportForm;

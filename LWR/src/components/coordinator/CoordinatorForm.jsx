import { useEffect, useState } from "react";
import { FilePlus, Pencil, X, Check, Plus, Trash2, UserCog } from "lucide-react";
import { DISTRICTS } from "../../config/districts";

const emptyOperator = () => ({ operatorId: "", stationId: "", deviceId: "" });

const emptyCoordinator = () => ({
  district: "",
  name: "",
  phone: "",
  email: "",
  designation: "",
  employeeId: "",
  operators: [emptyOperator()],
});

export default function CoordinatorForm({ editingRecord, onSubmit, onCancelEdit }) {
  const [values, setValues] = useState(emptyCoordinator());

  useEffect(() => {
    if (editingRecord) {
      setValues({
        district: editingRecord.district ?? "",
        name: editingRecord.name ?? "",
        phone: editingRecord.phone ?? "",
        email: editingRecord.email ?? "",
        designation: editingRecord.designation ?? "",
        employeeId: editingRecord.employeeId ?? "",
        operators:
          editingRecord.operators?.length > 0
            ? editingRecord.operators.map((op) => ({ ...op }))
            : [emptyOperator()],
      });
    } else {
      setValues(emptyCoordinator());
    }
  }, [editingRecord]);

  const handleFieldChange = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleOperatorChange = (index, name) => (e) => {
    setValues((prev) => {
      const operators = [...prev.operators];
      operators[index] = { ...operators[index], [name]: e.target.value };
      return { ...prev, operators };
    });
  };

  const addOperator = () => {
    setValues((prev) => ({ ...prev, operators: [...prev.operators, emptyOperator()] }));
  };

  const removeOperator = (index) => {
    setValues((prev) => ({
      ...prev,
      operators: prev.operators.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedOperators = values.operators.filter(
      (op) => op.operatorId || op.stationId || op.deviceId
    );
    onSubmit({ ...values, operators: cleanedOperators });
    if (!editingRecord) setValues(emptyCoordinator());
  };

  const inputClasses =
    "border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-150 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            editingRecord ? "bg-orange-100" : "bg-gray-100"
          }`}
        >
          {editingRecord ? (
            <Pencil className="w-4 h-4 text-orange-600" />
          ) : (
            <FilePlus className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {editingRecord ? "Edit Coordinator" : "Register District Coordinator"}
          </h3>
          <p className="text-xs text-gray-500">
            {editingRecord ? `Updating ${editingRecord.name}` : "Coordinator details and their operators"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5">
        {/* Coordinator details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              District <span className="text-orange-500">*</span>
            </label>
            <select
              required
              value={values.district}
              onChange={handleFieldChange("district")}
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="">Select District</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Coordinator Name <span className="text-orange-500">*</span>
            </label>
            <input required value={values.name} onChange={handleFieldChange("name")} placeholder="Enter full name" className={inputClasses} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Phone <span className="text-orange-500">*</span>
            </label>
            <input required type="tel" value={values.phone} onChange={handleFieldChange("phone")} placeholder="10-digit mobile number" className={inputClasses} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Email <span className="text-orange-500">*</span>
            </label>
            <input required type="email" value={values.email} onChange={handleFieldChange("email")} placeholder="name@chips.gov.in" className={inputClasses} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Designation <span className="text-orange-500">*</span>
            </label>
            <input required value={values.designation} onChange={handleFieldChange("designation")} placeholder="e.g. District Coordinator" className={inputClasses} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Aadhaar / Employee ID <span className="text-orange-500">*</span>
            </label>
            <input required value={values.employeeId} onChange={handleFieldChange("employeeId")} placeholder="Enter ID" className={inputClasses} />
          </div>
        </div>

        {/* Operators */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <UserCog className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-800">Operators under this coordinator</h4>
            </div>
            <button
              type="button"
              onClick={addOperator}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Operator
            </button>
          </div>

          <div className="space-y-3">
            {values.operators.map((operator, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <input
                  value={operator.operatorId}
                  onChange={handleOperatorChange(index, "operatorId")}
                  placeholder="Operator ID"
                  className={`${inputClasses} bg-white`}
                />
                <input
                  value={operator.stationId}
                  onChange={handleOperatorChange(index, "stationId")}
                  placeholder="Station ID"
                  className={`${inputClasses} bg-white`}
                />
                <input
                  value={operator.deviceId}
                  onChange={handleOperatorChange(index, "deviceId")}
                  placeholder="Device ID"
                  className={`${inputClasses} bg-white`}
                />
                <button
                  type="button"
                  onClick={() => removeOperator(index)}
                  disabled={values.operators.length === 1}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
          {editingRecord && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:scale-[0.98] transition-all duration-150"
          >
            <Check className="w-4 h-4" />
            {editingRecord ? "Update Coordinator" : "Register Coordinator"}
          </button>
        </div>
      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import { FilePlus, Pencil, X, Check } from "lucide-react";

const emptyValues = (fields) => Object.fromEntries(fields.map((f) => [f.name, ""]));

export default function DataForm({ entity, editingRecord, onSubmit, onCancelEdit }) {
  const [values, setValues] = useState(emptyValues(entity.fields));

  useEffect(() => {
    if (editingRecord) {
      const next = {};
      entity.fields.forEach((f) => {
        next[f.name] = editingRecord[f.name] ?? "";
      });
      setValues(next);
    } else {
      setValues(emptyValues(entity.fields));
    }
  }, [editingRecord, entity]);

  const handleChange = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = { ...values };
    entity.fields.forEach((f) => {
      if (f.type === "number") parsed[f.name] = Number(parsed[f.name] || 0);
    });
    onSubmit(parsed);
    if (!editingRecord) setValues(emptyValues(entity.fields));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Card header */}
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
            {editingRecord ? "Edit Record" : "Add New Record"}
          </h3>
          <p className="text-xs text-gray-500">
            {editingRecord
              ? `Updating entry for ${editingRecord.district}`
              : `Fill in details for ${entity.label}`}
          </p>
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          {entity.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                {field.label}
                {field.required && <span className="text-orange-500">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                  className="border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm text-gray-800
                             transition-all duration-150
                             hover:border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500
                             appearance-none cursor-pointer"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                  min={field.type === "number" ? 0 : undefined}
                  placeholder={field.type === "number" ? "0" : `Enter ${field.label.toLowerCase()}`}
                  className="border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm text-gray-800
                             placeholder:text-gray-400
                             transition-all duration-150
                             hover:border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
          {editingRecord && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg
                         border border-gray-200 text-gray-600
                         hover:bg-gray-100 hover:text-gray-800
                         transition-colors duration-150"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg
                       bg-orange-500 text-white shadow-sm
                       hover:bg-orange-600 active:scale-[0.98]
                       transition-all duration-150"
          >
            <Check className="w-4 h-4" />
            {editingRecord ? "Update Record" : "Add Record"}
          </button>
        </div>
      </form>
    </div>
  );
}
import { useState } from "react";
import { Pencil, Trash2, RotateCcw, Inbox, Archive } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

export default function DataTable({ entity, records, onEdit, onSoftDelete, onRestore }) {
  const [showDeleted, setShowDeleted] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const visibleRecords = records.filter((r) => (showDeleted ? r.isDeleted : !r.isDeleted));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              showDeleted ? "bg-gray-200" : "bg-orange-100"
            }`}
          >
            {showDeleted ? (
              <Archive className="w-4 h-4 text-gray-600" />
            ) : (
              <Inbox className="w-4 h-4 text-orange-600" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {showDeleted ? "Deleted Records" : "Active Records"}
            </h3>
            <p className="text-xs text-gray-500">
              {visibleRecords.length} record{visibleRecords.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
          />
          Show deleted
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wide">
              {entity.fields.map((f) => (
                <th key={f.name} className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                  {f.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleRecords.map((record) => (
              <tr key={record.id} className="hover:bg-orange-50/40 transition-colors duration-100">
                {entity.fields.map((f) => (
                  <td key={f.name} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {record[f.name]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    {!showDeleted ? (
                      <>
                        <button
                          onClick={() => onEdit(record)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(record.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onRestore(record.id)}
                        title="Restore"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-100 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {visibleRecords.length === 0 && (
              <tr>
                <td colSpan={entity.fields.length + 1} className="py-12">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {showDeleted ? (
                        <Archive className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Inbox className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm">
                      {showDeleted ? "No deleted records." : "No records found."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete record?"
        message="This will soft-delete the record. You can restore it later from 'Show deleted'."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          onSoftDelete(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
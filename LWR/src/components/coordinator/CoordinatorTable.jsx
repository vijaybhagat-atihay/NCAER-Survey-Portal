import { useState } from "react";
import { Pencil, Trash2, RotateCcw, Inbox, Archive, ChevronDown, UserCog } from "lucide-react";
import ConfirmDialog from "../common/ConfirmDialog";

export default function CoordinatorTable({ records, onEdit, onSoftDelete, onRestore }) {
  const [showDeleted, setShowDeleted] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const visibleRecords = records.filter((r) => (showDeleted ? r.isDeleted : !r.isDeleted));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-6">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${showDeleted ? "bg-gray-200" : "bg-orange-100"}`}>
            {showDeleted ? <Archive className="w-4 h-4 text-gray-600" /> : <Inbox className="w-4 h-4 text-orange-600" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {showDeleted ? "Deleted Coordinators" : "Registered Coordinators"}
            </h3>
            <p className="text-xs text-gray-500">{visibleRecords.length} record{visibleRecords.length === 1 ? "" : "s"}</p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
          <input type="checkbox" checked={showDeleted} onChange={(e) => setShowDeleted(e.target.checked)} className="w-4 h-4 rounded accent-orange-500 cursor-pointer" />
          Show deleted
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold w-8"></th>
              <th className="text-left px-4 py-3 font-semibold">District</th>
              <th className="text-left px-4 py-3 font-semibold">Coordinator</th>
              <th className="text-left px-4 py-3 font-semibold">Designation</th>
              <th className="text-left px-4 py-3 font-semibold">Phone</th>
              <th className="text-left px-4 py-3 font-semibold">Operators</th>
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleRecords.map((record) => {
              const isExpanded = expandedId === record.id;
              return (
                <>
                  <tr key={record.id} className="hover:bg-orange-50/40 transition-colors duration-100">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : record.id)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{record.district}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      <div>{record.name}</div>
                      <div className="text-xs text-gray-400">{record.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{record.designation}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{record.phone}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                        <UserCog className="w-3 h-3" /> {record.operators?.length ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {!showDeleted ? (
                          <>
                            <button onClick={() => onEdit(record)} title="Edit" className="p-1.5 rounded-lg text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setPendingDeleteId(record.id)} title="Delete" className="p-1.5 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => onRestore(record.id)} title="Restore" className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-100 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="px-4 py-3 bg-gray-50">
                        <div className="pl-8">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Operators</p>
                          {record.operators?.length > 0 ? (
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="text-gray-400">
                                  <th className="text-left py-1 font-medium">Operator ID</th>
                                  <th className="text-left py-1 font-medium">Station ID</th>
                                  <th className="text-left py-1 font-medium">Device ID</th>
                                </tr>
                              </thead>
                              <tbody>
                                {record.operators.map((op, i) => (
                                  <tr key={i} className="border-t border-gray-200">
                                    <td className="py-1.5 text-gray-700">{op.operatorId || "—"}</td>
                                    <td className="py-1.5 text-gray-700">{op.stationId || "—"}</td>
                                    <td className="py-1.5 text-gray-700">{op.deviceId || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-xs text-gray-400">No operators registered.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
            {visibleRecords.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {showDeleted ? <Archive className="w-5 h-5" /> : <Inbox className="w-5 h-5" />}
                    </div>
                    <p className="text-sm">{showDeleted ? "No deleted coordinators." : "No coordinators registered yet."}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete coordinator?"
        message="This will soft-delete the coordinator record. You can restore it later from 'Show deleted'."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => { onSoftDelete(pendingDeleteId); setPendingDeleteId(null); }}
      />
    </div>
  );
}
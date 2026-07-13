import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart3,
  Download,
  PieChart as PieChartIcon,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ENTITIES } from "../config/entityConfig";
import { DISTRICTS } from "../config/districts";
import Header from "../components/layout/Header";
import SmallCard from "../components/common/SmallCard";

// Cycle of distinct color themes — used for KPI card icons, bar fills, and pie slices
const THEMES = [
  { bg: "bg-blue-100", text: "text-blue-600", fill: "#3b82f6" },
  { bg: "bg-green-100", text: "text-green-600", fill: "#22c55e" },
  { bg: "bg-orange-100", text: "text-orange-600", fill: "#f97316" },
  { bg: "bg-purple-100", text: "text-purple-600", fill: "#a855f7" },
  { bg: "bg-pink-100", text: "text-pink-600", fill: "#ec4899" },
  { bg: "bg-teal-100", text: "text-teal-600", fill: "#14b8a6" },
  { bg: "bg-yellow-100", text: "text-yellow-600", fill: "#eab308" },
  { bg: "bg-red-100", text: "text-red-600", fill: "#ef4444" },
];

const KPI_ICONS = [Users, CheckCircle, XCircle, Clock, TrendingUp, BarChart3];

function aggregateByDistrict(records, entity) {
  const byDistrict = Object.fromEntries(DISTRICTS.map((d) => [d, []]));
  records.filter((r) => !r.isDeleted).forEach((r) => {
    if (byDistrict[r.district]) byDistrict[r.district].push(r);
  });

  const rows = DISTRICTS.map((district) => {
    const districtRecords = byDistrict[district];
    const row = { district };

    entity.reportColumns.forEach((col) => {
      if (col.agg === "sum") {
        row[col.key] = districtRecords.reduce((sum, r) => sum + (r[col.key] || 0), 0);
      }
    });
    entity.reportColumns.forEach((col) => {
      if (col.compute) row[col.key] = col.compute(row);
    });

    return row;
  });

  const totals = { district: "Grand Total" };
  entity.reportColumns.forEach((col) => {
    if (col.agg === "sum") {
      totals[col.key] = rows.reduce((sum, r) => sum + (Number(r[col.key]) || 0), 0);
    }
  });
  entity.reportColumns.forEach((col) => {
    if (col.compute) totals[col.key] = col.compute(totals);
  });

  return { rows, totals };
}

export default function EntityReportPage() {
  const { entityKey } = useParams();
  const entity = ENTITIES[entityKey];
  const records = useSelector((state) => state[entityKey]?.records ?? []);

  if (!entity) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Unknown entity: <span className="font-medium text-gray-700">{entityKey}</span>
      </div>
    );
  }

  const { rows, totals } = aggregateByDistrict(records, entity);
  const sumColumns = entity.reportColumns.filter((col) => col.agg === "sum");

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(entity.label, 14, 16);

    autoTable(doc, {
      startY: 22,
      head: [["District", ...entity.reportColumns.map((c) => c.label)]],
      body: [
        ...rows.map((row) => [row.district, ...entity.reportColumns.map((c) => row[c.key])]),
        ["Grand Total", ...entity.reportColumns.map((c) => totals[c.key])],
      ],
    });

    doc.save(`${entity.label.replace(/\s+/g, "_")}.pdf`);
  };

  const pieData = sumColumns.map((col, i) => ({
    name: col.label,
    value: Number(totals[col.key]) || 0,
    fill: THEMES[i % THEMES.length].fill,
  }));

  return (
    <>
      <Header title={`${entity.label} - Report`} />
      <div className="p-6 space-y-6">
        {/* Export */}
        <div className="flex justify-end">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>

        {/* KPI Cards — one per report column, each with its own color theme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
          {entity.reportColumns.map((col, i) => {
            const theme = THEMES[i % THEMES.length];
            const Icon = KPI_ICONS[i % KPI_ICONS.length];
            return (
              <SmallCard
                key={col.key}
                label={col.label}
                value={totals[col.key]}
                icon={Icon}
                iconBg={theme.bg}
                iconColor={theme.text}
              />
            );
          })}
        </div>
{/* Report table — modernized */}
<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
  <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-gray-50">
    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
      <BarChart3 className="w-4 h-4 text-white" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-900">District-wise Breakdown</h3>
      <p className="text-xs text-gray-500">{rows.length} districts</p>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wide">
          <th className="text-left px-6 py-3 font-semibold whitespace-nowrap sticky left-0 bg-gray-50">
            District
          </th>
          {entity.reportColumns.map((col) => (
            <th key={col.key} className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <tr
            key={row.district}
            className={`hover:bg-orange-50/40 transition-colors duration-100 ${
              i % 2 === 1 ? "bg-gray-50/40" : "bg-white"
            }`}
          >
            <td className="px-6 py-3 font-medium text-gray-800 whitespace-nowrap sticky left-0 bg-inherit">
              {row.district}
            </td>
            {entity.reportColumns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-gray-50 border-t-2 border-orange-500">
          <td className="px-6 py-3.5 font-bold text-gray-900 whitespace-nowrap sticky left-0 bg-gray-50">
            {totals.district}
          </td>
          {entity.reportColumns.map((col) => (
            <td key={col.key} className="px-4 py-3.5 font-bold  whitespace-nowrap">
              {totals[col.key]}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  </div>
</div>
        {/* Bar charts — one per summed metric, district-wise, each its own color */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          {sumColumns.map((col, i) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <SmallCard
                key={col.key}
                label={`${col.label} by District`}
                icon={BarChart3}
                iconBg={theme.bg}
                iconColor={theme.text}
              >
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rows}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="district"
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey={col.key} fill={theme.fill} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SmallCard>
            );
          })}
        </div>

      </div>
    </>
  );
}
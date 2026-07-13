import { useSelector } from "react-redux";
import { Users, UserCog, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DISTRICTS } from "../config/districts";
import Header from "../components/layout/Header";
import SmallCard from "../components/common/SmallCard";

export default function CoordinatorReportPage() {
  const records = useSelector((state) => state.coordinators?.records ?? []);
  const active = records.filter((r) => !r.isDeleted);

  const totalOperators = active.reduce((sum, r) => sum + (r.operators?.length || 0), 0);
  const districtsCovered = new Set(active.map((r) => r.district)).size;

  const rows = DISTRICTS.map((district) => {
    const districtCoordinators = active.filter((r) => r.district === district);
    const operatorCount = districtCoordinators.reduce((sum, r) => sum + (r.operators?.length || 0), 0);
    return { district, coordinators: districtCoordinators.length, operators: operatorCount };
  });

  return (
    <>
      <Header title="District Coordinator - Report" />
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SmallCard label="Total Coordinators" value={active.length} icon={Users} iconBg="bg-blue-100" iconColor="text-blue-600" />
          <SmallCard label="Total Operators" value={totalOperators} icon={UserCog} iconBg="bg-green-100" iconColor="text-green-600" />
          <SmallCard label="Districts Covered" value={`${districtsCovered} / ${DISTRICTS.length}`} icon={MapPin} iconBg="bg-orange-100" iconColor="text-orange-600" />
        </div>

        <SmallCard label="Operators by District" icon={UserCog} iconBg="bg-purple-100" iconColor="text-purple-600">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="operators" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SmallCard>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2 font-medium">District</th>
                <th className="text-left px-4 py-2 font-medium">Coordinators</th>
                <th className="text-left px-4 py-2 font-medium">Operators</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.district} className="border-t border-gray-100 hover:bg-gray-100/60">
                  <td className="px-4 py-2 font-medium text-gray-800">{row.district}</td>
                  <td className="px-4 py-2 text-gray-700">{row.coordinators}</td>
                  <td className="px-4 py-2 text-gray-700">{row.operators}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
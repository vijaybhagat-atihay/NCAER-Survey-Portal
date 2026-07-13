import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Fingerprint,
  Radio,
  ClipboardList,
  UserCheck,
  UserCog,
  Package,
  ArrowRight,
  LayoutGrid,
  Database,
  Archive,
} from "lucide-react";
import { ENTITY_LIST } from "../config/entityConfig";
import Header from "../components/layout/Header";

// Same mapping used in Sidebar.jsx — purely visual
const ENTITY_ICONS = {
  aadhaarEnrollment: Fingerprint,
  mbuPendingStatus: Radio,
  ncaerSurvey: ClipboardList,
  adultVerification: UserCheck,
  seniorCitizenVerification: UserCog,
  kitAvailability: Package,
};

// Same color cycle used in EntityReportPage — keeps identity consistent app-wide
const THEMES = [
  { bg: "bg-blue-100", text: "text-blue-600", ring: "group-hover:bg-blue-500" },
  { bg: "bg-green-100", text: "text-green-600", ring: "group-hover:bg-green-500" },
  { bg: "bg-orange-100", text: "text-orange-600", ring: "group-hover:bg-orange-500" },
  { bg: "bg-purple-100", text: "text-purple-600", ring: "group-hover:bg-purple-500" },
  { bg: "bg-pink-100", text: "text-pink-600", ring: "group-hover:bg-pink-500" },
  { bg: "bg-teal-100", text: "text-teal-600", ring: "group-hover:bg-teal-500" },
];

export default function DashboardPage() {
  const state = useSelector((s) => s);

  // Overall totals across every entity — purely derived, no new state
  const overall = ENTITY_LIST.reduce(
    (acc, entity) => {
      const records = state[entity.key]?.records ?? [];
      acc.active += records.filter((r) => !r.isDeleted).length;
      acc.deleted += records.filter((r) => r.isDeleted).length;
      return acc;
    },
    { active: 0, deleted: 0 }
  );

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6 max-w-6xl ">
        {/* Welcome banner */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h1 className="text-lg font-semibold text-gray-900">
            Welcome back, Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of Aadhaar-related activity across all 7 LWE districts.
          </p>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Data Modules</p>
              <p className="text-xl font-bold text-gray-900">{ENTITY_LIST.length}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Records</p>
              <p className="text-xl font-bold text-gray-900">{overall.active}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
              <Archive className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Deleted Records</p>
              <p className="text-xl font-bold text-gray-900">{overall.deleted}</p>
            </div>
          </div>
        </div>

        {/* Module cards */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENTITY_LIST.map((entity, i) => {
              const records = state[entity.key]?.records ?? [];
              const activeCount = records.filter((r) => !r.isDeleted).length;
              const Icon = ENTITY_ICONS[entity.key];
              const theme = THEMES[i % THEMES.length];

              return (
                <Link
                  key={entity.key}
                  to={`/reports/${entity.key}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-transparent hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.ring} flex items-center justify-center transition-colors duration-200`}
                    >
                      {Icon && (
                        <Icon
                          className={`w-5 h-5 ${theme.text} group-hover:text-white transition-colors duration-200`}
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-800">
                    {entity.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeCount} active record{activeCount === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
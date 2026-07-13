import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Fingerprint,
  Radio,
  ClipboardList,
  UserCheck,
  UserCog,
  Package,
  FilePlus,
  BarChart3,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { ENTITY_LIST } from "../../config/entityConfig";

// Maps entity key -> icon component (purely visual, no logic change)
const ENTITY_ICONS = {
  aadhaarEnrollment: Fingerprint,
  mbuPendingStatus: Radio,
  ncaerSurvey: ClipboardList,
  adultVerification: UserCheck,
  seniorCitizenVerification: UserCog,
  kitAvailability: Package,
};

function NavItem({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-orange-500 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
        }`
      }
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />}
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-1.5 px-3 mt-6 mb-2">
      <Icon className="w-3.5 h-3.5 text-gray-400" />
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {children}
      </p>
    </div>
  );
}

// One collapsible group per entity — toggles between showing/hiding its
// "Data Entry" and "Report" sub-links.
function EntityGroup({ entity }) {
  const location = useLocation();
  const formPath = `/forms/${entity.key}`;
  const reportPath = `/reports/${entity.key}`;
  const isOnThisEntity =
    location.pathname === formPath || location.pathname === reportPath;

  const [open, setOpen] = useState(isOnThisEntity);
  const Icon = ENTITY_ICONS[entity.key];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isOnThisEntity && !open
            ? "bg-orange-50 text-orange-700"
            : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />}
        <span className="flex-1 text-left truncate">{entity.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-0.5 ml-4 pl-3 border-l border-gray-200 space-y-0.5">
          <NavItem to={formPath} icon={FilePlus} label="Data Entry" />
          <NavItem to={reportPath} icon={BarChart3} label="Report" />
        </div>
      )}
    </div>
  );
}

// Generic collapsible group — same behavior as EntityGroup, but takes
// explicit paths/labels instead of deriving them from entityConfig.
// Used for Admin-section items like Coordinator Registration.
function NavGroup({ icon: Icon, label, formPath, reportPath, formLabel = "Data Entry", reportLabel = "Report" }) {
  const location = useLocation();
  const isOnThisGroup = location.pathname === formPath || location.pathname === reportPath;
  const [open, setOpen] = useState(isOnThisGroup);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isOnThisGroup && !open
            ? "bg-orange-50 text-orange-700"
            : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />}
        <span className="flex-1 text-left truncate">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-0.5 ml-4 pl-3 border-l border-gray-200 space-y-0.5">
          <NavItem to={formPath} icon={FilePlus} label={formLabel} />
          <NavItem to={reportPath} icon={BarChart3} label={reportLabel} />
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-xl shrink-0 h-screen sticky top-0 flex flex-col bg-gray-100 border-r border-gray-200">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-gray-200 bg-white">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
          <Fingerprint className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            LWE Aadhaar Status
          </p>
          <p className="text-[11px] text-gray-500 truncate">CHiPS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <NavItem to="/" end icon={LayoutDashboard} label="Dashboard" />

        <SectionLabel icon={BarChart3}>Modules</SectionLabel>
        <div className="space-y-0.5">
          {ENTITY_LIST.map((entity) => (
            <EntityGroup key={entity.key} entity={entity} />
          ))}
        </div>

        <SectionLabel icon={ShieldCheck}>Admin</SectionLabel>
        <div className="space-y-0.5">
          <NavGroup
            icon={UserCog}
            label="Coordinator Registration"
            formPath="/admin/coordinators"
            reportPath="/admin/coordinators/report"
            formLabel="Register / Manage"
            reportLabel="Report"
          />
        </div>
      </nav>
    </aside>
  );
}
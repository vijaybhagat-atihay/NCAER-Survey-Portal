import { DISTRICTS } from "./districts";

const districtField = {
  name: "district",
  label: "District",
  type: "select",
  options: DISTRICTS,
  required: true,
};

export const ENTITIES = {

  mbuPendingStatus: {
    key: "mbuPendingStatus",
    label: "MBU district wise pending status report",
    fields: [
      districtField,
      { name: "totalStudents", label: "Total Students", type: "number", required: true },
      { name: "studentsAadhaarProvided", label: "Students Aadhaar Provided", type: "number", required: true },
      { name: "mbuPending5to15", label: "MBU Pending (Age 5-15)", type: "number", required: true },
      { name: "mbuPending15Plus", label: "MBU Pending (Age 15+)", type: "number", required: true },
    ],
    reportColumns: [
      { key: "totalStudents", label: "Total Students", agg: "sum" },
      { key: "studentsAadhaarProvided", label: "Students Aadhaar Provided", agg: "sum" },
      { key: "mbuPending5to15", label: "MBU Pending 5-15", agg: "sum" },
      { key: "mbuPending15Plus", label: "MBU Pending 15+", agg: "sum" },
      {
        key: "studentCoveragePct",
        label: "Student Coverage %",
        compute: (r) => (r.totalStudents ? ((r.studentsAadhaarProvided / r.totalStudents) * 100).toFixed(2) + "%" : "0%"),
      },
    ],
  },

ncaerSurvey: {
  key: "ncaerSurvey",
  label: "NCAER Survey District Wise Summary",
  fields: [
    districtField,
    { name: "totalSurvey", label: "Total Survey", type: "number", required: true },
    { name: "eligible", label: "Eligible (लाभान्वित)", type: "number", required: true },
    { name: "ineligible", label: "Not Benefited (लाभान्वित नहीं)", type: "number", required: true },
    { name: "disqualified", label: "Disqualified (अपात्र)", type: "number", required: true },
    { name: "remaining", label: "Remaining (शेष)", type: "number", required: true },
  ],
  reportColumns: [
    { key: "totalSurvey", label: "Survey", agg: "sum" },
    { key: "eligible", label: "Eligible", agg: "sum" },
    { key: "ineligible", label: "Not Benefited", agg: "sum" },
    { key: "disqualified", label: "Disqualified", agg: "sum" },
    { key: "remaining", label: "Remaining", agg: "sum" },
    {
      key: "saturationPct",
      label: "Saturation %",
      compute: (r) => (r.totalSurvey ? ((r.eligible / r.totalSurvey) * 100).toFixed(2) + "%" : "0%"),
    },
  ],
},

  adultVerification: {
    key: "adultVerification",
    label: "District wise 18+ Verification report",
    fields: [
      districtField,
      { name: "received", label: "Total Received", type: "number", required: true },
      { name: "approved", label: "Total Approved", type: "number", required: true },
      { name: "rejected", label: "Total Rejected", type: "number", required: true },
      { name: "pending", label: "Total Pending", type: "number", required: true },
    ],
    reportColumns: [
      { key: "received", label: "Received", agg: "sum" },
      { key: "approved", label: "Approved", agg: "sum" },
      { key: "rejected", label: "Rejected", agg: "sum" },
      { key: "pending", label: "Pending", agg: "sum" },
    ],
  },

  seniorCitizenVerification: {
    key: "seniorCitizenVerification",
    label: "District wise 100+ Verification report",
    fields: [
      districtField,
      { name: "received", label: "Total Received", type: "number", required: true },
      { name: "alive", label: "Total Alive", type: "number", required: true },
      { name: "deceased", label: "Total Deceased", type: "number", required: true },
      { name: "pending", label: "Total Pending", type: "number", required: true },
    ],
    reportColumns: [
      { key: "received", label: "Received", agg: "sum" },
      { key: "alive", label: "Alive", agg: "sum" },
      { key: "deceased", label: "Deceased", agg: "sum" },
      { key: "pending", label: "Pending", agg: "sum" },
    ],
  },

  kitAvailability: {
    key: "kitAvailability",
    label: "LWE District wise In-House Kit details",
    fields: [
      districtField,
      { name: "allottedKits", label: "Total Alloted Kits", type: "number", required: true },
      { name: "activeKits", label: "Total Active Kits", type: "number", required: true },
    ],
    reportColumns: [
      { key: "allottedKits", label: "Alloted", agg: "sum" },
      { key: "activeKits", label: "Active", agg: "sum" },
      { key: "inactiveKits", label: "Inactive", compute: (r) => r.allottedKits - r.activeKits },
    ],
  },
};

export const ENTITY_LIST = Object.values(ENTITIES);
// Real values from the source PDF — used only to pre-populate the store
// on first run (i.e. when localStorage has nothing saved yet).

export const SEED_DATA = {
  kitAvailability: [
    { district: "Sukma", allottedKits: 33, activeKits: 33 },
    { district: "Dakshin Bastar Dantewada", allottedKits: 34, activeKits: 33 },
    { district: "Narayanpur", allottedKits: 31, activeKits: 28 },
    { district: "Uttar Bastar Kanker", allottedKits: 41, activeKits: 41 },
    { district: "Bijapur", allottedKits: 39, activeKits: 33 },
    { district: "Bastar", allottedKits: 36, activeKits: 36 },
    { district: "Mohla-Manpur-Ambagarh Chowki", allottedKits: 22, activeKits: 20 },
  ],

  adultVerification: [
    { district: "Bastar", received: 834, approved: 748, rejected: 64, pending: 22 },
    { district: "Bijapur", received: 7701, approved: 7680, rejected: 0, pending: 21 },
    { district: "Dakshin Bastar Dantewada", received: 935, approved: 932, rejected: 1, pending: 2 },
    { district: "Mohla-Manpur-Ambagarh Chowki", received: 102, approved: 87, rejected: 6, pending: 9 },
    { district: "Narayanpur", received: 401, approved: 349, rejected: 52, pending: 0 },
    { district: "Sukma", received: 5655, approved: 5650, rejected: 0, pending: 5 },
    { district: "Uttar Bastar Kanker", received: 429, approved: 404, rejected: 16, pending: 9 },
  ],

  seniorCitizenVerification: [
    { district: "Bastar", received: 211, alive: 14, deceased: 147, pending: 50 },
    { district: "Bijapur", received: 36, alive: 7, deceased: 29, pending: 0 },
    { district: "Dakshin Bastar Dantewada", received: 61, alive: 10, deceased: 35, pending: 16 },
    { district: "Mohla-Manpur-Ambagarh Chowki", received: 116, alive: 13, deceased: 88, pending: 15 },
    { district: "Narayanpur", received: 23, alive: 6, deceased: 13, pending: 4 },
    { district: "Sukma", received: 12, alive: 6, deceased: 6, pending: 0 },
    { district: "Uttar Bastar Kanker", received: 468, alive: 97, deceased: 334, pending: 37 },
  ],

  mbuPendingStatus: [
    { district: "Bastar", totalStudents: 150719, studentsAadhaarProvided: 141431, mbuPending5to15: 2510, mbuPending15Plus: 1455 },
    { district: "Bijapur", totalStudents: 56406, studentsAadhaarProvided: 40595, mbuPending5to15: 3425, mbuPending15Plus: 2422 },
    { district: "Dakshin Bastar Dantewada", totalStudents: 49211, studentsAadhaarProvided: 46743, mbuPending5to15: 1019, mbuPending15Plus: 1201 },
    { district: "Uttar Bastar Kanker", totalStudents: 120236, studentsAadhaarProvided: 115103, mbuPending5to15: 5643, mbuPending15Plus: 8171 },
    { district: "Mohla-Manpur-Ambagarh Chowki", totalStudents: 49270, studentsAadhaarProvided: 46760, mbuPending5to15: 1188, mbuPending15Plus: 2090 },
    { district: "Narayanpur", totalStudents: 28824, studentsAadhaarProvided: 24323, mbuPending5to15: 859, mbuPending15Plus: 474 },
    { district: "Sukma", totalStudents: 46810, studentsAadhaarProvided: 41726, mbuPending5to15: 1342, mbuPending15Plus: 951 },
  ],

  ncaerSurvey: [
    { district: "Uttar Bastar Kanker", totalSurvey: 19341, eligible: 1062, ineligible: 941, disqualified: 0, remaining: 17338 },
    { district: "Dakshin Bastar Dantewada", totalSurvey: 10581, eligible: 2383, ineligible: 8081, disqualified: 0, remaining: 117 },
    { district: "Narayanpur", totalSurvey: 8501, eligible: 1965, ineligible: 5419, disqualified: 0, remaining: 1117 },
    { district: "Bastar", totalSurvey: 46798, eligible: 17022, ineligible: 27432, disqualified: 0, remaining: 2344 },
    { district: "Bijapur", totalSurvey: 35524, eligible: 2736, ineligible: 32594, disqualified: 0, remaining: 194 },
    { district: "Mohla-Manpur-Ambagarh Chowki", totalSurvey: 10342, eligible: 2732, ineligible: 1983, disqualified: 0, remaining: 5627 },
    { district: "Sukma", totalSurvey: 31255, eligible: 1314, ineligible: 29846, disqualified: 0, remaining: 95 },
  ],
};
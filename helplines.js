// ============================================================================
// SafeVoice — Helplines Directory
// 15 countries with verified numbers. More added as verified.
// If a number isn't verified, it shows "—" instead of fake data.
// ============================================================================

const HELPLINES = {
  PK: {
    name: "Pakistan",
    flag: "🇵🇰",
    lines: [
      { label: "Child Protection Bureau", number: "1121", note: "Official child rescue & protection" },
      { label: "Madadgaar National Helpline", number: "1098", note: "24/7 child & women protection" },
      { label: "Umang Mental Health", number: "0311-7786264", note: "Confidential psychological first aid" },
      { label: "FIA Cyber Crime", number: "1991", note: "Online harassment & blackmail" },
      { label: "Police Emergency", number: "15", note: "Immediate danger" }
    ]
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    lines: [
      { label: "Childline India", number: "1098", note: "24/7 free child helpline" },
      { label: "AASRA (Mental Health)", number: "9820466726", note: "24/7 suicide prevention" },
      { label: "Cyber Crime Helpline", number: "1930", note: "Online fraud & harassment" },
      { label: "Police Emergency", number: "112", note: "All emergencies" }
    ]
  },
  BD: {
    name: "Bangladesh",
    flag: "🇧🇩",
    lines: [
      { label: "Child Helpline", number: "1098", note: "Child protection & rescue" },
      { label: "National Emergency", number: "999", note: "Police, fire, ambulance" },
      { label: "Kaan Pete Roi", number: "09612-119911", note: "Emotional support helpline" }
    ]
  },
  US: {
    name: "United States",
    flag: "🇺🇸",
    lines: [
      { label: "988 Suicide & Crisis Lifeline", number: "988", note: "24/7 mental health crisis" },
      { label: "Childhelp National Hotline", number: "1-800-422-4453", note: "Child abuse reporting" },
      { label: "FBI Internet Crime (IC3)", number: "ic3.gov", note: "Report cyber crime online" },
      { label: "Emergency", number: "911", note: "Immediate danger" }
    ]
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    lines: [
      { label: "Childline UK", number: "0800 1111", note: "Free, confidential, 24/7" },
      { label: "Samaritans", number: "116 123", note: "Emotional support, 24/7" },
      { label: "Action Fraud", number: "0300 123 2040", note: "Report cyber crime" },
      { label: "Emergency", number: "999", note: "Immediate danger" }
    ]
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    lines: [
      { label: "Kids Help Phone", number: "1-800-668-6868", note: "24/7 youth support" },
      { label: "Canadian Anti-Fraud Centre", number: "1-888-495-8501", note: "Report online crime" },
      { label: "Emergency", number: "911", note: "Immediate danger" }
    ]
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    lines: [
      { label: "Kids Helpline", number: "1800 55 1800", note: "24/7 for ages 5–25" },
      { label: "Lifeline", number: "13 11 14", note: "Crisis support, 24/7" },
      { label: "ReportCyber", number: "cyber.gov.au", note: "Online crime reporting" },
      { label: "Emergency", number: "000", note: "Immediate danger" }
    ]
  },
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    lines: [
      { label: "Nummer gegen Kummer", number: "116 111", note: "Children & youth helpline" },
      { label: "Telefonseelsorge", number: "0800 111 0 111", note: "Crisis support, 24/7" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    lines: [
      { label: "Allô Enfance en Danger", number: "119", note: "Child protection, 24/7" },
      { label: "Fil Santé Jeunes", number: "0800 235 236", note: "Youth health & support, daily 9am–11pm" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  ES: {
    name: "Spain",
    flag: "🇪🇸",
    lines: [
      { label: "Fundación ANAR", number: "900 20 20 10", note: "Children & teens helpline, 24/7" },
      { label: "Teléfono de la Esperanza", number: "717 003 717", note: "Emotional support, 24/7" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  IT: {
    name: "Italy",
    flag: "🇮🇹",
    lines: [
      { label: "Telefono Azzurro", number: "19696", note: "Child protection, 24/7" },
      { label: "Telefono Amico", number: "02 2327 2327", note: "Emotional support" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  AE: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    lines: [
      { label: "Child Protection Hotline", number: "116111", note: "Nationwide, 24/7, Ministry of Interior" },
      { label: "Aman (Abu Dhabi Police)", number: "800 2626", note: "Confidential reporting — safety & harassment" },
      { label: "Dubai Foundation for Women & Children", number: "800 111", note: "24/7 abuse support" },
      { label: "Emergency", number: "999", note: "Immediate danger" }
    ]
  },
  SA: {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    lines: [
      { label: "Child Helpline", number: "116111", note: "Free, confidential, daily 7am–11pm" },
      { label: "Domestic Violence Reporting", number: "1919", note: "24/7" },
      { label: "Emergency", number: "999", note: "Immediate danger" }
    ]
  },
  MY: {
    name: "Malaysia",
    flag: "🇲🇾",
    lines: [
      { label: "Talian Kasih", number: "15999", note: "24/7 welfare & child support" },
      { label: "Befrienders KL", number: "03-7627 2929", note: "Emotional support, 24/7" },
      { label: "Emergency", number: "999", note: "Immediate danger" }
    ]
  },
  OTHER: {
    name: "Other / Not listed",
    flag: "🌍",
    lines: [
      { label: "Child Helpline International", number: "childhelplineinternational.org", note: "Find a helpline in your country" },
      { label: "Befrienders Worldwide", number: "befrienders.org", note: "Emotional support worldwide" },
      { label: "Find a Helpline", number: "findahelpline.com", note: "Search by country and issue" }
    ]
  }
};

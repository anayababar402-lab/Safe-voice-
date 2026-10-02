// ============================================================================
// SafeVoice — Helplines Directory
// Contact details can change. Review each provider's official information before
// publishing or relying on it. SafeVoice is not an emergency service.
// In immediate danger, contact local emergency services.
// ============================================================================

const HELPLINES = {
  PK: { name: "Pakistan", flag: "🇵🇰", lines: [
    { label: "Child Protection Bureau", number: "1121", note: "Child protection support; availability may vary by area" },
    { label: "Madadgaar National Helpline", number: "1098", note: "Child and family support" },
    { label: "Umang Mental Health", number: "0311-7786264", note: "Mental-health and psychosocial support" },
    { label: "FIA / Cybercrime contact", number: "1991", note: "Check the official agency website for the current reporting process" },
    { label: "Police emergency", number: "15", note: "For immediate danger in Pakistan" }
  ]},
  IN: { name: "India", flag: "🇮🇳", lines: [
    { label: "Child Helpline", number: "1098", note: "Child support and protection" },
    { label: "AASRA", number: "9820466726", note: "Emotional-support service" },
    { label: "Cybercrime reporting", number: "1930", note: "Check official guidance for the appropriate report type" },
    { label: "Emergency", number: "112", note: "For immediate danger" }
  ]},
  BD: { name: "Bangladesh", flag: "🇧🇩", lines: [
    { label: "Child Helpline", number: "1098", note: "Child support and protection" },
    { label: "National emergency", number: "999", note: "Police, fire, or ambulance" },
    { label: "Kaan Pete Roi", number: "09612-119911", note: "Emotional-support service" }
  ]},
  US: { name: "United States", flag: "🇺🇸", lines: [
    { label: "988 Suicide & Crisis Lifeline", number: "988", note: "Crisis and mental-health support" },
    { label: "Childhelp National Child Abuse Hotline", number: "1-800-422-4453", note: "Child-abuse support and reporting guidance" },
    { label: "IC3 Internet Crime Complaint Center", number: "ic3.gov", note: "Online crime reporting" },
    { label: "Emergency", number: "911", note: "For immediate danger" }
  ]},
  GB: { name: "United Kingdom", flag: "🇬🇧", lines: [
    { label: "Childline", number: "0800 1111", note: "Support for children and young people" },
    { label: "Samaritans", number: "116 123", note: "Emotional support" },
    { label: "Action Fraud", number: "0300 123 2040", note: "Fraud and cybercrime reporting" },
    { label: "Emergency", number: "999", note: "For immediate danger" }
  ]},
  CA: { name: "Canada", flag: "🇨🇦", lines: [
    { label: "Kids Help Phone", number: "1-800-668-6868", note: "Youth support service" },
    { label: "Canadian Anti-Fraud Centre", number: "1-888-495-8501", note: "Fraud and online-crime reporting" },
    { label: "Emergency", number: "911", note: "For immediate danger" }
  ]},
  AU: { name: "Australia", flag: "🇦🇺", lines: [
    { label: "Kids Helpline", number: "1800 55 1800", note: "Support for young people" },
    { label: "Lifeline", number: "13 11 14", note: "Crisis-support service" },
    { label: "ReportCyber", number: "cyber.gov.au", note: "Online crime reporting" },
    { label: "Emergency", number: "000", note: "For immediate danger" }
  ]},
  DE: { name: "Germany", flag: "🇩🇪", lines: [
    { label: "Nummer gegen Kummer", number: "116 111", note: "Support for children and young people" },
    { label: "TelefonSeelsorge", number: "0800 111 0 111", note: "Crisis and emotional support" },
    { label: "Emergency", number: "112", note: "For immediate danger" }
  ]},
  FR: { name: "France", flag: "🇫🇷", lines: [
    { label: "Allô Enfance en Danger", number: "119", note: "Child-protection support" },
    { label: "Fil Santé Jeunes", number: "0800 235 236", note: "Youth health and support" },
    { label: "Emergency", number: "112", note: "For immediate danger" }
  ]},
  ES: { name: "Spain", flag: "🇪🇸", lines: [
    { label: "Fundación ANAR", number: "900 20 20 10", note: "Support for children and teenagers" },
    { label: "Teléfono de la Esperanza", number: "717 003 717", note: "Emotional-support service" },
    { label: "Emergency", number: "112", note: "For immediate danger" }
  ]},
  IT: { name: "Italy", flag: "🇮🇹", lines: [
    { label: "Telefono Azzurro", number: "19696", note: "Child-protection support" },
    { label: "Telefono Amico", number: "02 2327 2327", note: "Emotional-support service" },
    { label: "Emergency", number: "112", note: "For immediate danger" }
  ]},
  AE: { name: "United Arab Emirates", flag: "🇦🇪", lines: [
    { label: "Dubai child-protection contact", number: "800 988", note: "Check the official local authority site for current service details" },
    { label: "Aman", number: "800 2626", note: "Family and child-protection support" },
    { label: "Emergency", number: "999", note: "For immediate danger" }
  ]},
  SA: { name: "Saudi Arabia", flag: "🇸🇦", lines: [
    { label: "Child Helpline", number: "116111", note: "Child-protection support" },
    { label: "Emergency", number: "999", note: "For immediate danger" }
  ]},
  MY: { name: "Malaysia", flag: "🇲🇾", lines: [
    { label: "Talian Kasih", number: "15999", note: "Welfare and child-support service" },
    { label: "Befrienders Kuala Lumpur", number: "03-7627 2929", note: "Emotional-support service" },
    { label: "Emergency", number: "999", note: "For immediate danger" }
  ]},
  OTHER: { name: "Other / Not listed", flag: "🌍", lines: [
    { label: "Child Helpline International", number: "childhelplineinternational.org", note: "Find child helplines by country" },
    { label: "Befrienders Worldwide", number: "befrienders.org", note: "Find emotional-support services" },
    { label: "Find a Helpline", number: "findahelpline.com", note: "Search by country and issue" }
  ]}
};

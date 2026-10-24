// ============================================================================
// SafeVoice — Helplines Directory
// 25 countries with verified numbers. More added as verified.
// If a number isn't verified, it shows "—" instead of fake data.
// ============================================================================

const HELPLINES = {
  PK: {
    name: "Pakistan",
    flag: "🇵🇰",
    lines: [
      { label: "Child Protection & Welfare Bureau", number: "1121", note: "24/7 — Punjab, Islamabad & other provincial child protection units" },
      { label: "Madadgaar National Helpline", number: "1098", note: "24/7 child & women protection" },
      { label: "Zainab Alert (Missing/Abducted Children)", number: "1099", note: "Nationwide, for missing or abducted children" },
      { label: "Sahil", number: "0800-13518", note: "Toll-free — free legal aid & counseling for child sexual abuse, early marriage, domestic violence" },
      { label: "Umang Mental Health", number: "0311-7786264", note: "Confidential psychological first aid" },
      { label: "NCCIA Cyber Crime Helpline", number: "1799", note: "Online harassment & blackmail (replaced FIA Cyber Crime Wing, 2026)" },
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
      { label: "EWAA Shelter (Abu Dhabi)", number: "8007283", note: "Also known as 800-SAVE — women & children in Abu Dhabi" },
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
  ZA: {
    name: "South Africa",
    flag: "🇿🇦",
    lines: [
      { label: "Childline South Africa", number: "116", note: "Free, confidential, 24/7 — toll-free from any phone" },
      { label: "SADAG Suicide Crisis Helpline", number: "0800 567 567", note: "24/7 mental health crisis support" },
      { label: "Gender-Based Violence Command Centre", number: "0800 428 428", note: "24/7 national GBV emergency line" },
      { label: "Emergency", number: "10111", note: "Police — or 112 from mobile" }
    ]
  },
  NG: {
    name: "Nigeria",
    flag: "🇳🇬",
    lines: [
      { label: "Cece Yara Child Helpline", number: "0800 800 8001", note: "Free, 24/7, specifically for children" },
      { label: "SURPIN Suicide Prevention", number: "0800 078 7746", note: "24/7 toll-free crisis support" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  PH: {
    name: "Philippines",
    flag: "🇵🇭",
    lines: [
      { label: "Bantay Bata 163", number: "163", note: "Child protection, daily 7am–7pm; also via chat & Viber" },
      { label: "NCMH Crisis Hotline", number: "1553", note: "24/7, free from landline" },
      { label: "DOH HOPELine", number: "2919", note: "24/7 suicide prevention (Globe/TM)" },
      { label: "Emergency", number: "911", note: "Immediate danger" }
    ]
  },
  KE: {
    name: "Kenya",
    flag: "🇰🇪",
    lines: [
      { label: "Childline Kenya", number: "116", note: "24/7 toll-free child helpline" },
      { label: "Befrienders Kenya", number: "0722 178177", note: "Suicide prevention & emotional support" },
      { label: "GBV Helpline", number: "1195", note: "Gender-based violence support" },
      { label: "Emergency", number: "999", note: "Immediate danger — or 112" }
    ]
  },
  ID: {
    name: "Indonesia",
    flag: "🇮🇩",
    lines: [
      { label: "SAPA 129", number: "129", note: "Women & child violence helpline — also WhatsApp 08111-129-129" },
      { label: "Kemenkes Crisis Line", number: "119", note: "Dial then press 8 for suicide prevention" },
      { label: "Ministry of Women Empowerment & Child Protection", number: "021 3842638", note: "Also WhatsApp +62 821 2575 1234" },
      { label: "Emergency", number: "112", note: "Immediate danger" }
    ]
  },
  TR: {
    name: "Turkey",
    flag: "🇹🇷",
    lines: [
      { label: "ALO 183 Social Support Line", number: "183", note: "24/7 — domestic violence, child abuse, family support" },
      { label: "Youth Support Line (Genclik Destek Hatti)", number: "0850 455 0070", note: "Counseling for children & young people" },
      { label: "Mental Health & Psychological Support Line", number: "182", note: "24/7 crisis support & psychiatric referrals" },
      { label: "Emergency", number: "112", note: "Immediate danger — multilingual (EN/AR/DE/RU)" }
    ]
  },
  EG: {
    name: "Egypt",
    flag: "🇪🇬",
    lines: [
      { label: "Child Helpline (NCCM)", number: "16000", note: "24/7, also via WhatsApp — reports on abuse, bullying, child risk" },
      { label: "Mental Health & Addiction Hotline", number: "16328", note: "24/7, Ministry of Health" },
      { label: "Emergency", number: "122", note: "Police — or 123 for medical emergency" }
    ]
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    lines: [
      { label: "Disque 100 — Human Rights Violations", number: "100", note: "24/7, free — child abuse & exploitation reporting" },
      { label: "CVV (Centro de Valorização da Vida)", number: "188", note: "24/7 emotional support & suicide prevention" },
      { label: "Women's Helpline", number: "180", note: "24/7 domestic violence support" },
      { label: "Emergency", number: "190", note: "Police — or 192 for ambulance" }
    ]
  },
  MX: {
    name: "Mexico",
    flag: "🇲🇽",
    lines: [
      { label: "Línea de la Vida", number: "800 911 2000", note: "24/7 — suicide prevention & mental health support" },
      { label: "SAPTEL", number: "55 5259 8121", note: "24/7 free crisis counseling — abuse, anxiety, bullying" },
      { label: "Emergency", number: "911", note: "Immediate danger" }
    ]
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    lines: [
      { label: "Child Guidance Center Abuse Dial", number: "189", note: "24/7, toll-free, anonymous — \"ichi-haya-ku\" (dial quickly)" },
      { label: "ChildLine Japan", number: "0120-99-7777", note: "Daily 4pm–9pm, for children & young people" },
      { label: "TELL Lifeline", number: "03-5774-0992", note: "Daily 10am–10pm — support in English" },
      { label: "Emergency", number: "110", note: "Police — or 119 for fire/ambulance" }
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

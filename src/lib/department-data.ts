// All content sourced from https://gist.edu.in/gist/ (official GIST website).
// Do NOT invent faculty, statistics, or events. Mark unknown fields as null.

export const DEPARTMENT = {
  institute: "Geethanjali Institute of Science and Technology",
  instituteShort: "GIST",
  accreditation:
    "Autonomous | NAAC 'A' Grade | NBA Accredited (ECE, EEE & Mechanical)",
  affiliation:
    "Approved by AICTE, New Delhi & Affiliated to JNTUA, Anantapuramu",
  codes: "EAPCET/ECET/POLYCET CODE: GTNN · APPGECET CODE: GTNN1",
  name: "Department of Computer Science & Engineering",
  short: "CSE",
  established: 2008,
  currentIntakeUG: 420,
  currentIntakePG: 18,
  hod: {
    name: "Dr. Y. Jahnavi",
    designation: "Professor & Head of Department",
    email: "csehod@gist.edu.in",
    experience: "14 Years",
  },
  vision:
    "To evolve as a leading Computer Science and Engineering center producing competent technocrats to meet the demands of ever-changing industry and society.",
  mission: [
    "Impart quality education through innovative teaching-learning processes.",
    "Motivate the learners to upgrade technical expertise by promoting learner-centric activities.",
    "Inculcate values and interpersonal skills in the learners towards overall development.",
    "Upgrade knowledge in cutting-edge technologies keeping pace with industrial standards through collaborations.",
  ],
  about: [
    "The Department of Computer Science and Engineering was established in 2008 with an intake of 60 students in the Bachelor of Technology (B.Tech.) programme. Over the years the intake has grown to 420 by 2024. The department also offers an M.Tech programme with an intake of 18 students.",
    "The department promotes active industry–institute collaboration by identifying areas of interest and taking part in research projects. Major areas of research include Artificial Intelligence, Machine Learning, Data Science, Cloud Computing, IoT, Cyber Security, Deep Learning, Image Processing, Information Security and Networks.",
    "The department holds CSI, ACM and ISTE institution memberships and student chapters, and runs training programmes and certification courses in association with ICT, CISCO and ORACLE Academy.",
  ],
  peos: [
    "PEO 1 — Outperform in professional career or higher learning by upgrading skills in Computer Science and Engineering.",
    "PEO 2 — Provide computing solutions for complex problems to meet industry demands and societal needs.",
    "PEO 3 — Offer ethical, socially sensitive solutions as professionals and as entrepreneurs in Computer Science and other engineering disciplines.",
    "PEO 4 — Leverage new computing technologies by engaging in perpetual learning.",
  ],
  psos: [
    "PSO 1 — Apply the expertise in adaptive algorithms to develop quality software applications.",
    "PSO 2 — Demonstrate the capabilities in basic and advanced technologies towards getting employed or to become an entrepreneur.",
  ],
  researchAreas: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Cyber Security",
    "Deep Learning",
    "Image Processing",
    "Information Security",
    "Computer Networks",
  ],
  memberships: ["CSI", "ACM", "ISTE", "ORACLE Academy", "CISCO Networking Academy"],
  contact: {
    address:
      "Geethanjali Institute of Science and Technology, Bommasamudram, Nellore Rural, Andhra Pradesh 524137, India",
    phone: "+91-861-2352272",
    email: "csehod@gist.edu.in",
    website: "https://gist.edu.in/gist/computer-science-and-engineering/",
  },
  stats: {
    faculty: 27,
    studentIntakeUG: 420,
    studentIntakePG: 18,
    laboratories: 8,
    yearsOfExcellence: new Date().getFullYear() - 2008,
    programmes: 2,
  },
} as const;

export type FacultyMember = {
  sno: number;
  name: string;
  qualification: string;
  designation: string;
  slug: string;
  profileUrl: string;
};

// Source: https://gist.edu.in/gist/faculty/ (Department of CSE table)
export const FACULTY: FacultyMember[] = [
  { sno: 1, name: "Dr. Yeturu Jahnavi", qualification: "M.Tech, Ph.D", designation: "Professor & HoD", slug: "cse-jahnavi", profileUrl: "https://gist.edu.in/gist/cse-jahnavi/" },
  { sno: 2, name: "Dr. Vedururu Sireesha", qualification: "M.E, Ph.D", designation: "Associate Professor", slug: "cse-sireesha", profileUrl: "https://gist.edu.in/gist/cse-sireesha/" },
  { sno: 3, name: "Dr. Y. Pavan Kumar Reddy", qualification: "M.E, Ph.D", designation: "Associate Professor", slug: "cse-pavankumar", profileUrl: "https://gist.edu.in/gist/cse-pavankumar/" },
  { sno: 4, name: "Dr. Mathan Kumar M", qualification: "M.E, Ph.D", designation: "Associate Professor", slug: "cse-mathankumar", profileUrl: "https://gist.edu.in/gist/cse-mathankumar/" },
  { sno: 5, name: "Dr. Sudheer Nidamanuri", qualification: "M.Tech, Ph.D", designation: "Associate Professor", slug: "cse-sudheer", profileUrl: "https://gist.edu.in/gist/cse-sudheer/" },
  { sno: 6, name: "Dr. Nagendra Kumar P", qualification: "M.Tech, Ph.D", designation: "Associate Professor", slug: "cse-nagendrakumar", profileUrl: "https://gist.edu.in/gist/cse-nagendrakumar/" },
  { sno: 7, name: "Ms. Saleti Sumalatha", qualification: "M.Tech (Ph.D)", designation: "Associate Professor", slug: "cse-sumalatha", profileUrl: "https://gist.edu.in/gist/cse-sumalatha/" },
  { sno: 8, name: "Ms. Veguru Gayatri", qualification: "M.Tech (Ph.D)", designation: "Associate Professor", slug: "cse-gayatri", profileUrl: "https://gist.edu.in/gist/cse-gayatri/" },
  { sno: 9, name: "Ms. Vudduru Bharathi", qualification: "M.Tech", designation: "Associate Professor", slug: "cse-bharathi", profileUrl: "https://gist.edu.in/gist/cse-bharathi/" },
  { sno: 10, name: "Ms. N. Sivanagamani", qualification: "M.Tech", designation: "Associate Professor", slug: "cse-sivanagamani", profileUrl: "https://gist.edu.in/gist/cse-sivanagamani/" },
  { sno: 11, name: "Mr. Shaik Asiff", qualification: "M.E", designation: "Associate Professor", slug: "cse-asiff", profileUrl: "https://gist.edu.in/gist/cse-asiff/" },
  { sno: 12, name: "Mr. Yadavalli Madhava Rao", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-madhavarao", profileUrl: "https://gist.edu.in/gist/cse-madhavarao/" },
  { sno: 13, name: "Ms. Penubarthi Radhika", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-radhika", profileUrl: "https://gist.edu.in/gist/cse-radhika/" },
  { sno: 14, name: "Ms. Kanchi Sukeerthi", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-sukeerthi", profileUrl: "https://gist.edu.in/gist/cse-sukeerthi/" },
  { sno: 15, name: "Mr. Yanamala Venkataramesh", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-venkataramesh", profileUrl: "https://gist.edu.in/gist/cse-venkataramesh/" },
  { sno: 16, name: "Mr. Eriki Venkata Karthik", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-karthik", profileUrl: "https://gist.edu.in/gist/cse-karthik/" },
  { sno: 17, name: "Ms. Kollareddy Sreeja", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-sreeja", profileUrl: "https://gist.edu.in/gist/cse-sreeja/" },
  { sno: 18, name: "Mr. Rayapati Sivaiah", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-sivaiah", profileUrl: "https://gist.edu.in/gist/cse-sivaiah/" },
  { sno: 19, name: "Ms. Sulakhe Deepthi Ganapathi", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-deepthi", profileUrl: "https://gist.edu.in/gist/cse-deepthi/" },
  { sno: 20, name: "Mr. Syed Hyder", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-hyder", profileUrl: "https://gist.edu.in/gist/cse-hyder/" },
  { sno: 21, name: "Mr. Ramesh Dampuru", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-ramesh", profileUrl: "https://gist.edu.in/gist/cse-ramesh/" },
  { sno: 22, name: "Ms. Palem Chandrakala", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-chandrakala", profileUrl: "https://gist.edu.in/gist/cse-chandrakala/" },
  { sno: 23, name: "Mr. A. Lakshmi Sravan Kumar", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-sravankumar", profileUrl: "https://gist.edu.in/gist/cse-sravankumar/" },
  { sno: 24, name: "Mr. Konduru Balakrishna", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-balakrishna", profileUrl: "https://gist.edu.in/gist/cse-balakrishna/" },
  { sno: 25, name: "Ms. Kommi Sreelakshmi", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-sreelakshmi", profileUrl: "https://gist.edu.in/gist/cse-sreelakshmi/" },
  { sno: 26, name: "Mr. Thurimerla Prasanth", qualification: "M.Tech", designation: "Assistant Professor", slug: "cse-prasanth", profileUrl: "https://gist.edu.in/gist/cse-prasanth/" },
  { sno: 27, name: "Ms. Sowmya D", qualification: "B.Tech", designation: "Assistant Professor", slug: "cse-sowmya", profileUrl: "https://gist.edu.in/gist/cse-sowmya/" },
];

// Source: CSE department page — Laboratories section
export const LABORATORIES = [
  { name: "Computer Laboratory – I", computers: 70, incharge: "Mr. K. Chiranjeevi", config: "Dell i7, 6th Gen · 16GB RAM · 256GB SSD" },
  { name: "Computer Laboratory – II", computers: 70, incharge: "Mr. U. Satyanarayana", config: "Dell i5, 8th Gen · 8GB RAM · 1TB HDD" },
  { name: "Computer Laboratory – III", computers: 70, incharge: "Mr. Y. V. Ramesh", config: "Dell i7, 6th Gen · 16GB RAM · 256GB SSD" },
  { name: "Computer Laboratory – IV", computers: 70, incharge: "Mr. SK. Asiff", config: "Dell i7, 6th Gen · 16GB RAM · 256GB SSD" },
  { name: "Project Laboratory", computers: 70, incharge: "Dr. P. Babu", config: "Dell i7, 6th Gen · 16GB RAM · 256GB SSD" },
  { name: "Additional Laboratory", computers: 70, incharge: "Ms. B. Poojitha", config: "Lenovo i5, 6th Gen · 8GB RAM · 500GB HDD" },
  { name: "Research Laboratory", computers: 70, incharge: "Ms. V. Bharathi", config: "Lenovo i7, 6th Gen · 16GB RAM · 256GB SATA SSD" },
  { name: "NVIDIA Laboratory", computers: 30, incharge: "Mr. V. Chaitanya", config: "NVIDIA Jetson Nano dev kits · Waveshare 77° FoV cameras · AC8265 Wireless NIC" },
] as const;

// Source: CSE department page — MOU's table
export const MOUS = [
  { partner: "Great Learning", scope: "Online classes platform", validity: "18-08-2020 to 17-08-2021" },
  { partner: "Codegnan IT Solutions (OPC) Pvt. Ltd.", scope: "Expert sessions, seminars, workshops, FDPs, internships, on/off-campus training and certifications", validity: "16-06-2021 to 15-06-2023" },
  { partner: "EduSkills Foundation", scope: "Job fairs, seminars, conferences, national and global competitions", validity: "19-08-2021 to 18-08-2023" },
  { partner: "Hynture Private Limited, Hyderabad", scope: "Training, internships", validity: "22-02-2019 to 21-02-2022" },
  { partner: "VSS Innovative Technologies Pvt. Ltd.", scope: "Research, training, internships", validity: "28-06-2018 to 27-06-2021" },
  { partner: "Assistive Technologies", scope: "Consultancy, training, internships", validity: "17-08-2017 to 16-08-2020" },
];

// Source: CSE department page — Association & Activities (VOICE) event log
export const EVENTS = [
  { year: "2020-21", title: "GIST TECHFEST 2K21 — Poster Presentation, Photography, Voice of Youth, Project Expo, Technical Quiz, Paper Presentation, General Quiz", date: "26 Jun 2021", level: "National" },
  { year: "2019-20", title: "Technical Quiz", date: "25 Sep 2019", level: "Odd Sem" },
  { year: "2019-20", title: "Clash of Nerds", date: "09 Mar 2020", level: "Even Sem" },
  { year: "2018-19", title: "C-Debugging", date: "25 Sep 2018", level: "Odd Sem" },
  { year: "2018-19", title: "Elocution", date: "09 Mar 2019", level: "Even Sem" },
  { year: "2017-18", title: "5MT (5 Minutes Talk)", date: "25 Sep 2017", level: "Odd Sem" },
  { year: "2017-18", title: "Web Page Design", date: "09 Mar 2018", level: "Even Sem" },
  { year: "2016-17", title: "Hour Of Code", date: "20 Jul 2017", level: "Even Sem" },
  { year: "2016-17", title: "Model Making", date: "13 Feb 2018", level: "Odd Sem" },
];

// Source: Programmes Offered page (CSE, CSE-AIML, AI & DS)
export const PROGRAMMES = [
  { level: "B.Tech (UG)", title: "Computer Science and Engineering", intake: 420, duration: "4 Years" },
  { level: "B.Tech (UG)", title: "Computer Science and Engineering (Artificial Intelligence & Machine Learning)", intake: 120, duration: "4 Years" },
  { level: "B.Tech (UG)", title: "Artificial Intelligence (AI) and Data Science", intake: 120, duration: "4 Years" },
  { level: "M.Tech (PG)", title: "Computer Science and Engineering", intake: 18, duration: "2 Years" },
];

// Source: CSE page — Course Structure and Syllabus + Department Calendar sections
export const DOWNLOADS = [
  { category: "Syllabus (B.Tech)", title: "RG23 Course Structure and Syllabus", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Syllabus (B.Tech)", title: "RG22 Course Structure and Syllabus", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Syllabus (M.Tech)", title: "PRG25 Course Structure and Syllabus", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Academic Calendar", title: "Calendar of Events AY 2023-24 (Odd & Even Sem)", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Academic Calendar", title: "Calendar of Events AY 2022-23 (Odd & Even Sem)", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Academic Calendar", title: "Calendar of Events AY 2021-22 (Odd & Even Sem)", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
  { category: "Regulations", title: "Academic Regulations (Autonomous)", url: "https://gist.edu.in/gist/regulations-2/" },
  { category: "Course Outcomes", title: "Course Outcomes 2023-24", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
];

export const QUICK_LINKS = [
  { title: "Faculty", to: "/faculty", desc: "27 dedicated faculty members" },
  { title: "Programs", to: "/programs", desc: "B.Tech and M.Tech offerings" },
  { title: "Placements", to: "/placements", desc: "Recruiters and statistics" },
  { title: "Laboratories", to: "/labs", desc: "8 modern computing labs" },
  { title: "Research", to: "/research", desc: "AI, ML, IoT, Cyber Security" },
  { title: "Downloads", to: "/downloads", desc: "Syllabus, calendar, forms" },
  { title: "Events", to: "/events", desc: "Workshops, hackathons, seminars" },
  { title: "Gallery", to: "/gallery", desc: "Department in pictures" },
  { title: "Contact", to: "/contact", desc: "Reach the department" },
] as const;

// A minimal placement placeholder — the official CSE page links to a
// separate placements page. Kept generic and flagged as "official data
// pending" to avoid fabricating figures.
export const PLACEMENTS_NOTE =
  "Placement records are maintained by the Training & Placement Cell at GIST. Consolidated CSE placement statistics are being compiled — refer to the institute placement office for the latest verified figures.";
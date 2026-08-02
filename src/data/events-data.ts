// Data extracted from the official GIST CSE events page:
// https://gist.edu.in/gist/cseevents/
// Titles, images and report links are exactly as published. The official
// listing does not publish calendar dates, so events are grouped by the
// academic year under which the department published them.

export interface DepartmentEvent {
  title: string;
  url: string;
  image?: string;
  description?: string;
}

export interface EventYear {
  year: string;
  events: DepartmentEvent[];
}

export const eventsSourceUrl = "https://gist.edu.in/gist/cseevents/";

export const eventYears: EventYear[] = [
  {
    year: "2025-26",
    events: [
      {
        title: "Report on Value Added Course “PROBLEM SOLVING SKILLS IN PYTHON”",
        url: "https://gist.edu.in/gist/event/report-on-value-added-course-problem-solving-skills-in-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-7.10.00-PM-1-526x526.jpeg",
        description: "Report on Value Added Course “PROBLEM SOLVING SKILLS IN PYTHON” Start End Report on Value Added Course “ PROBLEM SOLVING SKILLS IN PYTHON ” The Department of Computer Science & Engineering, Geethanjali Institute of Science & Technology, organized a Value Added Course on **Problem Solving Skills in Python** by L. Aishwarya, Trainer & Developer, Xtragrad Technologies PVT Ltd, Hyderabad from 15-09-2025 to 22-09-2025. The objective of this course was to equip students with fundamental and advanced problem-solving abilities using Python programming language, which has become an essential tool in th"
      },
      {
        title: "Report on Guest Lecture “AI IN CLOUD PALTFORMS: AWS, AZURE AND GOOGLE AI TOOLS”",
        url: "https://gist.edu.in/gist/event/report-on-guest-lecture-ai-in-cloud-paltforms-aws-azure-and-google-ai-tools/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-04-at-8.03.58-AM-526x526.jpeg",
        description: "Report on Guest Lecture “AI IN CLOUD PALTFORMS: AWS, AZURE AND GOOGLE AI TOOLS” Start End Report on Guest Lecture “AI IN CLOUD PALTFORMS: AWS, AZURE AND GOOGLE AI TOOLS” The Department of Computer Science and Engineering organized a Guest Lecture for III B.Tech (CSE) students on “ AI IN CLOUD PALTFORMS: AWS, AZURE AND GOOGLE AI TOOLS ” by Mr. K.Venkata Ramana, Senior Software Engineer, Neurocraft Innovations Pvt Limited, Vanasthalipuram, Hyderabad, Telangana. Around 70 students of III B.Tech (CSE) actively participated in the guest lecture held on 6-09-2025. The session was well-received, and"
      },
      {
        title: "Report on Guest Lecture “THE BUILDING BLOCKS OF AI: ML AND DL”",
        url: "https://gist.edu.in/gist/event/report-on-guest-lecture-the-building-blocks-of-ai-ml-and-dl/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-04-at-8.08.42-AM-526x526.jpeg",
        description: "Report on Guest Lecture “THE BUILDING BLOCKS OF AI: ML AND DL” Start End Report on Guest Lecture “THE BUILDING BLOCKS OF AI: ML AND DL” The Department of Computer Science and Engineering organized a Guest Lecture for III B.Tech (CSE) students on “ THE BUILDING BLOCKS OF AI: ML AND DL ” by Mr.E.Nagarjuna, Quality Assurance Engineer, Celigo India Pvt Ltd, Hyderabad, Telangana. The session aimed to enhance the knowledge of students on Machine Learning and Deep Learning building blocks. Around 136 students of III B.Tech (CSE) actively participated in the guest lecture held on 6-09-2025. The sessio"
      },
      {
        title: "Report on Workshop: Data Analysis Using Python",
        url: "https://gist.edu.in/gist/event/report-on-workshop-data-analysis-using-python-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-23-at-11.55.46-AM-1-526x526.jpeg",
        description: "Report on Workshop: Data Analysis Using Python Start End Report on Workshop: Data Analysis Using Python Workshop on “Data Analysis using Python” was organized under Department of Computer Science and Engineering at Geethanjali Institute of Science and Technology from 09-09-2025 to 13-09-2025. The resource person for this workshop was Ms. M. Ruthumma, Trainer & Developer at Aylin Technologies Private Limited, New Delhi. Around 63 students of II B.Tech (CSE) actively participated in the workshop. Introduction A workshop on Data Analysis Using Python was conducted to equip participants with essen"
      },
      {
        title: "Report on Value Added Course “Applied Python for Problem Solving”",
        url: "https://gist.edu.in/gist/event/report-on-value-added-course-applied-python-for-problem-solving/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-7.12.03-PM-526x526.jpeg",
        description: "Report on Value Added Course “Applied Python for Problem Solving” Start End Report on Value Added Course “ Applied Python for Problem Solving ” The Department of Computer Science and Engineering organized a Value Added Course for II B.Tech (CSE) students on “ Applied Python for Problem Solving ” by Mr. D. Venkat Sai, Data Scientist, Neurocraft Innovations Private Limited, Hyderabad. The course was designed to provide students with practical knowledge of Python programming and its applications in solving real-world problems across various domains. Around 203 students of II B.Tech CSE-A,B,C sect"
      },
      {
        title: "Report on Career Guidance Program “Exploring Opportunities through GATE & JAM”",
        url: "https://gist.edu.in/gist/event/report-on-career-guidance-program-exploring-opportunities-through-gate-jam/",
        description: "Report on Career Guidance Program “Exploring Opportunities through GATE & JAM” Start End Report on Career Guidance Program “Exploring Opportunities through GATE & JAM” The Department of Computer Science and Engineering organized a Career Guidance Program on “Exploring Opportunities through GATE & JAM” on 22-09-2025. The session aimed at creating awareness among students about the significance of competitive examinations such as GATE (Graduate Aptitude Test in Engineering) and JAM (Joint Admission Test for M.Sc.) , and the career opportunities they open up in higher education, research, and pub"
      },
      {
        title: "Parent-Teacher Meeting (PTM) Report",
        url: "https://gist.edu.in/gist/event/parent-teacher-meeting-ptm-report/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-24-at-7.10.04-PM-526x526.jpeg",
        description: "Parent-Teacher Meeting (PTM) Report Start End Parent-Teacher Meeting (PTM) Report The Department of Computer Science & Engineering organized a Parent-Teacher Meeting (PTM) on 24-09-2025 for the II & III B.Tech CSE students . Around 40 parents attended the PTM. Key Points: Faculty members welcomed parents and briefed about the objectives of the PTM. Academic progress and Mid-I examination results of students were discussed. Attendance status and cases of shortage were highlighted. Faculty mentors shared details of student discipline, mentoring outcomes, and overall behavior. Information was pro"
      },
      {
        title: "REPORT ON INDUSTRIAL VISIT",
        url: "https://gist.edu.in/gist/event/report-on-industrial-visit/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-17-at-10.26.01-AM-526x526.jpeg",
        description: "REPORT ON INDUSTRIAL VISIT Start End REPORT ON INDUSTRIAL VISIT The Department of Computer Science and Engineering organized an industrial visit to BICS Global, Chennai on 12th September 2025 . A total of 135 students along with 7 faculty members actively participated in this visit. The objective of the visit was to expose students to the practical aspects of the IT industry and to familiarize them with the functioning of a professional corporate environment. The resource team at BICS Global provided an overview of the company profile, organizational structure, and key domains of expertise suc"
      },
      {
        title: "Report of Guest Lecture on “AI IS NOT THE FUTURE, IT IS THE PRESENT”",
        url: "https://gist.edu.in/gist/event/report-of-guest-lecture-on-ai-is-not-the-future-it-is-the-present/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-17-at-6.46.19-PM-526x526.jpeg",
        description: "Report of Guest Lecture on “AI IS NOT THE FUTURE, IT IS THE PRESENT” Start End Report of Guest Lecture on “AI IS NOT THE FUTURE, IT IS THE PRESENT” The Department of Computer Science and Engineering organized a Guest Lecture for IV B.Tech (CSE) students on “AI IS NOT THE FUTURE, IT IS THE PRESENT” by RAVI KIRAN PONDURI,CEO,DATA LEGOS TECH SOLUTIONS PVT LTD, NELLORE. The session aimed to enhance the knowledge of students on recent advancements and industry practices in the field of Computer Science and Engineering. Around 214 students of IV B.Tech (CSE) actively participated in the guest lectur"
      },
      {
        title: "Report of an online FDP on “POWER BI & TABLEAU”",
        url: "https://gist.edu.in/gist/event/23287/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-13-at-10.56.03-AM-526x526.jpeg",
        description: "Report of an online FDP on “POWER BI & TABLEAU” Start End Report of an online FDP on “POWER BI & TABLEAU” The Department of CSE organized an Online Faculty Development Programme (FDP) on Power BI & Tableau from 15-8-25 to 21-8-25. The objective of the FDP was to equip faculty members with advanced knowledge and hands-on skills in business intelligence and data visualization tools that are widely used in industry and academia. The FDP received enthusiastic participation from 41 faculty members of GIST. Participants actively engaged in Q&A sessions, hands-on practice, and shared their feedback o"
      },
    ],
  },
  {
    year: "2023-24",
    events: [
      {
        title: "A Six-Day Workshop on “AWS Cloud Computing”",
        url: "https://gist.edu.in/gist/event/a-six-day-workshop-on-aws-cloud-computing/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2024/08/Picture4-526x445.jpg",
        description: "A Six-Day Workshop on “AWS Cloud Computing” Start End A Six-Day Workshop on “AWS Cloud Computing” A Six day workshop on ‘ AWS Cloud Computing ’ has been going on for II B. Tech CSE C section students. This is being conducted by the joint auspices of department of Computer Science & Engineering and Andhra Pradesh State Skill Development Corporation (APSSDC) from 25-09-2023 to 30-09-2023. Total 71 participants registered for the workshop. The workshop is organizing with the objective of promoting the awareness and skills among the II-B.Tech CSE C section students about concepts of AWS cloud comp"
      },
      {
        title: "Report on a Five Day Workshop on “Value Added Course on Programming in Modern C++”",
        url: "https://gist.edu.in/gist/event/report-on-a-five-day-workshop-on-value-added-course-on-programming-in-modern-c/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-21-at-11.10.00-AM-1-526x526.jpeg",
        description: "Report on a Five Day Workshop on “Value Added Course on Programming in Modern C++” Start End Report on a Five Day Workshop on “Value Added Course on Programming in Modern C++” The Department of Computer Science and Engineering organized a Five-day Workshop on “Value Added Course on Programming in Modern C++” in association with Neuro Craft Innovations Private Limited Hyderabad & CSI at the Geethanjali Seminar Hall from 11-03-2024 to 16-03-2024. 210 students from II CSE attended workshop. The resource person details are as follows: Mr.M.Nagendra Data Scientist, Neuro Craft Innovations Private L"
      },
      {
        title: "Report on Industry Visited: Gowri Software Solutions: Bangalore",
        url: "https://gist.edu.in/gist/event/report-on-industry-visited-gowri-software-solutions-bangalore/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/11/IMG-20231005-WA0019-526x526.jpg",
        description: "Report on Industry Visited: Gowri Software Solutions: Bangalore Start End Report on Industry Visited: Gowri Software Solutions: Bangalore Date of Visit: 30nd September, 2023 In order to enhance the practical simulation and let them have an overview on the activities related to Software and its Development in day to day life a batch of IV B.Tech Computer Science & Engineering Students and four staff coordinators visited the Gowri Software Solutions at Bangalore on 30nd September, 2023 .This sector is mainly focusing on the Software testing and full stack development. Visited Co-Ordinator’s: Mr."
      },
    ],
  },
  {
    year: "2022-23",
    events: [
      {
        title: "Report on Industry Visited: Gowri Software Solutions:Bangalore",
        url: "https://gist.edu.in/gist/event/report-on-industry-visited-gowri-software-solutionsbangalore/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-26-at-9.45.29-PM-1-526x526.jpeg",
        description: "Report on Industry Visited: Gowri Software Solutions:Bangalore Start End Report on Industry Visited: Gowri Software Solutions : Bangalore Date of Visit: 17th March, 2023 In order to enhance the practical simulation and let them have an overview on the activities related to Software and its Development in day to day life a batch of IV B.Tech Computer Science & Engineering Students and four staff coordinators visited the Gowri Software Solutions at Bangalore on 17th March, 2023 .This sector is mainly focusing on the Software testing and full stack development. Visited Co-Ordinator’s: Ms. V. Bhar"
      },
      {
        title: "Report on A Five-Day FDPon “Python and its Applications”",
        url: "https://gist.edu.in/gist/event/report-on-a-five-day-fdpon-python-and-its-applications/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/07/WhatsApp-Image-2023-06-28-at-3.09.09-PM-526x526.jpeg",
        description: "Report on A Five-Day FDPon “Python and its Applications” Start End Report on A Five-Day FDPon “Python and its Applications” The Department of Computer Science and Engineering organized a Five-Day FDP on “ Python and its Applications ” in association with Zaven Technologies, Hyderabad at GIST, Nellore from 06/06/2023 to 10/06/2023. 91 faculty members attended. The resource person details are as follows: 1. Zaheer Ahamed Mulla M.Tech. (Ph.D.) Lead ML Engineer, Zaven Technologies, Hyderabad email id : zaheer@zaventechnologies.com 2.D. Venkata Sai B. E. Data Scientist, Zaven Technologies, Hyderaba"
      },
      {
        title: "REPORT ON PARENTS-TEACHERS MEETING",
        url: "https://gist.edu.in/gist/event/report-on-parents-teachers-meeting-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/05/IMG-20221214-WA0019-526x526.jpg",
        description: "REPORT ON PARENTS-TEACHERS MEETING Start End REPORT ON PARENTS-TEACHERS MEETING Date : 11-12-2023 Time: 10:00 AM – 12:30 PM A Parent-Teachers Meeting was conducted to III B.Tech-I Semester CSE students on 14-12-2023 from 10:00 AM – 12:30 PM at Digi-hall. Mentors given information about PTM to parents through Phone calls. Name of the event coordinators : Ms.N.Divya Sruthi, Assistant Professor,CSE Dept. & Mr.U.Satayanarayana Assistant Professor , CSE Dept. SALIENT FEATURES AND OUTCOMES of PTM: Interaction between Parents, Class Teachers, Subject Teachers and Mentors was done. There was a discuss"
      },
      {
        title: "REPORT ON PARENTS-TEACHERS MEETING",
        url: "https://gist.edu.in/gist/event/report-on-parents-teachers-meeting/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-29-at-11.14.00-AM-1-526x526.jpeg",
        description: "REPORT ON PARENTS-TEACHERS MEETING Start End REPORT ON PARENTS-TEACHERS MEETING Date : 14-11-2023 Time: 10:00 AM – 11:00 AM A Parent-Teachers Meeting was conducted to IV B.Tech-I Semester CSE students on 14-11-2023 from 10:00 AM – 11:00 AM at EB-205. Mentors given information about PTM to parents through Phone calls. Name of the event coordinators : Ms.N.SivaNagamani,AssociateProfessor,CSE Dept. & Mr.M.Kumar,Assistant Professor , CSE Dept. SALIENT FEATURES AND OUTCOMES of PTM: Interaction between Parents, Class Teachers, Subject Teachers and Mentors was done. There was a discussion on student’"
      },
      {
        title: "Guest Lecture on “Strategies for Academic Project Success and Paper Publishing”",
        url: "https://gist.edu.in/gist/event/guest-lecture-on-strategies-for-academic-project-success-and-paper-publishing/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/03/123-526x470.png",
        description: "Guest Lecture on “Strategies for Academic Project Success and Paper Publishing” Start End Guest Lecture on “Strategies for Academic Project Success and Paper Publishing” Venue: digihall Guest Lecture on “Strategies for Academic Project Success and Paper Publishing” was organized under “Department of Computer Science & Engineering” at Geethanjali Institute of Science & Technology on 30/01/2023 resource persons for the above program are Mulla Zaheer Ahmed Technical Lead & D Venkata Sai Program manager from Noise Digitals, Hyderabad. 122 Students of IV -II SEM Students, HOD & Faculty of CSE depar"
      },
      {
        title: "Report on A Five-Day Workshop on “ReactJS”",
        url: "https://gist.edu.in/gist/event/report-on-a-five-day-workshop-on-reactjs/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/03/WhatsApp-Image-2023-02-28-at-11.59.59-526x526.jpeg",
        description: "Report on A Five-Day Workshop on “ReactJS” Start End Report on A Five-Day Workshop on “ReactJS” The Department of Computer Science and Engineering organised a Five-Day Workshop on “ ReactJS ” in association with Assistive Technologies, Hyderabad at DIGI Hall, GIST, Nellore from 28/02/2023 to to10/03/2023.128 students from III Year I st Semester CSE attended the workshop. The resource person details are as follows: Rahamathulla M.CA (PhD) Senior Software Engineer Brillio Technologies Pvt Ltd Bengaluru. He has total IT experience 11 years and Corporate Trainer 5 years. Coordinators Details: Mr."
      },
      {
        title: "Report on Guest lecture On Awareness on AI,ML,DL Applications",
        url: "https://gist.edu.in/gist/event/report-on-guest-lecture-on-awareness-on-aimldl-applications/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/03/IMG-20230221-WA0046-526x526.jpg",
        description: "Report on Guest lecture On Awareness on AI,ML,DL Applications Start End Report on Guest lecture On Awareness on AI,ML,DL Applications The Department of Computer Science and Engineering organised a Guest Lecture on “Awareness on AI,ML,DL Applications” in association with Noise Digitals, Hyderabad at the Geethanjali Digi Hall on 21/02/2023. 107 students from III CSE Students attended the Guest Lecture. The resource persons details are as follows: D.Venkat Sai – Program Manager ,Noise digitals Pvt Ltd V.Rahamatullah –Senior software engineer Brillio Technologies Pvt Ltd Coordinators Details: Mr.V"
      },
      {
        title: "Report on Freshers Day celebrations 2022-23 on 7th January-2023",
        url: "https://gist.edu.in/gist/event/report-on-freshers-day-celebrations-2022-23-on-7th-january-2023/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/03/WhatsApp-Image-2023-02-22-at-13.46.45-526x526.jpeg",
        description: "Report on Freshers Day celebrations 2022-23 on 7th January-2023 Start End Report on Freshers Day celebrations 2022-23 on 7 th January-2023 Every student eagerly awaits right from their time of admission for their most remarkable event of the college “FRESHER’S PARTY”. The 7 th January-2023 was as a memorable day in the life of every fresher of academic year 2022-2023 batch at Geethanjali Institute of Science and Technology, Nellore. The fresher’s day was filled with excitement, joy, music, enthusiasm, laughter and happiness. It is the day where seniors and juniors finally bond and unite to cel"
      },
      {
        title: "Report on Freshers Day celebrations 2022-23 on 6th January-2023",
        url: "https://gist.edu.in/gist/event/report-on-freshers-day-celebrations-2022-23-on-6th-january-2023/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/03/WhatsApp-Image-2023-02-21-at-19.02.17-1-1-526x520.jpeg",
        description: "Report on Freshers Day celebrations 2022-23 on 6th January-2023 Start End Report on Freshers Day celebrations 2022-23 on 6 th January-2023 Every student eagerly awaits right from their time of admission for their most remarkable event of the college “FRESHER’S PARTY”. The 6 th January-2023 was as a memorable day in the life of every fresher of academic year 2022-2023 batch at Geethanjali Institute of Science and Technology, Nellore. The fresher’s day was filled with excitement, joy, music, enthusiasm, laughter and happiness. It is the day where seniors and juniors finally bond and unite to cel"
      },
      {
        title: "Report on A Five Day Workshop on “Building Applications with Python”",
        url: "https://gist.edu.in/gist/event/report-on-a-five-day-workshop-on-building-applications-with-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2023/02/111-526x526.jpeg",
        description: "Report on A Five Day Workshop on “Building Applications with Python” Start End Report on A Five Day Workshop on “Building Applications with Python” The Department of Computer Science and Engineering organised a Five-day Workshop on “Building Applications with Python” in association with Codegnan It Solutions & with CSI at the Geethanjali Seminar Hall from 06/02/2023 to to 10/02/2023. 107 students from IV CSE attended workshop. The resource persons details are as follows: K.Saketh – Co-Founder and CMO Codegnan IT Solutions Pvt Ltd Shaik Obaid -Python Developer Chintoju Sai Venu Gopal -Python De"
      },
    ],
  },
  {
    year: "2021-22",
    events: [
      {
        title: "Report on “Web Development using DJango framework”",
        url: "https://gist.edu.in/gist/event/report-on-web-development-using-django-framework/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/08/1-526x280.png"
      },
      {
        title: "Industry Visited: Prasara Bharathi Dooradarshan Kendra:Tirupati",
        url: "https://gist.edu.in/gist/event/industry-visited-prasara-bharathi-dooradarshan-kendratirupati/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-12.40.12-PM-526x526.jpeg"
      },
      {
        title: "Technophilie-2k22",
        url: "https://gist.edu.in/gist/event/technophilie-2k22/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/06/Technophilie-2k22-526x526.jpeg"
      },
      {
        title: "Report on one week workshop on “Selenium”",
        url: "https://gist.edu.in/gist/event/report-on-one-week-workshop-on-selenium/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/06/IMG-20220507-WA0046-526x526.jpg"
      },
      {
        title: "Report on Five Days workshop on: “Cyber Security”",
        url: "https://gist.edu.in/gist/event/report-on-five-days-workshop-on-cyber-security/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/06/20220528_111729-526x526.jpg"
      },
      {
        title: "Report on Guest lecture On “Cyber security”",
        url: "https://gist.edu.in/gist/event/report-on-guest-lecture-on-cyber-security/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/05/Gps__101148-526x526.jpeg"
      },
      {
        title: "Report on Guest lecture On “Data Analytics”",
        url: "https://gist.edu.in/gist/event/report-on-guest-lecture-on-data-analytics/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/05/IMG-20220421-WA0003-526x526.jpg"
      },
      {
        title: "Report on Inaugural Student’s Association VOICE-2K21",
        url: "https://gist.edu.in/gist/event/report-on-inaugural-students-association-voice-2k21/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2022/01/IMG_0157-526x526.jpg"
      },
    ],
  },
  {
    year: "2020-21",
    events: [
      {
        title: "Report on 5-Day online Work Shop on “Big Data using Hadoop”",
        url: "https://gist.edu.in/gist/event/report-on-5-day-online-work-shop-on-big-data-using-hadoop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/08/poster.png"
      },
      {
        title: "Report on One-Day Power Seminar On “Emotional Intelligence”",
        url: "https://gist.edu.in/gist/event/report-on-one-day-power-seminar-on-emotional-intelligence/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/08/Emotional-Intelligence-526x526.jpg"
      },
      {
        title: "Report for Webinar on “How to get prepared for placements amidst pandemic”",
        url: "https://gist.edu.in/gist/event/report-for-webinar-on-how-to-get-prepared-for-placements-amidst-pandemic/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/poster-526x526.png"
      },
      {
        title: "Report for Webinar on “Digital Marketing and Freelancing”",
        url: "https://gist.edu.in/gist/event/report-for-webinar-on-digital-marketing-and-freelancing/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/photo2-526x526.png"
      },
      {
        title: "Report on GISTECHFEST-2k21",
        url: "https://gist.edu.in/gist/event/report-on-gistechfest-2k21/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/06/gist-cse-2k21-526x526.jpg"
      },
      {
        title: "Report for Workshop on “Path to Artificial Intelligence”",
        url: "https://gist.edu.in/gist/event/report-for-workshop-on-path-to-artificial-intelligence/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/Poster-1-526x526.jpg"
      },
      {
        title: "Report on 3-week Online Workshop on Python Programming",
        url: "https://gist.edu.in/gist/event/report-on-3-week-online-workshop-on-python-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/BROCHURE-FINAL-526x526.jpg"
      },
      {
        title: "A Report On webinar on Career Opportunities after B.Tech_CSE",
        url: "https://gist.edu.in/gist/event/a-report-on-webinar-on-career-opportunities-after-b-tech_cse/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/w1-526x526.jpg"
      },
      {
        title: "Augumented Reality and Virtual Reality",
        url: "https://gist.edu.in/gist/event/augumented-reality-and-virtual-reality/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/07/Poster-526x526.jpg"
      },
      {
        title: "“DATA ANALYSIS USING PYTHON”",
        url: "https://gist.edu.in/gist/event/data-analysis-using-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/04/DSC_0133-526x526.jpg"
      },
    ],
  },
  {
    year: "2019-20",
    events: [
      {
        title: "NCATCSIT-2021",
        url: "https://gist.edu.in/gist/event/ncatcsit-2021/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2021/11/67-526x526.jpg"
      },
      {
        title: "AWS TECHNICAL ESSENTIALS (ONLINE)",
        url: "https://gist.edu.in/gist/event/aws-technical-essentials-online/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/02/APSSDC-logo.png"
      },
      {
        title: "Report for FDP on “PYTHON”",
        url: "https://gist.edu.in/gist/event/report-for-fdp-on-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/02/APSSDC-logo.png"
      },
      {
        title: "Report for Webinar on “ Introduction to Informatica PowerCentre”",
        url: "https://gist.edu.in/gist/event/report-for-webinar-on-introduction-to-informatica-powercentre/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/06/webinar-poster.gayatri-526x526.jpeg"
      },
      {
        title: "Report On “5 Days Python Workshop”",
        url: "https://gist.edu.in/gist/event/report-on-5-days-python-workshop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/06/python-526x526.jpg"
      },
      {
        title: "One Week Faculty Development Program on Python Programming",
        url: "https://gist.edu.in/gist/event/one-week-faculty-development-program-on-python-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/05/Python-Banner-526x432.jpg"
      },
      {
        title: "Report on C/C++",
        url: "https://gist.edu.in/gist/event/report-on-c-c/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/03/WhatsApp-Image-2020-02-29-at-7.48.46-PM-526x526.jpeg"
      },
      {
        title: "Report On “One day Arduino workshop”",
        url: "https://gist.edu.in/gist/event/report-on-one-day-arduino-workshop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/03/IMG-20200208-WA0010-526x526.jpg"
      },
      {
        title: "SIX DAY’S WORKSHOP AT GIST ON PROBLEM SOLVING & PROGRAMMING IN PYTHON",
        url: "https://gist.edu.in/gist/event/six-days-workshop-at-gist-on-problem-solving-programming-in-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/02/main-526x526.jpg"
      },
      {
        title: "A One day Workshop on “R Programming”",
        url: "https://gist.edu.in/gist/event/a-one-day-workshop-on-r-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/DSC_0485-526x526.jpg"
      },
      {
        title: "A Report On Six Day’s Workshop at GIST On Problem Solving & Programming in PYTHON",
        url: "https://gist.edu.in/gist/event/a-report-on-six-days-workshop-at-gist-on-problem-solving-programming-in-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/DSC_1312-526x526.jpg"
      },
      {
        title: "A One day Workshop on “Linux”",
        url: "https://gist.edu.in/gist/event/a-one-day-workshop-on-linux/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/DSC_0930-526x526.jpg"
      },
      {
        title: "A Five Day Workshop on Internet of Things",
        url: "https://gist.edu.in/gist/event/a-five-day-workshop-internet-of-things/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/IMG-20190727-WA0016-526x526.jpg"
      },
    ],
  },
  {
    year: "2018-19",
    events: [
      {
        title: "Search Engine Optimization Guest Lecture",
        url: "https://gist.edu.in/gist/event/search-engine-optimization-guest-lecture/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/02/GL-526x299.png"
      },
      {
        title: "NPTEL Online Certification",
        url: "https://gist.edu.in/gist/event/nptel-online-certification/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/01/2-2.jpg"
      },
      {
        title: "Cisco IT Essentials",
        url: "https://gist.edu.in/gist/event/cisco-it-essentials/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/01/1-3.jpg"
      },
      {
        title: "Report On One Day Industrial Visit to Tea Factory",
        url: "https://gist.edu.in/gist/event/report-on-one-day-industrial-visit-to-tea-factory/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/01/tea-factory-1-526x325.png"
      },
      {
        title: "Report On One day Python workshop",
        url: "https://gist.edu.in/gist/event/report-on-one-day-python-workshop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/20190622_095108-526x526.jpg"
      },
      {
        title: "IUCEE Virtual Academy Webinars held on March 14, 2019",
        url: "https://gist.edu.in/gist/event/iucee-virtual-academy-webinars-held-on-march-14-2019/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/iucee.jpg"
      },
      {
        title: "IUCEE Virtual Academy Webinars held on March 12, 2019",
        url: "https://gist.edu.in/gist/event/iucee-virtual-academy-webinars-held-on-march-12-2019/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/iucee.jpg"
      },
      {
        title: "A Five Day Workshop Big Data Ecosystem on Real- world",
        url: "https://gist.edu.in/gist/event/a-five-day-workshop-big-data-ecosystem-on-real-world/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/02/DSC_0911-526x526.jpg"
      },
      {
        title: "Workshop Big Data Ecosystem on Real-World",
        url: "https://gist.edu.in/gist/event/workshop-big-data-ecosystem-on-real-world/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/02/IMG-20190219-WA0021-526x526.jpg"
      },
      {
        title: "Machine Learning Using Python",
        url: "https://gist.edu.in/gist/event/machine-learning-using-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/02/DSC_0006-526x526.jpg"
      },
      {
        title: "Cloud Literacy Day",
        url: "https://gist.edu.in/gist/event/cloud-literacy-day/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/01/CloudLiteracy-526x526.jpg"
      },
      {
        title: "Seminar on Cyber Security in Everyday Life",
        url: "https://gist.edu.in/gist/event/cyber-security-in-everyday-life/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/11/bannner-526x526.jpg"
      },
      {
        title: "Indian Game Development Challenge",
        url: "https://gist.edu.in/gist/event/introduction-to-game-development/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/11/logo.png"
      },
      {
        title: "GUEST LECTURE ON MACHINE LEARNING & DEEP LEARNING",
        url: "https://gist.edu.in/gist/event/guest-lecture-on-machine-learning-deep-learning/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/10/dllogo.png"
      },
      {
        title: "NITTTR Workshop",
        url: "https://gist.edu.in/gist/event/nitttr-workshop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/10/OBE-Workshop.png"
      },
      {
        title: "ICATCSIT-18",
        url: "https://gist.edu.in/gist/event/icatcsit-18/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/10/IMG-20180824-WA0018-526x526.jpg"
      },
      {
        title: "ONE DAY INDUSTRIAL VISIT TO CONSENSUS",
        url: "https://gist.edu.in/gist/event/one-day-industrial-visit-to-consensus/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/10/iv.jpg"
      },
      {
        title: "workshop on AWS Technical Essential",
        url: "https://gist.edu.in/gist/event/workshop-on-aws-technical-essential/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/08/IMG_20180806_091922-526x526.jpg"
      },
      {
        title: "one week FDP on Hadoop",
        url: "https://gist.edu.in/gist/event/8736/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/07/hortonworks.jpg"
      },
    ],
  },
  {
    year: "2017-18",
    events: [
      {
        title: "NPTEL Online Certification",
        url: "https://gist.edu.in/gist/event/nptel-online-certification-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/01/2-2.jpg"
      },
      {
        title: "Report On One Day Industrial Visit to Tea Factory",
        url: "https://gist.edu.in/gist/event/report-on-one-day-industrial-visit-to-tea-factory-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2020/01/teafactory-2-526x445.png"
      },
      {
        title: "A Five Day Workshop Programming in Data Structures using Python",
        url: "https://gist.edu.in/gist/event/a-five-day-workshop-programming-in-data-structures-using-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_1139-526x526.jpg"
      },
      {
        title: "A Five Day Workshop Machine Learning for Engineering and Science Applications",
        url: "https://gist.edu.in/gist/event/a-five-day-workshop-machine-learning-for-engineering-and-science-applications/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_1181-526x526.jpg"
      },
      {
        title: "Machine Learning Using Python",
        url: "https://gist.edu.in/gist/event/machine-learning-using-python-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/02/DSC_0977-526x526.jpg"
      },
      {
        title: "PYTHON CERTIFICATION COURSE",
        url: "https://gist.edu.in/gist/event/python-certification-course/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/07/LOGO.jpg"
      },
      {
        title: "ICATCSIT-2018",
        url: "https://gist.edu.in/gist/event/icatcsit-2018/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/gist-logo-for-interaction.jpg"
      },
      {
        title: "Paper Presentations",
        url: "https://gist.edu.in/gist/event/paper-presentations/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/ppt.jpg"
      },
      {
        title: "C-Debugging",
        url: "https://gist.edu.in/gist/event/c-debugging-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/c-debugging.jpg"
      },
      {
        title: "One Day Workshop on Cyber Security",
        url: "https://gist.edu.in/gist/event/one-day-workshop-on-cyber-security/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/DSC_0061-526x359.jpg"
      },
      {
        title: "Two-Day Faculty Development Program on Introduction to R Programming",
        url: "https://gist.edu.in/gist/event/two-day-faculty-development-program-on-introduction-to-r-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/IMG_0159-526x526.jpg"
      },
      {
        title: "IUCEE Virtual Academy Webinars",
        url: "https://gist.edu.in/gist/event/iucee-virtual-academy-webinars-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/iucee.jpg"
      },
      {
        title: "IUCEE Virtual Academy Webinars",
        url: "https://gist.edu.in/gist/event/iucee-virtual-academy-webinars/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/04/iucee.jpg"
      },
      {
        title: "FDP on Introduction to R Programming",
        url: "https://gist.edu.in/gist/event/fdp-on-introduction-to-r-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/03/logo-3.png"
      },
      {
        title: "A THREE DAY WORKSHOP ON GOOGLE ANDROID DEVELOPER FUNDAMENTAL WORKSHOP",
        url: "https://gist.edu.in/gist/event/a-three-day-workshop-on-google-android-developer-fundamental-workshop/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/03/IMG_20180319_083832-526x526.jpg"
      },
      {
        title: "Industrial Visit to Mobile Programming India Pvt. Ltd.",
        url: "https://gist.edu.in/gist/event/industrial-visit-to-mobile-programming-india-pvt-ltd/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/03/IMG_20171021_110415-526x526.jpg"
      },
      {
        title: "ORACLE ACADEMY VIRTUAL STUDENT DAY",
        url: "https://gist.edu.in/gist/event/8277/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/02/oracle.jpg"
      },
      {
        title: "GIST ORGANIZED THE LIVE TELECAST ADDRESS BY PM",
        url: "https://gist.edu.in/gist/event/gist-organized-the-live-telecast-address-by-pm/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/02/event-526x450.jpg"
      },
      {
        title: "GIST Students shine in Intellect Design an association of the software major Polaris",
        url: "https://gist.edu.in/gist/event/8232/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/02/DSC_0343-526x526.jpg"
      },
      {
        title: "INDUSTRIAL VISIT TO INTELLECT DESIGN ARENA LTD.",
        url: "https://gist.edu.in/gist/event/industrial-visit-to-intellect-design-arena-ltd/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/01/feature-526x292.png"
      },
      {
        title: "ONE DAY INDUSTRIAL VISIT TO INTELLECT",
        url: "https://gist.edu.in/gist/event/one-day-industrial-visit-to-intellect/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/01/feature-526x292.png"
      },
      {
        title: "Parent’s Meet",
        url: "https://gist.edu.in/gist/event/parents-meet/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2018/01/parent-meeting.jpg"
      },
      {
        title: "Power Seminar on AWS",
        url: "https://gist.edu.in/gist/event/power-seminar-on-aws/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/12/aws.jpg"
      },
      {
        title: "NMEICT Workshop on Machine Learning",
        url: "https://gist.edu.in/gist/event/nmeict-workshop-on-machine-learning/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/nmeict-1.png"
      },
      {
        title: "A Two Day Workshop on Java Programming",
        url: "https://gist.edu.in/gist/event/a-two-day-workshop-on-java-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/09/ks002-526x526.jpg"
      },
      {
        title: "3 Day Workshop on Google Android Developer Fundamental Workshop (Phase-I)",
        url: "https://gist.edu.in/gist/event/3-day-workshop-on-google-android-developer-fundamental-workshop-phase-i/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/09/companylogo-526x526.png"
      },
      {
        title: "Guest Lecture on Java Programming",
        url: "https://gist.edu.in/gist/event/guest-lecture-on-java-programming/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/09/logo.jpg"
      },
      {
        title: "Fresher’s Party",
        url: "https://gist.edu.in/gist/event/freshers-party/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/08/freshers.jpg"
      },
      {
        title: "INTERNATIONAL CONFERENCE ON INTERNET OF THINGS FOR FUTURE SMART CITIES",
        url: "https://gist.edu.in/gist/event/7656/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/06/logo.png"
      },
    ],
  },
  {
    year: "2016-17",
    events: [
      {
        title: "Five Day Workshop Programming in Data Structures using Python",
        url: "https://gist.edu.in/gist/event/five-day-workshop-programming-in-data-structures-using-python-3/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_1069-526x526.jpg"
      },
      {
        title: "Five Day Workshop Machine Learning for Engineering and Science Applications",
        url: "https://gist.edu.in/gist/event/five-day-workshop-programming-in-data-structures-using-python/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_1073-526x526.jpg"
      },
      {
        title: "FDP on Machine learning and Big Data Analytics",
        url: "https://gist.edu.in/gist/event/fdp-on-machine-learning-and-big-data-analytics/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/07/machine-learning-526x526.jpg"
      },
      {
        title: "INTERNATIONAL CONFERENCE ON INNOVATIONS IN INTERNET OF THINGS FOR SMART CITIES",
        url: "https://gist.edu.in/gist/event/iciotsc-17/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/06/logo.png"
      },
      {
        title: "Farewell Party",
        url: "https://gist.edu.in/gist/event/farewell-party/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/05/fcse.png"
      },
      {
        title: "DIGIDHAN MELA",
        url: "https://gist.edu.in/gist/event/digidhan-mela/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/04/logo.png"
      },
      {
        title: "GUEST LECTURE BY Mr.P.SREENIVAS REDDY",
        url: "https://gist.edu.in/gist/event/6954/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/03/drdologo1-526x526.png"
      },
      {
        title: "Two Day Workshop on IOT",
        url: "https://gist.edu.in/gist/event/6907/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/03/picx-526x526.png"
      },
      {
        title: "GISTECHFEST-2K17",
        url: "https://gist.edu.in/gist/event/gistechfest-2k17/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/03/DSC_0190-526x526.jpg"
      },
      {
        title: "A One Day Workshop on MongoDB",
        url: "https://gist.edu.in/gist/event/a-one-day-workshop-on-mongodb/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/02/mo.png"
      },
      {
        title: "VILLAGE AWARENESS PROGRAMME ON DIGITAL TRANSACTIONS",
        url: "https://gist.edu.in/gist/event/village-awareness-programme-on-digital-transactions/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/DSC_0899-526x526.jpg"
      },
      {
        title: "National Women’s Parliament",
        url: "https://gist.edu.in/gist/event/national-womens-parliament/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/02/nw.jpg"
      },
      {
        title: "HACKATHON AND IDEATHON CONTEST 2017",
        url: "https://gist.edu.in/gist/event/hackathon-and-ideathon-contest-2017/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/02/APSSDC-logo.png"
      },
      {
        title: "Indian Science Congress",
        url: "https://gist.edu.in/gist/event/indian-science-congress/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/01/isc.png"
      },
      {
        title: "Smart India Hackathon",
        url: "https://gist.edu.in/gist/event/smart-india-hackathon/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2017/01/hackathon.jpg"
      },
      {
        title: "National Conference on Advanced Trends in Computer Science and Information Technology",
        url: "https://gist.edu.in/gist/event/ncatcsit-16/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/10/6-x-4-2-CP-copy.jpg"
      },
      {
        title: "C Debugging",
        url: "https://gist.edu.in/gist/event/c-debugging/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/05/college_logo4.png"
      },
      {
        title: "Guest Lecture on IOT and Cloud Computing",
        url: "https://gist.edu.in/gist/event/guest-lecture-on-iot-and-cloud-computing/"
      },
      {
        title: "NCATCSIT 2016",
        url: "https://gist.edu.in/gist/event/ncatcsit-2016/"
      },
      {
        title: "GIST as Oracle Academy",
        url: "https://gist.edu.in/gist/event/gist-as-oracle-academy/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/07/oralogo.jpg"
      },
      {
        title: "GIST as NPTEL Study Center",
        url: "https://gist.edu.in/gist/event/gist-as-nptel-study-center/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/nptel-526x526.jpg"
      },
    ],
  },
  {
    year: "2015-16",
    events: [
      {
        title: "Five Day FDP on Home Automation Using IOT",
        url: "https://gist.edu.in/gist/event/five-day-fdp-on-home-automation-using-iot/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0124-1-526x526.jpg"
      },
      {
        title: "Five Day Workshop Programming in Data Structures using Python",
        url: "https://gist.edu.in/gist/event/five-day-workshop-programming-in-data-structures-using-python-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0036-526x526.jpg"
      },
      {
        title: "Five Day Workshop Machine Learning for Engineering and Science Applications",
        url: "https://gist.edu.in/gist/event/five-day-workshop-machine-learning-for-engineering-and-science-applications/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0058-526x526.jpg"
      },
      {
        title: "Project Expo",
        url: "https://gist.edu.in/gist/event/5712/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/07/project-expo.png"
      },
      {
        title: "NCATCSIT-2015",
        url: "https://gist.edu.in/gist/event/ncatcsit-2015-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2014/05/dsc_0715.jpg"
      },
      {
        title: "Two day Workshop on Ethical Hacking",
        url: "https://gist.edu.in/gist/event/two-day-workshop-on-ethical-hacking/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/e1-526x526.jpg"
      },
      {
        title: "GIST as SAP Academy",
        url: "https://gist.edu.in/gist/event/gist-as-sap-academy/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/sap-526x526.png"
      },
      {
        title: "Industrial Visit to Tea Factory,OOTY",
        url: "https://gist.edu.in/gist/event/industrial-visit-to-tea-factoryooty/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/t3.jpg"
      },
      {
        title: "January 1st Celebrations",
        url: "https://gist.edu.in/gist/event/january-1st-celebrations/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/j1-526x480.png"
      },
      {
        title: "Cse Dept. Certificates distribution on Annual day",
        url: "https://gist.edu.in/gist/event/cse-dept-certificates-distribution-on-annual-day/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/a4-526x526.jpg"
      },
      {
        title: "News Board Inauguration",
        url: "https://gist.edu.in/gist/event/news-board-inauguration/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/i3-526x480.jpg"
      },
      {
        title: "IUCEE Research Cluster webinar on Cloud Computing",
        url: "https://gist.edu.in/gist/event/iucee-research-cluster-webinar-on-cloud-computing/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/1-526x526.jpg"
      },
      {
        title: "Workshop on Trends in Mobile Computing, Internet of Things & Cyber Physical Systems",
        url: "https://gist.edu.in/gist/event/workshop-on-trends-in-mobile-computing-internet-of-things-cyber-physical-systems/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2014/05/1-1-526x480.jpg"
      },
    ],
  },
  {
    year: "2014-15",
    events: [
      {
        title: "Five Day FDP on AI USING NEURAL NETWORKS",
        url: "https://gist.edu.in/gist/event/five-day-fdp-on-ai-using-neural-networks/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0168-526x526.jpg"
      },
      {
        title: "Five Day Workshop Programming in Data Structures using Python",
        url: "https://gist.edu.in/gist/event/five-day-workshop-programming-in-data-structures-using-python-4/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0087-526x526.jpg"
      },
      {
        title: "Five Day Workshop Machine Learning for Engineering and Science Applications",
        url: "https://gist.edu.in/gist/event/five-day-workshop-machine-learning-for-engineering-and-science-applications-2/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0110-1-526x526.jpg"
      },
      {
        title: "Five Day FDP on Android And Web Application Development",
        url: "https://gist.edu.in/gist/event/five-day-fdp-on-android-and-web-application-development/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2019/03/DSC_0153-1-526x526.jpg"
      },
      {
        title: "NCATCSIT-14",
        url: "https://gist.edu.in/gist/event/ncatcsit-14/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/n4.jpg"
      },
    ],
  },
  {
    year: "2013-14",
    events: [
      {
        title: "GIST as Remote Center of IITBombay",
        url: "https://gist.edu.in/gist/event/gist-as-remote-center-of-iitbombay/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/nmeict-1.png"
      },
      {
        title: "Spoken Tutorials Under IIT Bombay",
        url: "https://gist.edu.in/gist/event/spoken-tutorials-under-iit-bombay/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/s1.png"
      },
    ],
  },
  {
    year: "2011-12",
    events: [
      {
        title: "GIST CSI Student Chapter",
        url: "https://gist.edu.in/gist/event/gist-csi-student-chapter/",
        image: "https://gist.edu.in/gist/wp-content/uploads/2016/06/csi.jpg"
      },
    ],
  }
];


export function getEventCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('workshop') || t.includes('vac') || t.includes('value added')) return 'Workshops';
  if (t.includes('guest lecture') || t.includes('seminar') || t.includes('webinar')) return 'Guest Lectures';
  if (t.includes('visit') || t.includes('industrial')) return 'Industrial Visits';
  if (t.includes('fdp') || t.includes('faculty development')) return 'FDPs';
  if (t.includes('ptm') || t.includes('parent')) return 'PTMs';
  if (t.includes('fest') || t.includes('freshers') || t.includes('farewell') || t.includes('celebration')) return 'Fests & Cultural';
  if (t.includes('conference') || t.includes('symposium') || t.includes('icatcsit')) return 'Conferences';
  if (t.includes('hackathon') || t.includes('coding') || t.includes('challenge')) return 'Hackathons';
  return 'Department Events';
}

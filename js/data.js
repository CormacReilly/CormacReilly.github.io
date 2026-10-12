/*
 * Site content lives here. Every page reads from this file.
 *
 * To add a project: copy one object in PROJECTS, give it a unique `id`
 * (used in the URL: project.html?id=your-id), and fill in the fields.
 * Order in this array = order on the Projects page.
 *
 * Tags drive the filter buttons — keep to a small consistent set:
 *   "Mechanical", "Electrical", "Software", "Hardware"
 */

const SITE = {
  name: "Cormac Reilly",
  email: "careill2@asu.edu",
  linkedin: "https://www.linkedin.com/in/cormacreilly",
  github: "", // e.g. "https://github.com/your-username" — icon is hidden while empty
  resumePdf: "assets/resume.pdf",
};

const PROJECTS = [
  {
    id: "autocross-daq",
    title: "Autocross Data Acquisition System",
    summary:
      "A performance data-acquisition system combining CAN/OBD-II telemetry, synchronized video, and custom analysis software for SCCA autocross.",
    tags: ["Electrical", "Software", "Hardware"],
    dates: "2026 – Present",
    status: "In progress",
    featured: true,
    image: "", // e.g. "assets/projects/daq-hero.jpg"
    imageAlt: "",
    tools: ["CAN bus", "OBD-II", "Arduino / embedded C", "MATLAB", "Video sync"],
    sections: [
      {
        heading: "Overview",
        body:
          "Designed and prototyped a data-acquisition system that integrates vehicle CAN/OBD-II telemetry, synchronized video, and custom software to capture and analyze both vehicle and driver data during SCCA autocross events.",
      },
      {
        heading: "Outcome",
        body:
          "Used the system to tune run-to-run against tire temperature and timing data over a full season in novice class.",
      },
    ],
    highlights: ["Gained 14 positions in novice class over one season"],
    todo: ["System architecture diagram", "Hardware build photos", "Sample data plots and analysis"],
    links: [], // e.g. [{ label: "Source on GitHub", url: "https://github.com/..." }]
  },
  {
    id: "k5-blazer",
    title: "1972 Chevrolet K5 Blazer Restoration",
    summary:
      "A four-year mechanical and electrical restoration of a 50-year-old 4×4, from drivetrain to wiring harness, sold at auction for about $70,000.",
    tags: ["Mechanical", "Electrical"],
    dates: "2021 – 2025",
    status: "Complete",
    featured: true,
    image: "",
    imageAlt: "",
    tools: ["Drivetrain rebuild", "Brakes & suspension", "Wiring harness", "Electrical diagnostics", "BOM & budgeting"],
    sections: [
      {
        heading: "Overview",
        body:
          "Rebuilt the drivetrain, brake, and suspension systems and replaced the complete wiring harness on a 50-year-old 4×4, diagnosing faults with no factory service data available.",
      },
      {
        heading: "My role",
        body:
          "Owned the full bill of materials, parts sourcing, budget, and build sequence across more than 2,000 build hours.",
      },
      {
        heading: "Outcome",
        body: "The finished truck sold at auction via Bring a Trailer for approximately $70,000.",
      },
    ],
    highlights: ["2,000+ build hours", "Sold for ~$70,000"],
    todo: ["Before / after photos", "Wiring harness write-up"],
    links: [],
  },
];

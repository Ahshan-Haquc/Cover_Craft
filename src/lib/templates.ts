import type { CoverLetterTemplate, CoverLetterFormData } from "@/types";

export const templates: CoverLetterTemplate[] = [
  {
    id: "standard",
    name: "Standard Professional",
    description: "Your original letter — balanced, warm, and complete.",
    badge: "Original",
    badgeColor: "bg-violet-100 text-violet-600",
    generate: ({
      companyName,
      positionName,
      hiringManagerName,
      customWhyInterested,
      senderName,
    }: CoverLetterFormData): string => {
      const greeting = hiringManagerName.trim()
        ? `Dear ${hiringManagerName},`
        : "Dear Hiring Manager,";
      const interest = customWhyInterested.trim()
        ? customWhyInterested.trim()
        : `its strong engineering culture, commitment to quality software development, and opportunities to work on impactful projects for global clients`;

      return `${greeting}

I am writing to express my interest in the ${positionName} position at ${companyName}.

I recently completed my B.Sc. in Computer Science and Engineering from Green University of Bangladesh and am currently working as a Junior Frontend Developer at Softvence IT Ltd. In my professional role, I have contributed to the development of production-level SaaS, healthcare, e-commerce, and multi-tenant applications using modern technologies such as React.js, Next.js, TypeScript, Node.js, MongoDB, and MySQL.

Beyond development, I actively practice competitive programming on Codeforces, which has strengthened my understanding of data structures, algorithms, object-oriented programming, and analytical problem-solving. These skills help me approach software challenges systematically and develop efficient, maintainable solutions.

I am particularly interested in ${companyName} because of ${interest}. I am confident that my technical background, problem-solving ability, eagerness to learn, and experience collaborating within professional development teams would allow me to contribute effectively to your organization.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my skills and experiences align with the ${positionName} position at ${companyName}.

Sincerely,
${senderName}`;
    },
  },

  {
    id: "concise",
    name: "Concise & Punchy",
    description: "Short and direct — ideal for busy hiring managers.",
    badge: "Modern",
    badgeColor: "bg-sky-100 text-sky-600",
    generate: ({
      companyName,
      positionName,
      hiringManagerName,
      customWhyInterested,
      senderName,
    }: CoverLetterFormData): string => {
      const greeting = hiringManagerName.trim()
        ? `Dear ${hiringManagerName},`
        : "Dear Hiring Manager,";
      const interest = customWhyInterested.trim()
        ? customWhyInterested.trim()
        : `its reputation for building high-quality software products and fostering a strong engineering culture`;

      return `${greeting}

I am excited to apply for the ${positionName} position at ${companyName}. As a Junior Frontend Developer at Softvence IT Ltd., I have hands-on experience shipping production-grade SaaS, healthcare, and e-commerce platforms — and I am looking for the right team to grow with.

My stack — React.js, Next.js, TypeScript, Node.js, MongoDB, and MySQL — maps closely to modern full-stack development needs. Competitive programming on Codeforces keeps my algorithmic thinking sharp and translates directly into cleaner, more efficient code.

${companyName} stands out to me because of ${interest}. I am confident I can contribute meaningfully from day one while continuing to grow alongside your team.

I would love the opportunity to discuss the ${positionName} role further. Thank you for your consideration.

Sincerely,
${senderName}`;
    },
  },

  {
    id: "technical",
    name: "Technical Depth",
    description: "Goes deep on your stack and engineering mindset.",
    badge: "Dev-Focused",
    badgeColor: "bg-emerald-100 text-emerald-600",
    generate: ({
      companyName,
      positionName,
      hiringManagerName,
      customWhyInterested,
      senderName,
    }: CoverLetterFormData): string => {
      const greeting = hiringManagerName.trim()
        ? `Dear ${hiringManagerName},`
        : "Dear Hiring Manager,";
      const interest = customWhyInterested.trim()
        ? customWhyInterested.trim()
        : `its technically challenging projects, collaborative engineering environment, and focus on delivering high-quality software solutions`;

      return `${greeting}

I am writing to apply for the ${positionName} position at ${companyName}. With a B.Sc. in Computer Science and Engineering from Green University of Bangladesh and professional experience as a Junior Frontend Developer at Softvence IT Ltd., I have developed strong, hands-on expertise in building modern, production-ready web applications.

My primary technical proficiency lies in React.js, Next.js, TypeScript, Node.js, MongoDB, and MySQL. In my current role, I have architected and delivered multiple full-stack applications — including multi-tenant SaaS platforms, healthcare portals, and e-commerce solutions — with a consistent focus on performance optimization, clean component architecture, and maintainable code practices using Redux Toolkit, RTK Query, and Tailwind CSS.

I complement my development work with competitive programming on Codeforces, which has deepened my understanding of data structures, algorithms, and problem decomposition. These skills translate directly into writing efficient, scalable software and approaching engineering challenges with both analytical rigor and creative thinking.

I am particularly drawn to ${companyName} because of ${interest}. I am eager to bring my skills, strong work ethic, and collaborative mindset to your engineering team and contribute to building exceptional software products.

Thank you for considering my application. I would be glad to discuss how my technical background aligns with the requirements of the ${positionName} role at ${companyName}.

Sincerely,
${senderName}`;
    },
  },
];
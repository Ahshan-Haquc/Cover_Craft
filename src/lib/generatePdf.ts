export async function generateCoverLetterPdf(
  content: string,
  companyName: string,
  positionName: string
): Promise<void> {
  // Dynamic import to avoid SSR issues in Next.js
  const { default: jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();   // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const marginH = 25;
  const marginTop = 35;
  const marginBottom = 30;
  const contentWidth = pageWidth - marginH * 2; // 160mm

  const FONT_SIZE = 11;
  const LINE_HEIGHT = 6.4;
  const PARA_GAP = 4.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SIZE);
  doc.setTextColor(30, 30, 30);

  let y = marginTop;

  const addLine = (text: string) => {
    if (y + LINE_HEIGHT > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(text, marginH, y);
    y += LINE_HEIGHT;
  };

  const addParagraph = (para: string) => {
    // Handle internal \n (e.g. "Sincerely,\nAhsan")
    const subLines = para.split("\n");
    for (const subLine of subLines) {
      const wrapped = doc.splitTextToSize(subLine.trim(), contentWidth) as string[];
      for (const line of wrapped) {
        addLine(line);
      }
    }
    y += PARA_GAP;
  };

  // Split content into paragraphs by double newline
  const paragraphs = content.split("\n\n");

  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i].trim();
    if (!para) continue;

    // Add a little extra breathing room before closing "Sincerely,"
    if (para.startsWith("Sincerely")) {
      y += 3;
    }

    addParagraph(para);
  }

  // Generate filename: cover-letter-enosis-solutions-software-engineer.pdf
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const filename = `cover-letter-${slugify(companyName)}-${slugify(positionName)}.pdf`;
  doc.save(filename);
}
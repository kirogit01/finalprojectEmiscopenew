import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateMonthlyReportPDF = (dailyEmissions, weeklyEmissions) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Monthly Emissions Report', 14, 22);
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  autoTable(doc, {
    startY: 40,
    head: [['Time', 'CO (ppm)']],
    body: dailyEmissions.map(entry => [entry.time, entry.co.toString()]),
    theme: 'striped',
    headStyles: { fillColor: [52, 152, 219] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: finalY,
    head: [['Day', 'CO (ppm)']],
    body: weeklyEmissions.map(entry => [entry.day, entry.co.toString()]),
    theme: 'striped',
    headStyles: { fillColor: [46, 204, 113] },
  });

  doc.save('Monthly_Emissions_Report.pdf');
};

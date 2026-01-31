import { jsPDF } from 'jspdf';
import type { Mietvertrag } from '../types';
import { BETRIEBSKOSTEN_LABELS, ABRECHNUNGSSCHLUESSEL_LABELS } from '../types';

interface PDFConfig {
  margin: { top: number; right: number; bottom: number; left: number };
  lineHeight: number;
  fontSize: { title: number; heading: number; subheading: number; normal: number; small: number };
  colors: { primary: string; text: string; muted: string; accent: string; line: string };
}

const config: PDFConfig = {
  margin: { top: 25, right: 20, bottom: 25, left: 20 },
  lineHeight: 6,
  fontSize: { title: 18, heading: 12, subheading: 10, normal: 9, small: 8 },
  colors: { primary: '#1a1a1a', text: '#333333', muted: '#666666', accent: '#00bcd4', line: '#e0e0e0' },
};

export function generateMietvertragPDF(vertrag: Mietvertrag): void {
  console.log('PDF Generation gestartet...');
  
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  let currentY = config.margin.top;
  let pageNumber = 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - config.margin.left - config.margin.right;

  const checkPageBreak = (neededHeight: number = 20): void => {
    if (currentY + neededHeight > pageHeight - config.margin.bottom) {
      addFooter();
      doc.addPage();
      pageNumber++;
      currentY = config.margin.top;
      addHeader();
    }
  };

  const addHeader = (): void => {
    doc.setFontSize(config.fontSize.small);
    doc.setTextColor(config.colors.muted);
    doc.text('MIETVERTRAG', config.margin.left, 12);
    doc.text(`Erstellt am ${new Date().toLocaleDateString('de-DE')}`, pageWidth - config.margin.right, 12, { align: 'right' });
    doc.setDrawColor(config.colors.line);
    doc.line(config.margin.left, 15, pageWidth - config.margin.right, 15);
  };

  const addFooter = (): void => {
    doc.setFontSize(config.fontSize.small);
    doc.setTextColor(config.colors.muted);
    doc.setDrawColor(config.colors.line);
    doc.line(config.margin.left, pageHeight - 15, pageWidth - config.margin.right, pageHeight - 15);
    doc.text(`Seite ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  };

  const addTitle = (text: string): void => {
    checkPageBreak(20);
    doc.setFontSize(config.fontSize.title);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.primary);
    doc.text(text, pageWidth / 2, currentY, { align: 'center' });
    currentY += 12;
  };

  const addParagraph = (number: string, title: string): void => {
    checkPageBreak(15);
    currentY += 5;
    doc.setFillColor(config.colors.accent);
    doc.rect(config.margin.left, currentY - 4, 2, 8, 'F');
    doc.setFontSize(config.fontSize.heading);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.primary);
    doc.text(`${number} ${title}`, config.margin.left + 5, currentY);
    currentY += 8;
    doc.setDrawColor(config.colors.line);
    doc.line(config.margin.left, currentY, pageWidth - config.margin.right, currentY);
    currentY += 5;
  };

  const addText = (text: string, indent: number = 0): void => {
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(config.colors.text);
    const maxWidth = contentWidth - indent;
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      checkPageBreak(config.lineHeight);
      doc.text(line, config.margin.left + indent, currentY);
      currentY += config.lineHeight;
    }
  };

  const addLabelValue = (label: string, value: string, indent: number = 0): void => {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(config.colors.muted);
    doc.text(label + ':', config.margin.left + indent, currentY);
    doc.setTextColor(config.colors.text);
    doc.setFont('helvetica', 'bold');
    doc.text(value || '-', config.margin.left + indent + 45, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += config.lineHeight;
  };

  const addCheckbox = (text: string, checked: boolean, indent: number = 0): void => {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setTextColor(config.colors.text);
    const prefix = checked ? '[X] ' : '[ ] ';
    doc.text(prefix + text, config.margin.left + indent, currentY);
    currentY += config.lineHeight;
  };

  const addSpace = (height: number = 5): void => {
    currentY += height;
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('de-DE');
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  };

  // PDF Content generieren
  addHeader();
  addTitle('MIETVERTRAG');
  addSpace(3);
  
  doc.setFontSize(config.fontSize.subheading);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(config.colors.muted);
  const vertragsartLabel = vertrag.vertragsart === 'wohnraum' ? 'fuer Wohnraum' : 
                           vertrag.vertragsart === 'gewerbe' ? 'fuer Gewerberaeume' : 
                           'fuer Garage/Stellplatz';
  doc.text(vertragsartLabel, pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  // §1 Vertragsparteien
  addParagraph('§1', 'Vertragsparteien');
  addText('Zwischen', 0);
  addSpace(3);
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.accent);
  doc.text('VERMIETER', config.margin.left + 5, currentY);
  currentY += 5;
  
  const { vermieter } = vertrag;
  addLabelValue('Name', vermieter.name, 5);
  addLabelValue('Anschrift', `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}`, 5);
  if (vermieter.vertreter) addLabelValue('Vertreten durch', vermieter.vertreter, 5);
  if (vermieter.telefon) addLabelValue('Telefon', vermieter.telefon, 5);
  if (vermieter.email) addLabelValue('E-Mail', vermieter.email, 5);
  
  addSpace(5);
  addText('und', 0);
  addSpace(3);
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.accent);
  doc.text('MIETER', config.margin.left + 5, currentY);
  currentY += 5;
  
  vertrag.mieter.forEach((m, index) => {
    if (index > 0) addSpace(3);
    addLabelValue(`Mieter ${index + 1}`, `${m.vorname} ${m.nachname}`, 5);
    addLabelValue('Geboren am', formatDate(m.geburtsdatum), 5);
    addLabelValue('Aktuelle Anschrift', `${m.strasse}, ${m.plz} ${m.ort}`, 5);
  });
  
  addSpace(5);
  addText('wird folgender Mietvertrag geschlossen:', 0);

  // §2 Mietraeume
  addParagraph('§2', 'Mietraeume');
  const { mietobjekt } = vertrag;
  const nutzung = vertrag.vertragsart === 'wohnraum' ? 'Wohnung' : vertrag.vertragsart === 'gewerbe' ? 'Gewerberaeume' : 'Stellplatz';
  addText(`Der Vermieter vermietet dem Mieter zum Zwecke der Nutzung als ${nutzung} folgende Raeume:`);
  addSpace(3);
  
  addLabelValue('Adresse', `${mietobjekt.strasse} ${mietobjekt.hausnummer}`, 5);
  if (mietobjekt.wohnungsnummer) addLabelValue('Wohnungs-Nr.', mietobjekt.wohnungsnummer, 5);
  addLabelValue('PLZ / Ort', `${mietobjekt.plz} ${mietobjekt.ort}`, 5);
  addLabelValue('Geschoss', mietobjekt.geschoss, 5);
  if (mietobjekt.lage) addLabelValue('Lage', mietobjekt.lage, 5);
  
  addSpace(3);
  addLabelValue('Wohnflaeche ca.', `${mietobjekt.wohnflaeche} m2`, 0);

  // §3 Mietzeit
  addParagraph('§3', 'Mietzeit');
  const { mietzeit } = vertrag;
  addLabelValue('Mietbeginn', formatDate(mietzeit.mietbeginn), 0);
  
  if (mietzeit.befristet) {
    addLabelValue('Mietende', formatDate(mietzeit.mietende || ''), 0);
    addText(`Das Mietverhaeltnis ist befristet bis zum ${formatDate(mietzeit.mietende || '')}.`);
  } else {
    addText('Das Mietverhaeltnis wird auf unbestimmte Zeit geschlossen.');
  }

  // §4 Miete
  addParagraph('§4', 'Miete');
  const { miete } = vertrag;
  addText('Der Mieter zahlt folgende monatliche Miete:', 0);
  addSpace(3);
  
  addLabelValue('Grundmiete Wohnung', formatCurrency(miete.grundmieteWohnung), 5);
  if (miete.grundmieteGarage > 0) addLabelValue('Grundmiete Garage', formatCurrency(miete.grundmieteGarage), 5);
  addLabelValue('Grundmiete gesamt', formatCurrency(miete.grundmieteGesamt), 5);
  addLabelValue('+ Betriebskostenvorauszahlung', formatCurrency(miete.nebenkostenVorauszahlung), 5);
  
  addSpace(3);
  doc.setFontSize(config.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(config.colors.accent);
  doc.text(`GESAMTMIETE: ${formatCurrency(miete.gesamtmiete)}`, config.margin.left + 5, currentY);
  currentY += config.lineHeight + 3;

  // §5 Betriebskosten
  addParagraph('§5', 'Betriebskosten');
  addText('Folgende Betriebskosten werden umgelegt:');
  addSpace(3);
  
  const bk = vertrag.betriebskosten;
  const aktiveBK = (Object.keys(BETRIEBSKOSTEN_LABELS) as Array<keyof typeof BETRIEBSKOSTEN_LABELS>)
    .filter(key => bk[key]?.aktiv);
  
  aktiveBK.forEach(key => {
    const pos = bk[key];
    const schluesselLabel = ABRECHNUNGSSCHLUESSEL_LABELS[pos.schluessel] || '';
    addCheckbox(`${BETRIEBSKOSTEN_LABELS[key]} (${schluesselLabel})`, true, 5);
  });

  // §6 Kaution
  addParagraph('§6', 'Kaution');
  const { kaution } = vertrag;
  addLabelValue('Kautionsbetrag', formatCurrency(kaution.betrag), 0);

  // §7 Bankverbindung
  addParagraph('§7', 'Bankverbindung');
  const { bankverbindung } = vertrag;
  addLabelValue('Kontoinhaber', bankverbindung.kontoinhaber, 0);
  addLabelValue('IBAN', bankverbindung.iban, 0);

  // Unterschriften
  checkPageBreak(60);
  addParagraph('§8', 'Unterschriften');
  
  const { unterschriften } = vertrag;
  addSpace(5);
  addText(`${unterschriften.ort}, den ${formatDate(unterschriften.datum)}`, 0);
  addSpace(15);
  
  const halfWidth = contentWidth / 2 - 10;
  doc.setDrawColor(config.colors.text);
  doc.line(config.margin.left, currentY, config.margin.left + halfWidth, currentY);
  doc.line(config.margin.left + halfWidth + 20, currentY, pageWidth - config.margin.right, currentY);
  currentY += 5;
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.muted);
  doc.text('Vermieter', config.margin.left, currentY);
  doc.text('Mieter', config.margin.left + halfWidth + 20, currentY);

  addFooter();

  // Speichern
  const sanitize = (str: string) => str
    .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  
  const strasse = sanitize(mietobjekt.strasse || 'Adresse');
  const hausnummer = sanitize(mietobjekt.hausnummer || '');
  const datum = new Date().toISOString().slice(0, 10);
  
  const filename = `Mietvertrag_${strasse}_${hausnummer}_${datum}.pdf`;
  console.log('Speichere PDF als:', filename);
  doc.save(filename);
  console.log('PDF erfolgreich erstellt!');
}

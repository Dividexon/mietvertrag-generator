import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Mietvertrag } from '../types';
import { BETRIEBSKOSTEN_LABELS, ABRECHNUNGSSCHLUESSEL_LABELS } from '../types';

// ============================================
// PROFESSIONELLER MIETVERTRAG PDF GENERATOR
// Version 3.0 - Mit echten Umlauten & Tabellen
// ============================================

interface PDFConfig {
  margin: { top: number; right: number; bottom: number; left: number };
  lineHeight: number;
  fontSize: {
    title: number;
    heading: number;
    subheading: number;
    normal: number;
    small: number;
    tiny: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    line: string;
    background: string;
    tableHeader: string;
    tableAlt: string;
  };
}

const config: PDFConfig = {
  margin: { top: 25, right: 20, bottom: 25, left: 20 },
  lineHeight: 5,
  fontSize: {
    title: 18,
    heading: 12,
    subheading: 10,
    normal: 9,
    small: 8,
    tiny: 7,
  },
  colors: {
    primary: '#0891b2',      // Cyan nur für Keywords/Überschriften
    secondary: '#0891b2',    // Cyan
    accent: '#0891b2',       // Cyan Akzent
    text: '#000000',         // Schwarz für normalen Text
    textLight: '#4b5563',    // Dunkelgrau für Labels
    line: '#d1d5db',         // Hellgraue Linien
    background: '#f9fafb',   // Sehr helles Grau
    tableHeader: '#0891b2',  // Cyan für Tabellen-Header
    tableAlt: '#f9fafb',     // Helles Grau für alternating rows
  },
};

// Erweiterung für autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: { finalY: number };
  }
}

export function generateMietvertragPDF(vertrag: Mietvertrag): void {
  console.log('PDF Generation v3.0 gestartet...');

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  let currentY = config.margin.top;
  let pageNumber = 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - config.margin.left - config.margin.right;

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };

  const setColor = (hex: string, type: 'fill' | 'draw' | 'text' = 'text'): void => {
    const [r, g, b] = hexToRgb(hex);
    if (type === 'fill') doc.setFillColor(r, g, b);
    else if (type === 'draw') doc.setDrawColor(r, g, b);
    else doc.setTextColor(r, g, b);
  };

  const addFooter = (): void => {
    doc.setFontSize(config.fontSize.tiny);
    setColor(config.colors.textLight);
    doc.setFont('helvetica', 'normal');

    // Linie
    setColor(config.colors.line, 'draw');
    doc.line(config.margin.left, pageHeight - 15, pageWidth - config.margin.right, pageHeight - 15);

    // Seitenzahl rechts
    doc.text(`Seite ${pageNumber}`, pageWidth - config.margin.right, pageHeight - 10, { align: 'right' });

    // Dokumenttitel links
    doc.text('Mietvertrag für Wohnraum', config.margin.left, pageHeight - 10);

    // Adresse mitte
    const adresse = `${vertrag.mietobjekt.strasse} ${vertrag.mietobjekt.hausnummer}, ${vertrag.mietobjekt.plz} ${vertrag.mietobjekt.ort}`;
    doc.text(adresse, pageWidth / 2, pageHeight - 10, { align: 'center' });
  };

  const checkPageBreak = (needed: number = 20): void => {
    if (currentY + needed > pageHeight - config.margin.bottom) {
      addFooter();
      doc.addPage();
      pageNumber++;
      currentY = config.margin.top;
    }
  };

  const formatDate = (d: string): string => {
    if (!d) return '—';
    const date = new Date(d);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // ============================================
  // LAYOUT COMPONENTS
  // ============================================

  const addDocumentHeader = (): void => {
    // Heller Header mit Akzentlinie oben
    setColor(config.colors.accent, 'fill');
    doc.rect(0, 0, pageWidth, 3, 'F');

    // Titel
    doc.setFontSize(config.fontSize.title + 4);
    doc.setFont('helvetica', 'bold');
    setColor(config.colors.text);
    doc.text('MIETVERTRAG', pageWidth / 2, 18, { align: 'center' });

    // Untertitel
    doc.setFontSize(config.fontSize.subheading);
    doc.setFont('helvetica', 'normal');
    setColor(config.colors.text);
    const vertragsTyp =
      vertrag.vertragsart === 'wohnraum'
        ? 'für Wohnraum'
        : vertrag.vertragsart === 'gewerbe'
          ? 'für Gewerberäume'
          : 'für Garage/Stellplatz';
    doc.text(vertragsTyp, pageWidth / 2, 26, { align: 'center' });

    // Trennlinie unter Header
    setColor(config.colors.line, 'draw');
    doc.setLineWidth(0.5);
    doc.line(config.margin.left, 32, pageWidth - config.margin.right, 32);

    currentY = 40;
  };

  const addSectionHeader = (paragraphNum: string, title: string): void => {
    checkPageBreak(20);
    currentY += 6;

    // Akzent-Box links
    setColor(config.colors.accent, 'fill');
    doc.roundedRect(config.margin.left, currentY - 4, 4, 10, 1, 1, 'F');

    // Paragraph-Nummer und Titel
    doc.setFontSize(config.fontSize.heading);
    doc.setFont('helvetica', 'bold');
    setColor(config.colors.text);
    doc.text(`${paragraphNum} ${title}`, config.margin.left + 8, currentY + 2);

    currentY += 8;

    // Trennlinie
    setColor(config.colors.line, 'draw');
    doc.setLineWidth(0.3);
    doc.line(config.margin.left, currentY, pageWidth - config.margin.right, currentY);

    currentY += 6;
  };

  const addSubSection = (title: string): void => {
    checkPageBreak(12);
    currentY += 3;

    doc.setFontSize(config.fontSize.subheading);
    doc.setFont('helvetica', 'bold');
    setColor(config.colors.text);
    doc.text(title, config.margin.left + 5, currentY);

    currentY += 5;
  };

  const addText = (text: string, indent: number = 0, bold: boolean = false): void => {
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    setColor(config.colors.text);

    const maxWidth = contentWidth - indent;
    const lines = doc.splitTextToSize(text, maxWidth);

    for (const line of lines) {
      checkPageBreak(config.lineHeight);
      doc.text(line, config.margin.left + indent, currentY);
      currentY += config.lineHeight;
    }
  };

  const addNumberedItem = (num: string, text: string, indent: number = 0): void => {
    doc.setFontSize(config.fontSize.normal);
    setColor(config.colors.text);

    // Nummer in Bold
    doc.setFont('helvetica', 'bold');
    doc.text(num, config.margin.left + indent, currentY);

    // Text normal
    doc.setFont('helvetica', 'normal');
    const numWidth = doc.getTextWidth(num) + 2;
    const maxWidth = contentWidth - indent - numWidth;
    const lines = doc.splitTextToSize(text, maxWidth);

    for (let i = 0; i < lines.length; i++) {
      checkPageBreak(config.lineHeight);
      doc.text(lines[i], config.margin.left + indent + numWidth, currentY);
      currentY += config.lineHeight;
    }
  };

  const addBulletItem = (text: string, indent: number = 5): void => {
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', 'normal');
    setColor(config.colors.text);

    // Bullet
    setColor(config.colors.accent, 'fill');
    doc.circle(config.margin.left + indent + 1, currentY - 1.5, 0.8, 'F');

    // Text
    setColor(config.colors.text);
    const maxWidth = contentWidth - indent - 5;
    const lines = doc.splitTextToSize(text, maxWidth);

    for (let i = 0; i < lines.length; i++) {
      checkPageBreak(config.lineHeight);
      doc.text(lines[i], config.margin.left + indent + 5, currentY);
      currentY += config.lineHeight;
    }
  };

  const addSpace = (h: number = 3): void => {
    currentY += h;
  };

  // Info-Box mit Hintergrund
  const addInfoBox = (content: string[], highlight: boolean = false): void => {
    checkPageBreak(content.length * 6 + 10);

    const boxHeight = content.length * 5 + 6;
    setColor(config.colors.background, 'fill');
    
    if (highlight) {
      // Highlight: Heller Hintergrund mit Akzent-Rahmen
      setColor(config.colors.accent, 'draw');
      doc.setLineWidth(0.8);
      doc.roundedRect(config.margin.left, currentY, contentWidth, boxHeight, 2, 2, 'FD');
    } else {
      doc.roundedRect(config.margin.left, currentY, contentWidth, boxHeight, 2, 2, 'F');
    }

    currentY += 5;
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', highlight ? 'bold' : 'normal');
    setColor(config.colors.text); // Immer schwarz

    for (const line of content) {
      doc.text(line, config.margin.left + 5, currentY);
      currentY += 5;
    }

    currentY += 3;
  };

  // Tabelle für Key-Value Paare
  const addDataTable = (
    data: Array<{ label: string; value: string }>,
    options?: { striped?: boolean; headerColor?: string }
  ): void => {
    checkPageBreak(data.length * 8 + 10);

    autoTable(doc, {
      startY: currentY,
      head: [],
      body: data.map((row) => [row.label, row.value]),
      theme: 'plain',
      styles: {
        fontSize: config.fontSize.normal,
        cellPadding: 2,
        textColor: hexToRgb(config.colors.text),
      },
      columnStyles: {
        0: {
          cellWidth: 55,
          fontStyle: 'normal',
          textColor: hexToRgb(config.colors.textLight),
        },
        1: {
          fontStyle: 'bold',
        },
      },
      alternateRowStyles: options?.striped
        ? {
            fillColor: hexToRgb(config.colors.tableAlt),
          }
        : undefined,
      margin: { left: config.margin.left + 5, right: config.margin.right },
    });

    currentY = doc.lastAutoTable.finalY + 5;
  };

  // Miete-Tabelle
  const addMieteTable = (
    rows: Array<{ label: string; value: number }>,
    total: { label: string; value: number }
  ): void => {
    checkPageBreak(rows.length * 10 + 25);

    const tableData = rows.map((row) => [row.label, formatCurrency(row.value)]);

    autoTable(doc, {
      startY: currentY,
      head: [['Position', 'Betrag']],
      body: tableData,
      foot: [[total.label, formatCurrency(total.value)]],
      theme: 'striped',
      headStyles: {
        fillColor: hexToRgb(config.colors.tableHeader),
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: config.fontSize.normal,
      },
      footStyles: {
        fillColor: hexToRgb(config.colors.background),
        textColor: hexToRgb(config.colors.text), // Schwarz
        fontStyle: 'bold',
        fontSize: config.fontSize.subheading,
        lineColor: hexToRgb(config.colors.accent),
        lineWidth: 0.5,
      },
      styles: {
        fontSize: config.fontSize.normal,
        cellPadding: 3,
        textColor: hexToRgb(config.colors.text), // Schwarz
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 40, halign: 'right' },
      },
      margin: { left: config.margin.left, right: config.margin.right },
    });

    currentY = doc.lastAutoTable.finalY + 8;
  };

  // Betriebskosten-Tabelle
  const addBetriebskostenTable = (
    items: Array<{ name: string; schluessel: string }>,
    vorauszahlung: number
  ): void => {
    checkPageBreak(items.length * 8 + 30);

    const tableData = items.map((item) => [
      item.name,
      item.schluessel 
        ? `${ABRECHNUNGSSCHLUESSEL_LABELS[item.schluessel] || '—'} (${item.schluessel})`
        : '—',
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Betriebskostenart', 'Verteilerschlüssel']],
      body: tableData,
      theme: 'striped',
      tableWidth: contentWidth,
      showHead: 'everyPage',
      headStyles: {
        fillColor: hexToRgb(config.colors.tableHeader),
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: config.fontSize.small,
      },
      styles: {
        fontSize: config.fontSize.small,
        cellPadding: 2,
        textColor: hexToRgb(config.colors.text), // Schwarz
      },
      columnStyles: {
        0: { cellWidth: 110 },
        1: { cellWidth: 60, halign: 'right' },
      },
      alternateRowStyles: {
        fillColor: hexToRgb(config.colors.tableAlt),
      },
      margin: { left: config.margin.left, right: config.margin.right },
    });

    currentY = doc.lastAutoTable.finalY + 5;

    // Vorauszahlungs-Box (gleiche Darstellung wie Gesamtmiete)
    setColor(config.colors.background, 'fill');
    setColor(config.colors.accent, 'draw');
    doc.setLineWidth(1);
    doc.roundedRect(config.margin.left, currentY, contentWidth, 15, 2, 2, 'FD');
    doc.setFontSize(config.fontSize.heading);
    doc.setFont('helvetica', 'bold');
    setColor(config.colors.text);
    doc.text('Monatliche Vorauszahlung für Betriebskosten:', config.margin.left + 10, currentY + 10);
    doc.text(formatCurrency(vorauszahlung), pageWidth - config.margin.right - 10, currentY + 10, {
      align: 'right',
    });
    currentY += 20;
  };

  // Unterschrifts-Bereich
  const addSignatureArea = (
    label: string,
    name: string,
    signatureData?: string,
    x?: number,
    width?: number
  ): void => {
    const startX = x ?? config.margin.left;
    const areaWidth = width ?? contentWidth / 2 - 10;

    // Signatur-Bild falls vorhanden
    if (signatureData && signatureData.startsWith('data:image')) {
      try {
        const format = signatureData.includes('image/png') ? 'PNG' : 'JPEG';
        doc.addImage(signatureData, format, startX, currentY, 50, 15);
        currentY += 18;
      } catch (e) {
        console.warn('Signatur konnte nicht eingefügt werden:', e);
      }
    }

    // Unterschriftslinie
    setColor(config.colors.text, 'draw');
    doc.setLineWidth(0.5);
    doc.line(startX, currentY, startX + areaWidth, currentY);

    currentY += 4;

    // Label
    doc.setFontSize(config.fontSize.small);
    doc.setFont('helvetica', 'normal');
    setColor(config.colors.textLight);
    doc.text(label, startX, currentY);

    // Name
    currentY += 4;
    doc.setFont('helvetica', 'bold');
    setColor(config.colors.text);
    doc.text(name, startX, currentY);
  };

  // ============================================
  // PDF CONTENT
  // ============================================

  // DOCUMENT HEADER
  addDocumentHeader();

  // ============================================
  // VERTRAGSPARTEIEN
  // ============================================
  addSectionHeader('', 'Vertragsparteien');

  addText('Zwischen', 0, false);
  addSpace(3);

  // Vermieter-Box
  addSubSection('VERMIETER');
  const { vermieter } = vertrag;
  addDataTable(
    [
      { label: 'Name', value: vermieter.name || '—' },
      { label: 'Anschrift', value: `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}` },
      ...(vermieter.vertreter ? [{ label: 'Vertreten durch', value: vermieter.vertreter }] : []),
      ...(vermieter.telefon ? [{ label: 'Telefon', value: vermieter.telefon }] : []),
      ...(vermieter.email ? [{ label: 'E-Mail', value: vermieter.email }] : []),
    ],
    { striped: true }
  );

  addText('und', 0, false);
  addSpace(3);

  // Mieter-Box
  addSubSection('MIETER');
  vertrag.mieter.forEach((m, i) => {
    if (i > 0) addSpace(3);
    const mieterLabel = vertrag.mieter.length > 1 ? `Mieter ${i + 1}` : 'Mieter';
    addDataTable(
      [
        { label: mieterLabel, value: `${m.vorname} ${m.nachname}` },
        { label: 'Geboren am', value: formatDate(m.geburtsdatum) },
        { label: 'Anschrift', value: `${m.strasse}, ${m.plz} ${m.ort}` },
        ...(m.telefon ? [{ label: 'Telefon', value: m.telefon }] : []),
        ...(m.email ? [{ label: 'E-Mail', value: m.email }] : []),
      ],
      { striped: true }
    );
  });

  addSpace(5);
  addText(
    'Der Mieter verpflichtet sich, auch bei unentgeltlicher dauerhafter Aufnahme von Familienangehörigen und/oder Lebenspartnern, dem Vermieter Namen und Geburtsdaten dieser Personen unaufgefordert mitzuteilen.'
  );
  addSpace(3);
  addText('wird folgender Mietvertrag geschlossen:', 0, true);

  // ============================================
  // §1 MIETRÄUME
  // ============================================
  addSectionHeader('§ 1', 'Mieträume');

  addText('Vermietet wird zu Wohnzwecken die Wohnung / das Haus:');
  addSpace(3);

  const { mietobjekt } = vertrag;
  addDataTable(
    [
      {
        label: 'Adresse',
        value: `${mietobjekt.strasse} ${mietobjekt.hausnummer}, ${mietobjekt.plz} ${mietobjekt.ort}`,
      },
      { label: 'Geschoss', value: mietobjekt.geschoss || '—' },
      { label: 'Lage', value: mietobjekt.lage || '—' },
      { label: 'Wohnfläche', value: `ca. ${mietobjekt.wohnflaeche} m²` },
      { label: 'Zimmeranzahl', value: `${mietobjekt.zimmeranzahl}` },
    ],
    { striped: true }
  );

  // Ausstattung als Checkboxen
  addSpace(3);
  addText('Ausstattung:', 0, true);
  addSpace(2);

  const ausstattung: string[] = [];
  if (mietobjekt.hatKueche) ausstattung.push('Küche');
  if (mietobjekt.hatKochnische) ausstattung.push('Kochnische');
  if (mietobjekt.hatBad) ausstattung.push('Bad');
  if (mietobjekt.hatDusche) ausstattung.push('Dusche');
  if (mietobjekt.hatWcRaum) ausstattung.push('WC');
  if (mietobjekt.hatDiele) ausstattung.push('Diele');
  if (mietobjekt.hatBalkon) ausstattung.push('Balkon');
  if (mietobjekt.hatTerrasse) ausstattung.push('Terrasse');
  if (mietobjekt.hatKeller) ausstattung.push('Keller');
  if (mietobjekt.hatBoden) ausstattung.push('Dachboden');
  if (mietobjekt.hatGarage) ausstattung.push('Garage');
  if (mietobjekt.hatCarport) ausstattung.push('Carport');
  if (mietobjekt.hatStellplatz) ausstattung.push(`Stellplatz Nr. ${mietobjekt.stellplatzNummer || '—'}`);
  if (mietobjekt.hatGarten) ausstattung.push('Garten');

  // Ausstattung als Grid darstellen
  const ausstattungText = ausstattung.length > 0 ? ausstattung.join(' • ') : 'Keine Angaben';
  addInfoBox([ausstattungText]);

  // Schlüssel
  addSpace(3);
  addDataTable([
    {
      label: 'Schlüssel',
      value: `${mietobjekt.schluessel.haus || 0} Haus, ${mietobjekt.schluessel.wohnung || 0} Wohnung, ${mietobjekt.schluessel.briefkasten || 0} Briefkasten${mietobjekt.schluessel.schliessanlage ? `, ${mietobjekt.schluessel.schliessanlage} Schließanlage` : ''}`,
    },
  ]);

  // ============================================
  // §2 MIETZEIT
  // ============================================
  addSectionHeader('§ 2', 'Mietzeit');

  const { mietzeit } = vertrag;

  if (!mietzeit.befristet) {
    addText('Vertrag von unbestimmter Dauer', 0, true);
    addSpace(3);
    addInfoBox([
      `Das Mietverhältnis beginnt am: ${formatDate(mietzeit.mietbeginn)}`,
      'und läuft auf unbestimmte Zeit.',
    ]);
  } else {
    addText('Vertrag von bestimmter Dauer (gemäß § 575 BGB)', 0, true);
    addSpace(3);

    addText(
      'Ein Mietverhältnis kann auf bestimmte Zeit abgeschlossen werden, wenn der Vermieter nach Ablauf der Mietzeit'
    );
    addBulletItem(
      'die Räume als Wohnung für sich, seine Familienangehörigen oder Angehörige seines Haushalts nutzen will,'
    );
    addBulletItem(
      'in zulässiger Weise die Räume beseitigen oder so wesentlich verändern oder instandsetzen will, dass die Maßnahmen durch eine Fortsetzung des Mietverhältnisses erheblich erschwert würden, oder'
    );
    addBulletItem('die Räume an einen zur Dienstleistung Verpflichteten vermieten will.');

    addSpace(3);
    addText(
      'Dem Mieter ist der Grund der Befristung bei Vertragsabschluss schriftlich mitzuteilen. Anderenfalls gilt das Mietverhältnis als auf unbestimmte Zeit abgeschlossen.'
    );

    addSpace(3);
    addText(
      'Der Vermieter beabsichtigt, die Wohnung / das Haus nach Beendigung des Mietverhältnisses wie folgt zu verwenden:'
    );
    addInfoBox([mietzeit.befristungsgrund || '— Kein Grund angegeben —']);

    addSpace(3);
    addInfoBox(
      [
        `Mietbeginn: ${formatDate(mietzeit.mietbeginn)}`,
        `Mietende: ${formatDate(mietzeit.mietende || '')}`,
      ],
      true
    );

    addSpace(3);
    addText(
      'Der Mieter kann frühestens 4 Monate vor Ablauf der Befristung verlangen, dass der Vermieter ihm innerhalb eines Monats mitteilt, ob der Befristungsgrund noch besteht.'
    );
  }

  // ============================================
  // §3 KÜNDIGUNG
  // ============================================
  addSectionHeader('§ 3', 'Kündigung des Vertrages');

  addNumberedItem(
    '1.',
    'Ein Mietverhältnis von unbestimmter Dauer kann spätestens bis zum dritten Werktag eines Kalendermonats für den Ablauf des übernächsten Kalendermonats gekündigt werden. Die Kündigung muss schriftlich erfolgen.'
  );
  addSpace(2);
  addNumberedItem(
    '2.',
    'Die Kündigungsfrist für den Vermieter verlängert sich nach 5 Jahren seit der Überlassung des Wohnraumes auf 6 Monate und nach 8 Jahren auf 9 Monate.'
  );
  addSpace(2);
  addNumberedItem(
    '3.',
    'Für die Rechtzeitigkeit der Kündigung kommt es nicht auf die Absendung, sondern auf den Zugang des Kündigungsschreibens an.'
  );
  addSpace(2);
  addNumberedItem(
    '4.',
    'Die Fortsetzung des Gebrauchs der Mietsache nach Ablauf des Mietverhältnisses gilt nicht als Verlängerung. § 545 BGB wird ausgeschlossen.'
  );

  // ============================================
  // §4 FRISTLOSE KÜNDIGUNG
  // ============================================
  addSectionHeader('§ 4', 'Fristlose Kündigung aus wichtigem Grund');

  addNumberedItem(
    '1.',
    'Jede Vertragspartei kann das Mietverhältnis aus wichtigem Grund außerordentlich fristlos kündigen. Ein wichtiger Grund liegt vor, wenn dem Kündigenden unter Berücksichtigung aller Umstände des Einzelfalles, insbesondere eines Verschuldens der Vertragsparteien und unter Abwägung der beiderseitigen Interessen, die Fortsetzung des Mietverhältnisses bis zum Ablauf der Kündigungsfrist oder bis zur sonstigen Beendigung des Mietverhältnisses nicht zugemutet werden kann.'
  );
  addSpace(2);
  addNumberedItem(
    '2.',
    'Der Vermieter kann das Mietverhältnis aus wichtigem Grund fristlos kündigen. Ein wichtiger Grund liegt insbesondere vor, wenn'
  );
  addBulletItem(
    'der Mieter die Rechte des Vermieters dadurch in erheblichem Maße verletzt, dass er die Mietsache durch Vernachlässigung der ihm obliegenden Sorgfalt erheblich gefährdet oder sie unbefugt einem Dritten überlässt oder',
    10
  );
  addBulletItem(
    'der Mieter für zwei aufeinanderfolgende Termine mit der Entrichtung der Miete oder eines nicht unerheblichen Teiles der Miete in Verzug ist oder',
    10
  );
  addBulletItem(
    'in einem Zeitraum, der sich über mehr als zwei Zahlungstermine erstreckt, mit der Entrichtung der Miete in Höhe eines Betrages in Verzug ist, der die Miete für zwei Monate erreicht.',
    10
  );
  addBulletItem(
    'der Mieter mit einer Sicherheitsleistung (Barkaution) in Höhe eines Betrages in Verzug ist, der der zweifachen Monatsmiete gem. § 5.1.a) entspricht.',
    10
  );
  addSpace(2);
  addNumberedItem('3.', '§ 3.4 gilt entsprechend.');

  // ============================================
  // §5 MIETE
  // ============================================
  addSectionHeader('§ 5', 'Miete');

  const { miete } = vertrag;

  addText('Die monatliche Miete setzt sich wie folgt zusammen:', 0, true);
  addSpace(3);

  // Miete-Tabelle
  const mieteRows: Array<{ label: string; value: number }> = [
    { label: 'Grundmiete Wohnung', value: miete.grundmieteWohnung },
  ];
  if (miete.grundmieteGarage > 0) {
    mieteRows.push({ label: 'Grundmiete Garage/Stellplatz', value: miete.grundmieteGarage });
  }
  if (miete.grundmieteSonstiges > 0) {
    mieteRows.push({
      label: miete.grundmieteSonstigesBeschreibung || 'Sonstiges',
      value: miete.grundmieteSonstiges,
    });
  }

  addMieteTable(mieteRows, { label: 'Summe Grundmiete', value: miete.grundmieteGesamt });

  // Staffelmiete
  if (vertrag.mieterhoehung.typ === 'staffel' && vertrag.mieterhoehung.staffeln.length > 0) {
    addSpace(5);
    addSubSection('§ 5.1 Staffelmiete');
    addText(
      'Die Miete erhöht sich zu folgenden Zeitpunkten (Staffelmiete gemäß § 557a BGB):'
    );
    addSpace(3);

    const staffelData = vertrag.mieterhoehung.staffeln.map((s, i) => ({
      label: `Staffel ${i + 1} ab ${formatDate(s.datum)}`,
      value: formatCurrency(s.betrag),
    }));

    addDataTable(staffelData, { striped: true });

    addText(
      'Die Miete muss jeweils mindestens 12 Monate unverändert bleiben. Während der Laufzeit einer Staffelmiete ist eine Erhöhung nach §§ 558 bis 559b BGB ausgeschlossen.'
    );
  }

  // Indexmiete
  if (vertrag.mieterhoehung.typ === 'index') {
    addSpace(5);
    addSubSection('§ 5.2 Indexmiete');

    addNumberedItem(
      '1.',
      `Die Vertragsparteien vereinbaren ab ${vertrag.mieterhoehung.indexStart || '—'} eine Indexmiete wie folgt:`
    );
    addSpace(2);
    addText(
      `a) Ändert sich der vom Statistischen Bundesamt veröffentlichte Verbraucherpreisindex für Deutschland gegenüber dem Stand im Monat der Vereinbarung der Indexmiete oder gegenüber der der letzten Mietänderung zugrunde gelegten Indexzahl um mehr als ${vertrag.mieterhoehung.indexSchwelle || 3} Prozent nach oben oder unten, ändert sich die vereinbarte Miete gem. § 5 entsprechend.`,
      5
    );
    addSpace(2);
    addText(
      'b) Eine Änderung der Miete muss durch Erklärung in Textform geltend gemacht werden. Dabei sind die eingetretene Änderung des Preisindexes sowie die jeweilige Miete oder die Erhöhung in einem Geldbetrag anzugeben. Die geänderte Miete ist mit Beginn des übernächsten Monats nach dem Zugang der Erklärung zu entrichten.',
      5
    );
    addSpace(3);
    addNumberedItem(
      '2.',
      'Während der Geltung einer Indexmiete muss die Miete mindestens 12 Monate unverändert bleiben.'
    );
    addSpace(2);
    addNumberedItem('3.', 'Eine Erhöhung nach § 558 BGB ist ausgeschlossen.');
  }

  // ============================================
  // §6 BETRIEBSKOSTEN
  // ============================================
  addSectionHeader('§ 6', 'Betriebskosten');

  addText(
    'Neben der Grundmiete sind vom Mieter nachstehende Betriebskosten zu tragen. Bei fehlender Angabe in der Spalte „Abrechnungsschlüssel" werden die Betriebskosten vorbehaltlich anderweitiger Vorschriften nach dem Anteil der Wohnfläche bzw. bei erfassten Verbräuchen nach Verbrauch abgerechnet.'
  );
  addSpace(3);

  const bk = vertrag.betriebskosten;
  const aktiveBK: Array<{ name: string; schluessel: string }> = [];

  (Object.keys(BETRIEBSKOSTEN_LABELS) as Array<keyof typeof BETRIEBSKOSTEN_LABELS>).forEach((key) => {
    if (bk[key]?.aktiv) {
      aktiveBK.push({
        name: BETRIEBSKOSTEN_LABELS[key],
        schluessel: bk[key].schluessel,
      });
    }
  });

  // Sonstige Betriebskosten
  if (bk.sonstige && bk.sonstige.length > 0) {
    bk.sonstige.forEach((item) => {
      if (item.bezeichnung) {
        aktiveBK.push({
          name: item.bezeichnung,
          schluessel: item.schluessel,
        });
      }
    });
  }

  if (aktiveBK.length > 0) {
    addBetriebskostenTable(aktiveBK, miete.nebenkostenVorauszahlung);
  }

  // Gesamtmiete Highlight-Box (heller Hintergrund mit Rahmen)
  addSpace(3);
  setColor(config.colors.background, 'fill');
  setColor(config.colors.accent, 'draw');
  doc.setLineWidth(1);
  doc.roundedRect(config.margin.left, currentY, contentWidth, 15, 2, 2, 'FD');
  doc.setFontSize(config.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  setColor(config.colors.text); // Schwarz
  doc.text('Gesamtsumme Miete monatlich:', config.margin.left + 10, currentY + 10);
  doc.text(formatCurrency(miete.gesamtmiete), pageWidth - config.margin.right - 10, currentY + 10, {
    align: 'right',
  });
  currentY += 20;

  // Legende
  addSpace(3);
  doc.setFontSize(config.fontSize.small);
  setColor(config.colors.textLight);
  doc.setFont('helvetica', 'italic');
  const legende1 = 'Verteilerschlüssel: 1 = Wohnfläche, 2 = Personen, 3 = Einheiten, 4 = Verbrauch, 5 = Heizkostenverordnung,';
  const legende2 = '6 = Miteigentumsanteile, 7 = Bescheid, 8 = direkt Mieter/Versorger, 9 = Eigenleistung Mieter';
  doc.text(legende1, config.margin.left, currentY);
  currentY += 5;
  doc.text(legende2, config.margin.left, currentY);
  currentY += 6;

  // Nummerierte Regelungen
  addSpace(5);
  addNumberedItem(
    '1.',
    'Sind für die Betriebskosten Vorauszahlungen vereinbart, so sind diese jährlich abzurechnen. Die Abrechnung muss dem Mieter spätestens bis zum Ablauf des zwölften Monats nach Ende des Abrechnungszeitraumes zugegangen sein. Nach Ablauf dieser Frist ist die Geltendmachung einer Nachforderung ausgeschlossen, es sei denn, der Vermieter hat die verspätete Geltendmachung nicht zu vertreten (§ 556 Abs. 3 BGB).'
  );
  addSpace(2);
  addNumberedItem(
    '2.',
    'Auch bei Mietverhältnissen auf bestimmte Zeit ist der Vermieter berechtigt, die Betriebskostenvorauszahlungen anzupassen.'
  );
  addSpace(2);
  addNumberedItem(
    '3.',
    'Werden öffentliche Abgaben neu eingeführt oder entstehen Betriebskosten neu, so können diese vom Vermieter im Rahmen der gesetzlichen Vorschriften umgelegt werden.'
  );
  addSpace(2);
  addNumberedItem(
    '4.',
    'Ist die Abrechnung der Betriebs- und Heizkosten erteilt und schließt diese mit einem Nachzahlungssaldo zu Lasten des Mieters ab, so ist dieser innerhalb eines Monats nach Erhalt der Abrechnung zu zahlen.'
  );

  // ============================================
  // §7 FÄLLIGKEIT / BANKVERBINDUNG
  // ============================================
  addSectionHeader('§ 7', 'Fälligkeit der Miete und Bankverbindung');

  addNumberedItem(
    '1.',
    'Die Miete ist spätestens bis zum 3. Werktag eines jeden Kalendermonats in einem Betrag an den Vermieter kostenfrei im Voraus zu entrichten.'
  );
  addSpace(2);
  addNumberedItem(
    '2.',
    'Bei Zahlungsverzug ist der Vermieter berechtigt, neben den Verzugszinsen für jede schriftliche Mahnung die ihm entstehenden Mahnkosten zu erheben.'
  );
  addSpace(2);
  addNumberedItem('3.', 'Die Mietzahlungen sind auf folgendes Konto zu leisten:');
  addSpace(3);

  const { bankverbindung } = vertrag;
  addInfoBox(
    [
      `Kontoinhaber: ${bankverbindung.kontoinhaber || '—'}`,
      `IBAN: ${bankverbindung.iban || '—'}`,
      `BIC: ${bankverbindung.bic || '—'}`,
    ],
    false
  );

  // ============================================
  // §8 HEIZUNG
  // ============================================
  addSectionHeader('§ 8', 'Heizung');

  const { heizung } = vertrag;

  addNumberedItem(
    '1.',
    `Die dem Tagesaufenthalt dienenden Wohnräume einschließlich Bad und WC werden, soweit es die Witterung erfordert, mindestens aber vom ${heizung.heizperiodeVon || '01.10.'} bis ${heizung.heizperiodeBis || '30.04.'} in der Zeit von ${heizung.heizzeitVon || '06:00'} bis ${heizung.heizzeitBis || '22:00'} Uhr mit einer Temperatur von nicht weniger als 20 Grad Celsius beheizt.`
  );
  addSpace(2);

  if (heizung.art) {
    addDataTable([{ label: 'Art der Heizung', value: heizung.art }]);
  }

  addSpace(2);
  addNumberedItem(
    '2.',
    'Der Mieter ist verpflichtet, die anteiligen Kosten für den Betrieb der Heizungsanlage zu bezahlen. Zu den Kosten des Betriebes gehören u.a.: Brennstoffkosten, Betriebsstrom, Wartung, Reinigung, Messungen nach dem Bundes-Immissionsschutzgesetz sowie Kosten der Verbrauchserfassung.'
  );
  addSpace(2);
  addNumberedItem(
    '3.',
    'Macht der Mieter von der Heizungsanlage keinen Gebrauch, so befreit ihn dies nicht von der Verpflichtung zur Beteiligung an den Heizkosten.'
  );

  // ============================================
  // §9-§17 (Kurzfassung für Übersicht)
  // ============================================

  addSectionHeader('§ 9', 'Wasserversorgung');
  addText(
    'Wird der Verbrauch für Warm- und/oder Kaltwasser durch Messgeräte erfasst, ist der Mieter verpflichtet, die Kosten für die Anmietung, Ablesung, Wartung und Eichung der Geräte zu bezahlen. Die Warmwasserversorgung erfolgt ganzjährig.'
  );

  addSectionHeader('§ 10', 'Benutzung der Mietsache');
  addText(
    'Mit Rücksicht auf die Gesamtheit der Mieter und die Belange des Vermieters bedarf es der vorherigen Zustimmung des Vermieters für: Untervermietung, gewerbliche Nutzung, Anbringen von Schildern, Tierhaltung (außer Kleintiere), Antennen, Um-/Einbauten sowie Abstellen von Kraftfahrzeugen außerhalb vorgesehener Plätze.'
  );

  addSectionHeader('§ 11', 'Bauliche Veränderungen durch den Vermieter');
  addText(
    'Bauliche Veränderungen sowie Erhaltungsmaßnahmen, die zur Abwendung drohender Gefahren notwendig werden, darf der Vermieter auch ohne Zustimmung vornehmen. Bei Modernisierungsmaßnahmen hat der Vermieter dem Mieter spätestens 3 Monate vor Beginn Art, Umfang und voraussichtliche Mieterhöhung schriftlich mitzuteilen.'
  );

  addSectionHeader('§ 12', 'Betreten der Mieträume');
  addText(
    'Der Mieter hat während der üblichen Tageszeit (werktags bis 19 Uhr) zu gewährleisten, dass der Vermieter aus begründetem Anlass nach Terminvereinbarung die Mietsache betreten kann (z.B. Ablesen von Messgeräten, Reparaturen, Besichtigungen).'
  );

  addSectionHeader('§ 13', 'Instandhaltung der Mietsache');
  addText(
    'Der Mieter hat die Mietsache schonend und pfleglich zu behandeln und für ausreichende Beheizung und Belüftung zu sorgen. Schäden sind unverzüglich anzuzeigen.'
  );
  addSpace(2);

  const { kleinreparaturen } = vertrag;
  if (kleinreparaturen.aktiv) {
    addInfoBox([
      `Kleinreparaturklausel: Der Mieter trägt Kosten für Kleinreparaturen bis ${formatCurrency(kleinreparaturen.maxEinzel)} je Einzelfall,`,
      `maximal ${formatCurrency(kleinreparaturen.maxJahr)} pro Kalenderjahr.`,
    ]);
  }

  addSectionHeader('§ 14', 'Schönheitsreparaturen');
  const zustandText =
    vertrag.schoenheitsreparaturen.uebergabeZustand === 'renoviert'
      ? 'Die Wohnung wird im renovierten Zustand übergeben.'
      : vertrag.schoenheitsreparaturen.uebergabeZustand === 'unrenoviert'
        ? 'Die Wohnung wird im unrenovierten Zustand übergeben.'
        : 'Der Zustand wird im Übergabeprotokoll festgehalten.';
  addText(zustandText);
  addSpace(2);
  addText(
    'Zu den Schönheitsreparaturen gehören das Tapezieren oder Anstreichen der Wände und Decken, das Streichen der Heizkörper, Innentüren, Fenster von innen sowie das Reinigen der Fußböden.'
  );

  addSectionHeader('§ 15', 'Hausordnung');
  addText(
    'Die anliegende Hausordnung ist Bestandteil dieses Vertrages. Sie kann vom Vermieter geändert werden, wenn dringende Gründe der Ordnung oder Bewirtschaftung dies erfordern.'
  );

  addSectionHeader('§ 16', 'Entschädigungspflicht nach Beendigung');
  addText(
    'Wird die Räumung und Herausgabe der Mietsache nach Beendigung des Mietverhältnisses verzögert, ist der Mieter verpflichtet, eine Entschädigung bis zur Höhe der ortsüblichen Vergleichsmiete, mindestens jedoch in Höhe der vereinbarten Miete zu zahlen.'
  );

  addSectionHeader('§ 17', 'Rückgabe der Mietsache');
  addText(
    'Bei Beendigung des Mietverhältnisses sind die Räume vollständig geräumt und ordnungsgemäß gereinigt herauszugeben. Alle Schlüssel, auch vom Mieter beschaffte, sind dem Vermieter zu übergeben.'
  );

  // ============================================
  // §18 PERSONENMEHRHEIT (nur wenn mehrere Mieter)
  // ============================================
  if (vertrag.mieter.length > 1) {
    addSectionHeader('§ 18', 'Personenmehrheit als Mieter');
    addNumberedItem(
      '1.',
      'Mehrere Personen als Mieter haften für alle Verpflichtungen aus dem Mietvertrag als Gesamtschuldner.'
    );
    addSpace(2);
    addNumberedItem(
      '2.',
      'Rechtsgestaltende Erklärungen müssen von oder gegenüber allen Mietern abgegeben werden. Die Mieter bevollmächtigen sich jedoch gegenseitig zur Entgegennahme solcher Erklärungen. Diese Vollmacht gilt auch für die Entgegennahme von Kündigungen, jedoch nicht für die Kündigung seitens der Mieter.'
    );
  }

  // ============================================
  // §19 KAUTION
  // ============================================
  addSectionHeader('§ 19', 'Mietsicherheit (Kaution)');

  const { kaution } = vertrag;
  const zahlungsarten: Record<string, string> = {
    ueberweisung: 'Überweisung',
    bar: 'Barzahlung',
    buergschaft: 'Bankbürgschaft',
    kautionskonto: 'Kautionskonto/Sparbuch',
    ratenzahlung: 'Ratenzahlung (3 Raten)',
  };

  addInfoBox(
    [
      `Kautionsbetrag: ${formatCurrency(kaution.betrag)}`,
      `Zahlungsart: ${zahlungsarten[kaution.zahlungsart] || '—'}`,
      '(maximal 3 Monatsgrundmieten gemäß § 551 BGB)',
    ],
    true
  );

  addSpace(3);
  addText(
    'Die Kaution wird nach Beendigung des Mietverhältnisses und Prüfung aller Ansprüche zurückgezahlt.'
  );

  // ============================================
  // §20 SONSTIGE VEREINBARUNGEN
  // ============================================
  if (vertrag.sonstigeVereinbarungen.text) {
    addSectionHeader('§ 20', 'Sonstige Vereinbarungen');
    addText(vertrag.sonstigeVereinbarungen.text);
  }

  // ============================================
  // §21 DATENSCHUTZ
  // ============================================
  addSectionHeader('§ 21', 'Datenschutz');
  addText(
    'Vermieter und Mieter sind damit einverstanden, dass Daten dieses Vertrages zu gesetzlich zulässigen Zwecken verarbeitet werden. Die vollständigen Datenschutzhinweise sind als Anlage beigefügt.'
  );

  // ============================================
  // §22 SCHLUSSBESTIMMUNGEN (neue Seite)
  // ============================================
  addFooter();
  doc.addPage();
  pageNumber++;
  currentY = config.margin.top;
  
  addSectionHeader('§ 22', 'Schlussbestimmungen');
  addText(
    'Sollten eine oder mehrere Bestimmungen dieses Vertrages ganz oder teilweise nicht wirksam sein oder unwirksam werden, so wird dadurch die Gültigkeit der übrigen Bestimmungen nicht berührt. Die Parteien verpflichten sich, unwirksame Klauseln durch wirksame Regelungen zu ersetzen, die dem wirtschaftlichen Zweck am nächsten kommen.'
  );

  // ============================================
  // UNTERSCHRIFTEN
  // ============================================
  checkPageBreak(80);
  addSectionHeader('§ 23', 'Unterschriften');

  const { unterschriften } = vertrag;

  // Ort und Datum
  addSpace(5);
  addInfoBox([`${unterschriften.ort || 'Bremen'}, den ${formatDate(unterschriften.datum)}`]);

  addSpace(10);

  // Unterschriften in 2 Spalten
  const colWidth = (contentWidth - 20) / 2;
  const leftX = config.margin.left;
  const rightX = config.margin.left + colWidth + 20;

  // Vermieter links
  const startY = currentY;
  addSignatureArea('Vermieter', vermieter.name || '—', unterschriften.vermieterSignatur, leftX, colWidth);

  // Erster Mieter rechts
  if (vertrag.mieter.length > 0) {
    currentY = startY;
    const m = vertrag.mieter[0];
    addSignatureArea(
      vertrag.mieter.length > 1 ? 'Mieter 1' : 'Mieter',
      `${m.vorname} ${m.nachname}`,
      unterschriften.mieterSignaturen?.[0],
      rightX,
      colWidth
    );
  }

  // Weitere Mieter
  for (let i = 1; i < vertrag.mieter.length; i++) {
    addSpace(15);
    const m = vertrag.mieter[i];
    const xPos = i % 2 === 1 ? leftX : rightX;
    addSignatureArea(`Mieter ${i + 1}`, `${m.vorname} ${m.nachname}`, unterschriften.mieterSignaturen?.[i], xPos, colWidth);
  }

  // Footer für letzte Seite
  addFooter();

  // ============================================
  // ANLAGE: DATENSCHUTZHINWEISE
  // ============================================
  doc.addPage();
  pageNumber++;
  currentY = config.margin.top;

  // Header (hell mit Akzentlinie)
  setColor(config.colors.accent, 'fill');
  doc.rect(0, 0, pageWidth, 3, 'F');
  doc.setFontSize(config.fontSize.heading + 2);
  doc.setFont('helvetica', 'bold');
  setColor(config.colors.text);
  doc.text('Datenschutzhinweise und Datenschutzinformationen', pageWidth / 2, 15, { align: 'center' });
  setColor(config.colors.line, 'draw');
  doc.setLineWidth(0.5);
  doc.line(config.margin.left, 22, pageWidth - config.margin.right, 22);
  currentY = 30;

  // Verantwortlicher
  addText('Diese Datenschutzhinweise gelten für die Datenverarbeitung durch:');
  addSpace(2);
  addInfoBox([
    vermieter.typ === 'firma' ? vermieter.name : `Herrn/Frau ${vermieter.name}`,
    `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}`,
    vermieter.telefon ? `Telefon: ${vermieter.telefon}` : '',
    vermieter.email ? `E-Mail: ${vermieter.email}` : '',
  ].filter(line => line !== ''));
  
  addText('(Name und Kontaktdaten des Vermieters, des für die Verarbeitung Verantwortlichen und ggf. des betrieblichen Datenschutzbeauftragten)');
  addSpace(3);
  addText('Der/die betriebliche Datenschutzbeauftragte (soweit vorhanden) des oben genannten Verantwortlichen ist unter der gleichen Anschrift erreichbar.');

  // Erhebung und Speicherung
  addSpace(5);
  addSubSection('Erhebung und Speicherung personenbezogener Daten sowie Art, Zweck und deren Verwendung');
  addText('Zum Zweck der Anbahnung und Durchführung des Mietvertrages erhebe/n ich/wir folgende Daten:');
  addSpace(2);
  addBulletItem('Anrede, Vorname, Nachname, Anschrift');
  addBulletItem('E-Mail-Adresse, Telefonnummer');
  addBulletItem('Anzahl der im Haushalt lebenden Personen');
  addBulletItem('Einkommensverhältnisse und Beruf');
  addBulletItem('Eröffnete und noch nicht abgeschlossene Verbraucherinsolvenzverfahren, Kontopfändungen, Abgabe eidesstattlicher Versicherung innerhalb der letzten drei Jahre');
  addBulletItem('Kontodaten');
  addBulletItem('Höhe der Miete und Betriebskosten');
  addBulletItem('Verbrauchsdaten und Betriebskosten gem. Betriebskostenverordnung und Heizkostenverordnung sowie Daten über den Eingang der Mieten und Betriebskosten');
  addBulletItem('Korrespondenz während des Mietverhältnisses');

  addSpace(3);
  addText('Die Datenverarbeitung ist nach Art. 6 Abs. 1 S. 1 b, f DSGVO zu den genannten Zwecken und für die beidseitige Erfüllung von Verpflichtungen aus dem Mietverhältnis erforderlich. Die personenbezogenen Daten des Mieters werden regelmäßig bis zum Ablauf der gesetzlichen dreijährigen Regelverjährungsfrist (§ 195 BGB) gespeichert und mit Ablauf der Frist gelöscht. Sofern aufgrund von steuer- und handelsrechtlichen Aufbewahrungspflichten (HGB, StGB oder AO) oder einer Einwilligung nach Art. 6 Abs. 1 S. 1 a DSGVO eine längere Speicherung erforderlich ist, sind diese Fristen maßgeblich.');

  // Weitergabe an Dritte
  addSpace(5);
  addSubSection('Weitergabe von Daten an Dritte');
  addText('Ihre persönlichen Daten werden gegenwärtig nicht an andere, außer den im Folgenden genannten Dritten zu den aufgeführten Zwecken weitergegeben. Eine Weitergabe erfolgt, soweit dies nach Art. 6 Abs. 1 S. 1 b oder c DSGVO für die Abwicklung des Mietverhältnisses oder zur Erfüllung gesetzlicher Verpflichtungen erforderlich ist. Dazu gehören:');
  addSpace(2);
  addBulletItem('Messdienstfirmen zur Erfassung von Verbrauchsdaten für Heizung/Warmwasser.');
  addBulletItem('Abrechnungsunternehmen, Haus & Grund Vereine oder Verwalter.');
  addBulletItem('Handwerker, Dienstleister oder Sachverständige zur Erfüllung von Instandsetzungs- und Instandhaltungsverpflichtungen.');
  addBulletItem('Gebäude- und Haftpflichtversicherer des Grundstücks.');
  addBulletItem('Andere Mieter zum Zwecke der Einsicht in die Originalbelege der Jahresabrechnungen zur Erfüllung von Rechtsansprüchen.');
  addSpace(2);
  addText('Die weitergegebenen Daten dürfen ausschließlich zu den genannten Zwecken verwendet werden.');

  // Betroffenenrechte
  addSpace(5);
  addSubSection('Betroffenenrechte');
  addText('Sie haben das Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO), Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO). Zudem können Sie sich bei einer Aufsichtsbehörde beschweren (Art. 77 DSGVO).');

  // Widerspruchsrecht
  addSpace(5);
  addSubSection('Widerspruchsrecht');
  addText('Sofern Ihre Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 S. 1 f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben. Wenden Sie sich dazu bitte an die Adresse des Verantwortlichen.');

  addFooter();

  // ============================================
  // ANLAGE: HAUSORDNUNG
  // ============================================
  doc.addPage();
  pageNumber++;
  currentY = config.margin.top;

  // Header (hell mit Akzentlinie)
  setColor(config.colors.accent, 'fill');
  doc.rect(0, 0, pageWidth, 3, 'F');
  doc.setFontSize(config.fontSize.heading + 2);
  doc.setFont('helvetica', 'bold');
  setColor(config.colors.text);
  doc.text('HAUSORDNUNG', pageWidth / 2, 15, { align: 'center' });
  setColor(config.colors.line, 'draw');
  doc.setLineWidth(0.5);
  doc.line(config.margin.left, 22, pageWidth - config.margin.right, 22);
  currentY = 30;

  // Wichtiger Hinweis
  doc.setFontSize(config.fontSize.small);
  doc.setFont('helvetica', 'italic');
  setColor(config.colors.textLight);
  addText('Wichtiger Hinweis: Achtung! Nicht bei anderslautender Hausordnung, z. B. einer Wohnungseigentümergemeinschaft verwenden!');
  addSpace(4);

  // Einleitung
  const mieterNamen = vertrag.mieter.map((m) => `${m.vorname} ${m.nachname}`).join(' und ');
  const vermieterName = vermieter.typ === 'firma' ? vermieter.name : `Herrn/Frau ${vermieter.name}`;
  doc.setFontSize(config.fontSize.normal);
  doc.setFont('helvetica', 'normal');
  setColor(config.colors.text);
  addText(`Anlage zum Mietvertrag zwischen ${vermieterName || '[Vermieter]'} (Vermieter) und ${mieterNamen || '[Mieter]'} (Mieter).`, 0, true);

  // I. Schutz vor Lärm
  addSpace(5);
  addSubSection('I. Schutz vor Lärm und allgemeiner Belästigung');
  addNumberedItem('1.', 'Ruhezeiten: 13–15 Uhr und 22–7 Uhr, sowie Sonn-/Feiertags bis 9 Uhr.');
  addNumberedItem('2.', 'Grillen: Auf Balkonen, Loggien oder direkt am Gebäude nicht gestattet.');
  addNumberedItem('3.', 'Blumenkästen: Müssen sicher angebracht sein; Gießwasser darf nicht stören.');
  addNumberedItem('4.', 'Taubenfüttern: Verboten.');

  // II. Sicherheit
  addSpace(4);
  addSubSection('II. Sicherheit');
  addNumberedItem('1.', 'Haustür: Von 22 bis 6 Uhr geschlossen halten.');
  addNumberedItem('2.', 'Fluchtwege: Treppen/Flure freihalten.');
  addNumberedItem('3.', 'Krafträder: Nicht in Wohnräumen/Kellern abstellen.');
  addNumberedItem('4.', 'Brandgefahr: Keine leicht entzündlichen Gegenstände im Haus lagern.');

  // III. Benutzung gemeinschaftlicher Einrichtungen
  addSpace(4);
  addSubSection('III. Benutzung gemeinschaftlicher Einrichtungen');
  addText('Gegenseitige Rücksichtnahme. Vermieter entscheidet bei Streitigkeiten.');

  // IV. Heizung/Lüftung
  addSpace(4);
  addSubSection('IV. Heizung/Lüftung');
  addText('Ganzjährig ausreichend heizen/lüften. Kein Auskühlen. Treppenhaus nicht über Wohnung lüften.');

  // V. Reinigung
  addSpace(4);
  addSubSection('V. Reinigung');
  addNumberedItem('1.', 'Haus/Grundstück sauber halten.');
  addNumberedItem('2.', 'Mülltrennung beachten.');
  addNumberedItem('3.', 'Waschküche nach Benutzung reinigen.');
  addNumberedItem('4.', 'Keine Abfälle in Toiletten werfen.');
  addNumberedItem('5.', 'Bei Eigenleistung (Kehrwoche): Genaue Zuweisung der Aufgaben (Erdgeschoss reinigt Eingang, obere Stockwerke Treppenabschnitte etc.).');
  addNumberedItem('6.', 'Winterdienst: Mieter des tiefsten Geschosses sind für Gehwegreinigung/Streuen zuständig, sofern vereinbart.');

  // Bremen-Klausel (nur wenn Ort Bremen ist)
  const ortLower = (vertrag.mietobjekt.ort || '').toLowerCase();
  if (ortLower.includes('bremen') || ortLower.includes('bremerhaven')) {
    addSpace(4);
    addInfoBox([
      'Nur bei Mietobjekten im Lande Bremen:',
      'Die Mieter des zutiefst gelegenen Geschosses sind verpflichtet, die Polizeipflicht gemäß § 41 Brem. LStrG zu übernehmen. Eine diesbezügliche Erklärung ist bei der Ortspolizeibehörde abzugeben.',
    ]);
  }

  // Unterschriften-Bereich
  addSpace(10);
  checkPageBreak(60);
  
  // Ort / Datum
  setColor(config.colors.text, 'draw');
  doc.setLineWidth(0.5);
  doc.line(config.margin.left, currentY, config.margin.left + 80, currentY);
  currentY += 4;
  doc.setFontSize(config.fontSize.small);
  setColor(config.colors.textLight);
  doc.text('Ort / Datum', config.margin.left, currentY);
  currentY += 15;

  // Vermieter Unterschrift
  doc.setLineWidth(0.5);
  setColor(config.colors.text, 'draw');
  doc.line(config.margin.left, currentY, config.margin.left + 80, currentY);
  currentY += 4;
  doc.setFontSize(config.fontSize.small);
  setColor(config.colors.textLight);
  doc.text('Vermieter', config.margin.left, currentY);
  doc.setFont('helvetica', 'normal');
  setColor(config.colors.text);
  doc.text(vermieter.name || '', config.margin.left, currentY + 4);
  currentY += 15;

  // Mieter Unterschriften
  for (let i = 0; i < vertrag.mieter.length; i++) {
    const m = vertrag.mieter[i];
    checkPageBreak(25);
    
    // Linie zeichnen
    doc.setLineWidth(0.5);
    setColor(config.colors.text, 'draw');
    doc.line(config.margin.left, currentY, config.margin.left + 80, currentY);
    currentY += 4;
    
    // Label "Mieter X"
    doc.setFontSize(config.fontSize.small);
    doc.setFont('helvetica', 'normal');
    setColor(config.colors.textLight);
    const mieterLabel = vertrag.mieter.length > 1 ? `Mieter ${i + 1}` : 'Mieter';
    doc.text(mieterLabel, config.margin.left, currentY);
    
    // Name des Mieters
    currentY += 4;
    doc.setFont('helvetica', 'normal');
    setColor(config.colors.text);
    doc.text(`${m.vorname} ${m.nachname}`, config.margin.left, currentY);
    currentY += 12;
  }

  addFooter();

  // ============================================
  // PDF SPEICHERN
  // ============================================
  const filename = `Mietvertrag_${mietobjekt.strasse}_${mietobjekt.hausnummer}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);

  console.log(`PDF erfolgreich generiert: ${filename}`);
}

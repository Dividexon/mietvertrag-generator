import { jsPDF } from 'jspdf';
import type { Mietvertrag } from '../types';
import { BETRIEBSKOSTEN_LABELS, ABRECHNUNGSSCHLUESSEL_LABELS } from '../types';

// ============================================
// MODERNER MIETVERTRAG PDF GENERATOR
// Clean Design ohne externe Branding
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
  };
  colors: {
    primary: string;
    text: string;
    muted: string;
    accent: string;
    line: string;
  };
}

const config: PDFConfig = {
  margin: { top: 25, right: 20, bottom: 25, left: 20 },
  lineHeight: 6,
  fontSize: {
    title: 18,
    heading: 12,
    subheading: 10,
    normal: 9,
    small: 8,
  },
  colors: {
    primary: '#1a1a1a',
    text: '#333333',
    muted: '#666666',
    accent: '#00bcd4',
    line: '#e0e0e0',
  },
};

export function generateMietvertragPDF(vertrag: Mietvertrag): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let currentY = config.margin.top;
  let pageNumber = 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - config.margin.left - config.margin.right;

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  function checkPageBreak(neededHeight: number = 20): void {
    if (currentY + neededHeight > pageHeight - config.margin.bottom) {
      addFooter();
      doc.addPage();
      pageNumber++;
      currentY = config.margin.top;
      addHeader();
    }
  }

  function addHeader(): void {
    doc.setFontSize(config.fontSize.small);
    doc.setTextColor(config.colors.muted);
    doc.text('MIETVERTRAG', config.margin.left, 12);
    doc.text(
      `Erstellt am ${new Date().toLocaleDateString('de-DE')}`,
      pageWidth - config.margin.right,
      12,
      { align: 'right' }
    );
    doc.setDrawColor(config.colors.line);
    doc.line(config.margin.left, 15, pageWidth - config.margin.right, 15);
  }

  function addFooter(): void {
    doc.setFontSize(config.fontSize.small);
    doc.setTextColor(config.colors.muted);
    doc.setDrawColor(config.colors.line);
    doc.line(
      config.margin.left,
      pageHeight - 15,
      pageWidth - config.margin.right,
      pageHeight - 15
    );
    doc.text(
      `Seite ${pageNumber}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  function addTitle(text: string): void {
    checkPageBreak(20);
    doc.setFontSize(config.fontSize.title);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.primary);
    doc.text(text, pageWidth / 2, currentY, { align: 'center' });
    currentY += 12;
  }

  function addParagraph(number: string, title: string): void {
    checkPageBreak(15);
    currentY += 5;
    
    // Accent bar
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
  }

  function addText(text: string, indent: number = 0): void {
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
  }

  function addLabelValue(label: string, value: string, indent: number = 0): void {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(config.colors.muted);
    doc.text(label + ':', config.margin.left + indent, currentY);
    doc.setTextColor(config.colors.text);
    doc.setFont('helvetica', 'bold');
    doc.text(value || '—', config.margin.left + indent + 45, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += config.lineHeight;
  }

  function addCheckbox(text: string, checked: boolean, indent: number = 0): void {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setTextColor(config.colors.text);
    const checkbox = checked ? '☑' : '☐';
    doc.text(`${checkbox} ${text}`, config.margin.left + indent, currentY);
    currentY += config.lineHeight;
  }

  function addSpace(height: number = 5): void {
    currentY += height;
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('de-DE');
  }

  function formatCurrency(amount: number): string {
    return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  }

  // ============================================
  // GENERATE PDF CONTENT
  // ============================================

  addHeader();

  // Title
  addTitle('MIETVERTRAG');
  addSpace(3);
  
  doc.setFontSize(config.fontSize.subheading);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(config.colors.muted);
  const vertragsartLabel = vertrag.vertragsart === 'wohnraum' ? 'für Wohnraum' : 
                           vertrag.vertragsart === 'gewerbe' ? 'für Gewerberäume' : 
                           'für Garage/Stellplatz';
  doc.text(vertragsartLabel, pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  // ============================================
  // VERTRAGSPARTEIEN
  // ============================================
  
  addParagraph('§1', 'Vertragsparteien');
  
  addText('Zwischen', 0);
  addSpace(3);
  
  // Vermieter
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.accent);
  doc.text('VERMIETER', config.margin.left + 5, currentY);
  currentY += 5;
  
  const { vermieter } = vertrag;
  addLabelValue('Name', vermieter.name, 5);
  addLabelValue('Anschrift', `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}`, 5);
  if (vermieter.vertreter) {
    addLabelValue('Vertreten durch', vermieter.vertreter, 5);
  }
  if (vermieter.telefon) addLabelValue('Telefon', vermieter.telefon, 5);
  if (vermieter.email) addLabelValue('E-Mail', vermieter.email, 5);
  
  addSpace(5);
  addText('und', 0);
  addSpace(3);
  
  // Mieter
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

  // ============================================
  // §2 MIETRÄUME
  // ============================================
  
  addParagraph('§2', 'Mieträume');
  
  const { mietobjekt } = vertrag;
  addText(`Der Vermieter vermietet dem Mieter zum Zwecke der Nutzung als ${vertrag.vertragsart === 'wohnraum' ? 'Wohnung' : vertrag.vertragsart === 'gewerbe' ? 'Gewerberäume' : 'Stellplatz'} folgende Räume:`);
  addSpace(3);
  
  addLabelValue('Adresse', `${mietobjekt.strasse} ${mietobjekt.hausnummer}`, 5);
  if (mietobjekt.wohnungsnummer) addLabelValue('Wohnungs-Nr.', mietobjekt.wohnungsnummer, 5);
  addLabelValue('PLZ / Ort', `${mietobjekt.plz} ${mietobjekt.ort}`, 5);
  addLabelValue('Geschoss', mietobjekt.geschoss, 5);
  if (mietobjekt.lage) addLabelValue('Lage', mietobjekt.lage, 5);
  
  addSpace(3);
  addText('Räume:', 0);
  
  // Räume als Checkboxen
  const raeume = [
    { key: 'zimmeranzahl', label: `${mietobjekt.zimmeranzahl} Zimmer`, checked: mietobjekt.zimmeranzahl > 0 },
    { key: 'hatKueche', label: 'Küche', checked: mietobjekt.hatKueche },
    { key: 'hatKochnische', label: 'Kochnische', checked: mietobjekt.hatKochnische },
    { key: 'hatBad', label: 'Bad', checked: mietobjekt.hatBad },
    { key: 'hatDusche', label: 'Dusche', checked: mietobjekt.hatDusche },
    { key: 'hatWcRaum', label: 'WC', checked: mietobjekt.hatWcRaum },
    { key: 'hatDiele', label: 'Diele/Flur', checked: mietobjekt.hatDiele },
    { key: 'hatBalkon', label: 'Balkon', checked: mietobjekt.hatBalkon },
    { key: 'hatTerrasse', label: 'Terrasse', checked: mietobjekt.hatTerrasse },
    { key: 'hatKeller', label: 'Keller', checked: mietobjekt.hatKeller },
    { key: 'hatBoden', label: 'Dachboden', checked: mietobjekt.hatBoden },
  ];
  
  raeume.filter(r => r.checked).forEach(r => addCheckbox(r.label, true, 5));
  
  addSpace(3);
  addLabelValue('Wohnfläche ca.', `${mietobjekt.wohnflaeche} m²`, 0);
  
  if (mietobjekt.hatGarage || mietobjekt.hatCarport || mietobjekt.hatStellplatz) {
    addSpace(3);
    addText('Zusätzlich:', 0);
    if (mietobjekt.hatGarage) addCheckbox('Garage', true, 5);
    if (mietobjekt.hatCarport) addCheckbox('Carport', true, 5);
    if (mietobjekt.hatStellplatz) addCheckbox(`Stellplatz (Nr. ${mietobjekt.stellplatzNummer || '—'})`, true, 5);
    if (mietobjekt.hatGarten) addCheckbox(`Garten: ${mietobjekt.gartenBeschreibung || ''}`, true, 5);
  }

  // ============================================
  // §3 MIETZEIT
  // ============================================
  
  addParagraph('§3', 'Mietzeit');
  
  const { mietzeit } = vertrag;
  addLabelValue('Mietbeginn', formatDate(mietzeit.mietbeginn), 0);
  
  if (mietzeit.befristet) {
    addLabelValue('Mietende', formatDate(mietzeit.mietende || ''), 0);
    addText(`Das Mietverhältnis ist befristet bis zum ${formatDate(mietzeit.mietende || '')}.`);
    if (mietzeit.befristungsgrund) {
      addText(`Befristungsgrund gemäß §575 BGB: ${mietzeit.befristungsgrund}`);
    }
  } else {
    addText('Das Mietverhältnis wird auf unbestimmte Zeit geschlossen. Es kann von beiden Parteien unter Einhaltung der gesetzlichen Kündigungsfristen (§573c BGB) gekündigt werden.');
  }

  // ============================================
  // §4 MIETE
  // ============================================
  
  addParagraph('§4', 'Miete');
  
  const { miete } = vertrag;
  addText('Der Mieter zahlt folgende monatliche Miete:', 0);
  addSpace(3);
  
  addLabelValue('Grundmiete Wohnung', formatCurrency(miete.grundmieteWohnung), 5);
  if (miete.grundmieteGarage > 0) {
    addLabelValue('Grundmiete Garage/Stellplatz', formatCurrency(miete.grundmieteGarage), 5);
  }
  if (miete.grundmieteSonstiges > 0) {
    addLabelValue(`Sonstiges (${miete.grundmieteSonstigesBeschreibung || ''})`, formatCurrency(miete.grundmieteSonstiges), 5);
  }
  
  doc.setDrawColor(config.colors.line);
  doc.line(config.margin.left + 5, currentY, config.margin.left + 100, currentY);
  currentY += 3;
  
  addLabelValue('Grundmiete gesamt', formatCurrency(miete.grundmieteGesamt), 5);
  addLabelValue('+ Betriebskostenvorauszahlung', formatCurrency(miete.nebenkostenVorauszahlung), 5);
  
  addSpace(3);
  doc.setFontSize(config.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(config.colors.accent);
  doc.text(`GESAMTMIETE: ${formatCurrency(miete.gesamtmiete)}`, config.margin.left + 5, currentY);
  currentY += config.lineHeight + 3;
  
  addText('Die Gesamtmiete ist monatlich im Voraus, spätestens bis zum 3. Werktag eines jeden Monats, auf das Konto des Vermieters zu überweisen.');

  // ============================================
  // §5 BETRIEBSKOSTEN
  // ============================================
  
  addParagraph('§5', 'Betriebskosten');
  
  addText('Der Mieter trägt neben der Grundmiete folgende Betriebskosten als monatliche Vorauszahlung. Die Abrechnung erfolgt jährlich nach folgenden Schlüsseln:');
  addSpace(3);
  
  const bk = vertrag.betriebskosten;
  const aktiveBK = (Object.keys(BETRIEBSKOSTEN_LABELS) as Array<keyof typeof BETRIEBSKOSTEN_LABELS>)
    .filter(key => bk[key]?.aktiv);
  
  aktiveBK.forEach(key => {
    const pos = bk[key];
    const schluesselLabel = ABRECHNUNGSSCHLUESSEL_LABELS[pos.schluessel] || '';
    addCheckbox(`${BETRIEBSKOSTEN_LABELS[key]} (${schluesselLabel})`, true, 5);
  });
  
  if (bk.sonstige && bk.sonstige.length > 0) {
    bk.sonstige.forEach(s => {
      const schluesselLabel = ABRECHNUNGSSCHLUESSEL_LABELS[s.schluessel] || '';
      addCheckbox(`${s.bezeichnung} (${schluesselLabel})`, true, 5);
    });
  }

  // ============================================
  // §6 MIETERHÖHUNG (wenn Staffel oder Index)
  // ============================================
  
  if (vertrag.mieterhoehung.typ !== 'keine') {
    addParagraph('§6', vertrag.mieterhoehung.typ === 'staffel' ? 'Staffelmiete' : 'Indexmiete');
    
    if (vertrag.mieterhoehung.typ === 'staffel' && vertrag.mieterhoehung.staffeln.length > 0) {
      addText('Die Miete erhöht sich zu folgenden Zeitpunkten (Staffelmiete gemäß §557a BGB):');
      addSpace(3);
      vertrag.mieterhoehung.staffeln.forEach((staffel, i) => {
        addLabelValue(`Staffel ${i + 1} ab ${formatDate(staffel.datum)}`, formatCurrency(staffel.betrag), 5);
      });
    } else if (vertrag.mieterhoehung.typ === 'index') {
      addText(`Die Miete ist an den Verbraucherpreisindex gekoppelt (Indexmiete gemäß §557b BGB). Ausgangspunkt ist der Index vom ${vertrag.mieterhoehung.indexStart || '—'}. Eine Anpassung erfolgt bei einer Änderung von mindestens ${vertrag.mieterhoehung.indexSchwelle}%.`);
    }
  }

  // ============================================
  // §7 KAUTION
  // ============================================
  
  addParagraph('§7', 'Mietsicherheit (Kaution)');
  
  const { kaution } = vertrag;
  addText(`Der Mieter leistet eine Mietsicherheit in Höhe von ${formatCurrency(kaution.betrag)} (max. 3 Monatsgrundmieten gemäß §551 BGB).`);
  addSpace(3);
  
  const zahlungsartLabels: Record<string, string> = {
    ueberweisung: 'Überweisung auf das Vermieterkonto',
    bar: 'Barzahlung bei Übergabe',
    buergschaft: 'Bankbürgschaft',
    kautionskonto: 'Kautionskonto/Sparbuch (verzinst)',
    ratenzahlung: 'Ratenzahlung in 3 Monatsraten',
  };
  
  addLabelValue('Zahlungsart', zahlungsartLabels[kaution.zahlungsart] || '—', 0);
  
  addText('Die Kaution wird nach Beendigung des Mietverhältnisses und nach Prüfung aller Ansprüche des Vermieters unverzüglich zurückgezahlt.');

  // ============================================
  // §8 BANKVERBINDUNG
  // ============================================
  
  addParagraph('§8', 'Bankverbindung des Vermieters');
  
  const { bankverbindung } = vertrag;
  addLabelValue('Kontoinhaber', bankverbindung.kontoinhaber, 0);
  addLabelValue('IBAN', bankverbindung.iban, 0);
  if (bankverbindung.bic) addLabelValue('BIC', bankverbindung.bic, 0);

  // ============================================
  // §9 HEIZUNG
  // ============================================
  
  if (vertrag.heizung.art) {
    addParagraph('§9', 'Heizung und Warmwasser');
    
    addLabelValue('Heizungsart', vertrag.heizung.art, 0);
    addLabelValue('Heizperiode', `${vertrag.heizung.heizperiodeVon} bis ${vertrag.heizung.heizperiodeBis}`, 0);
    addLabelValue('Heizzeit', `${vertrag.heizung.heizzeitVon} Uhr bis ${vertrag.heizung.heizzeitBis} Uhr`, 0);
  }

  // ============================================
  // §10 KLEINREPARATUREN
  // ============================================
  
  if (vertrag.kleinreparaturen.aktiv) {
    addParagraph('§10', 'Kleinreparaturen');
    
    addText(`Der Mieter trägt die Kosten für Kleinreparaturen an Gegenständen, die seinem häufigen Zugriff ausgesetzt sind (z.B. Wasserhähne, Türgriffe, Lichtschalter).`);
    addSpace(3);
    addLabelValue('Max. pro Reparatur', formatCurrency(vertrag.kleinreparaturen.maxEinzel), 0);
    addLabelValue('Max. pro Jahr', formatCurrency(vertrag.kleinreparaturen.maxJahr), 0);
  }

  // ============================================
  // §11 SCHÖNHEITSREPARATUREN
  // ============================================
  
  addParagraph('§11', 'Schönheitsreparaturen');
  
  addCheckbox(
    `Die Wohnung wird ${vertrag.schoenheitsreparaturen.uebergabeRenoviert ? 'renoviert' : 'unrenoviert'} übergeben`,
    true,
    0
  );
  
  if (vertrag.schoenheitsreparaturen.mieterPflicht) {
    addText('Der Mieter verpflichtet sich, Schönheitsreparaturen während der Mietzeit und bei Auszug durchzuführen, soweit erforderlich.');
  }

  // ============================================
  // §12 SONSTIGE VEREINBARUNGEN
  // ============================================
  
  if (vertrag.sonstigeVereinbarungen.text) {
    addParagraph('§12', 'Sonstige Vereinbarungen');
    addText(vertrag.sonstigeVereinbarungen.text, 0);
  }

  // ============================================
  // §13 SCHLUSSBESTIMMUNGEN
  // ============================================
  
  addParagraph('§13', 'Schlussbestimmungen');
  
  addText('Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform. Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen hierdurch nicht berührt.');
  addSpace(3);
  addText('Der Mieter bestätigt, ein Exemplar dieses Mietvertrages, die Hausordnung und ggf. weitere Anlagen erhalten zu haben.');

  // ============================================
  // UNTERSCHRIFTEN
  // ============================================
  
  checkPageBreak(60);
  addParagraph('§14', 'Unterschriften');
  
  const { unterschriften } = vertrag;
  addSpace(5);
  addText(`${unterschriften.ort}, den ${formatDate(unterschriften.datum)}`, 0);
  addSpace(15);
  
  // Unterschriftenlinien
  const halfWidth = contentWidth / 2 - 10;
  
  doc.setDrawColor(config.colors.text);
  doc.line(config.margin.left, currentY, config.margin.left + halfWidth, currentY);
  doc.line(config.margin.left + halfWidth + 20, currentY, pageWidth - config.margin.right, currentY);
  currentY += 5;
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.muted);
  doc.text('Vermieter', config.margin.left, currentY);
  doc.text('Mieter', config.margin.left + halfWidth + 20, currentY);

  // Footer auf letzter Seite
  addFooter();

  // ============================================
  // SAVE PDF
  // ============================================
  
  const filename = `Mietvertrag_${mietobjekt.strasse}_${mietobjekt.hausnummer}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

import { jsPDF } from 'jspdf';
import type { Mietvertrag } from '../types';
import { BETRIEBSKOSTEN_LABELS, ABRECHNUNGSSCHLUESSEL_LABELS } from '../types';

// ============================================
// PROFESSIONELLER MIETVERTRAG PDF GENERATOR
// Basierend auf Haus & Grund Bremen Vorlage
// ============================================

interface PDFConfig {
  margin: { top: number; right: number; bottom: number; left: number };
  lineHeight: number;
  fontSize: { title: number; heading: number; subheading: number; normal: number; small: number };
  colors: { primary: string; text: string; muted: string; accent: string; line: string };
}

const config: PDFConfig = {
  margin: { top: 20, right: 20, bottom: 25, left: 20 },
  lineHeight: 5,
  fontSize: { title: 16, heading: 11, subheading: 10, normal: 9, small: 8 },
  colors: { primary: '#1a1a1a', text: '#333333', muted: '#666666', accent: '#00838f', line: '#cccccc' },
};

export function generateMietvertragPDF(vertrag: Mietvertrag): void {
  console.log('PDF Generation gestartet...');
  
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  let currentY = config.margin.top;
  let pageNumber = 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - config.margin.left - config.margin.right;

  // Helper Functions
  const checkPageBreak = (needed: number = 15): void => {
    if (currentY + needed > pageHeight - config.margin.bottom) {
      doc.setFontSize(config.fontSize.small);
      doc.setTextColor(config.colors.muted);
      doc.text(`Seite ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.addPage();
      pageNumber++;
      currentY = config.margin.top;
    }
  };

  const addTitle = (text: string): void => {
    checkPageBreak(20);
    doc.setFontSize(config.fontSize.title);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.primary);
    doc.text(text, pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;
  };

  const addSubtitle = (text: string): void => {
    doc.setFontSize(config.fontSize.subheading);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(config.colors.muted);
    doc.text(text, pageWidth / 2, currentY, { align: 'center' });
    currentY += 8;
  };

  const addParagraph = (number: string, title: string): void => {
    checkPageBreak(12);
    currentY += 4;
    doc.setFillColor(config.colors.accent);
    doc.rect(config.margin.left, currentY - 3, 2, 6, 'F');
    doc.setFontSize(config.fontSize.heading);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.primary);
    doc.text(`${number} ${title}`, config.margin.left + 5, currentY);
    currentY += 6;
    doc.setDrawColor(config.colors.line);
    doc.line(config.margin.left, currentY, pageWidth - config.margin.right, currentY);
    currentY += 4;
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

  const addBoldText = (text: string, indent: number = 0): void => {
    doc.setFontSize(config.fontSize.normal);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(config.colors.text);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    for (const line of lines) {
      checkPageBreak(config.lineHeight);
      doc.text(line, config.margin.left + indent, currentY);
      currentY += config.lineHeight;
    }
    doc.setFont('helvetica', 'normal');
  };

  const addLabelValue = (label: string, value: string, indent: number = 0): void => {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setTextColor(config.colors.muted);
    doc.text(label + ':', config.margin.left + indent, currentY);
    doc.setTextColor(config.colors.text);
    doc.setFont('helvetica', 'bold');
    doc.text(value || '-', config.margin.left + indent + 50, currentY);
    doc.setFont('helvetica', 'normal');
    currentY += config.lineHeight;
  };

  const addCheckbox = (text: string, checked: boolean, indent: number = 0): void => {
    checkPageBreak(config.lineHeight);
    doc.setFontSize(config.fontSize.normal);
    doc.setTextColor(config.colors.text);
    doc.text((checked ? '[X] ' : '[ ] ') + text, config.margin.left + indent, currentY);
    currentY += config.lineHeight;
  };

  const addNumberedItem = (num: string, text: string, indent: number = 0): void => {
    doc.setFontSize(config.fontSize.normal);
    doc.setTextColor(config.colors.text);
    doc.setFont('helvetica', 'bold');
    doc.text(num, config.margin.left + indent, currentY);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, contentWidth - indent - 8);
    for (let i = 0; i < lines.length; i++) {
      checkPageBreak(config.lineHeight);
      doc.text(lines[i], config.margin.left + indent + 8, currentY);
      currentY += config.lineHeight;
    }
  };

  const addSpace = (h: number = 3): void => { currentY += h; };

  const formatDate = (d: string): string => d ? new Date(d).toLocaleDateString('de-DE') : '-';
  const formatCurrency = (a: number): string => a.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  // ============================================
  // PDF CONTENT
  // ============================================

  // TITLE
  addTitle('MIETVERTRAG');
  addSubtitle(vertrag.vertragsart === 'wohnraum' ? 'fuer Wohnraum' : vertrag.vertragsart === 'gewerbe' ? 'fuer Gewerberaeume' : 'fuer Garage/Stellplatz');
  addSpace(5);

  // §1 VERTRAGSPARTEIEN
  addParagraph('§ 1', 'Vertragsparteien');
  addText('Zwischen');
  addSpace(2);
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.accent);
  doc.setFont('helvetica', 'bold');
  doc.text('VERMIETER', config.margin.left + 5, currentY);
  doc.setFont('helvetica', 'normal');
  currentY += 4;
  
  const { vermieter } = vertrag;
  addLabelValue('Name', vermieter.name, 5);
  addLabelValue('Anschrift', `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}`, 5);
  if (vermieter.vertreter) addLabelValue('Vertreten durch', vermieter.vertreter, 5);
  if (vermieter.email) addLabelValue('E-Mail', vermieter.email, 5);
  
  addSpace(3);
  addText('und');
  addSpace(2);
  
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.accent);
  doc.setFont('helvetica', 'bold');
  doc.text('MIETER', config.margin.left + 5, currentY);
  doc.setFont('helvetica', 'normal');
  currentY += 4;
  
  vertrag.mieter.forEach((m, i) => {
    if (i > 0) addSpace(2);
    addLabelValue(`Mieter ${i + 1}`, `${m.vorname} ${m.nachname}`, 5);
    addLabelValue('Geb. am', formatDate(m.geburtsdatum), 5);
    addLabelValue('Anschrift', `${m.strasse}, ${m.plz} ${m.ort}`, 5);
  });
  
  addSpace(3);
  addText('Der Mieter verpflichtet sich, auch bei unentgeltlicher dauerhafter Aufnahme von Familienangehoerigen und/oder Lebenspartnern, dem Vermieter Namen und Geburtsdaten dieser Personen unaufgefordert mitzuteilen.');
  addSpace(2);
  addText('wird folgender Mietvertrag geschlossen:');

  // §2 MIETRAEUME
  addParagraph('§ 2', 'Mietraeume');
  const { mietobjekt } = vertrag;
  addText(`Vermietet wird zu Wohnzwecken die Wohnung / das Haus:`);
  addSpace(2);
  addLabelValue('Adresse', `${mietobjekt.strasse} ${mietobjekt.hausnummer}, ${mietobjekt.plz} ${mietobjekt.ort}`, 5);
  addLabelValue('Geschoss', mietobjekt.geschoss || '-', 5);
  addLabelValue('Wohnflaeche', `ca. ${mietobjekt.wohnflaeche} m2`, 5);
  addLabelValue('Zimmer', `${mietobjekt.zimmeranzahl}`, 5);
  
  addSpace(2);
  addText('Ausstattung:', 0);
  if (mietobjekt.hatKueche) addCheckbox('Kueche', true, 5);
  if (mietobjekt.hatBad) addCheckbox('Bad', true, 5);
  if (mietobjekt.hatDusche) addCheckbox('Dusche', true, 5);
  if (mietobjekt.hatWcRaum) addCheckbox('WC-Raum', true, 5);
  if (mietobjekt.hatBalkon) addCheckbox('Balkon', true, 5);
  if (mietobjekt.hatTerrasse) addCheckbox('Terrasse', true, 5);
  if (mietobjekt.hatKeller) addCheckbox('Keller', true, 5);
  if (mietobjekt.hatGarage) addCheckbox('Garage', true, 5);
  if (mietobjekt.hatStellplatz) addCheckbox(`Stellplatz Nr. ${mietobjekt.stellplatzNummer || '-'}`, true, 5);
  
  addSpace(2);
  addLabelValue('Schluessel', `${mietobjekt.schluessel.haus} Haus, ${mietobjekt.schluessel.wohnung} Wohnung, ${mietobjekt.schluessel.briefkasten} Briefkasten`, 0);

  // §3 MIETZEIT
  addParagraph('§ 3', 'Mietzeit');
  const { mietzeit } = vertrag;
  if (!mietzeit.befristet) {
    addBoldText('Unbefristetes Mietverhaeltnis');
    addLabelValue('Mietbeginn', formatDate(mietzeit.mietbeginn), 0);
    addText('Das Mietverhaeltnis laeuft auf unbestimmte Zeit.');
  } else {
    addBoldText('Befristetes Mietverhaeltnis (gemaess § 575 BGB)');
    addLabelValue('Mietbeginn', formatDate(mietzeit.mietbeginn), 0);
    addLabelValue('Mietende', formatDate(mietzeit.mietende || ''), 0);
    if (mietzeit.befristungsgrund) {
      addText(`Befristungsgrund: ${mietzeit.befristungsgrund}`);
    }
  }

  // §4 KUENDIGUNG
  addParagraph('§ 4', 'Kuendigung des Vertrages');
  addNumberedItem('1.', 'Ein Mietverhaeltnis von unbestimmter Dauer kann spaetestens bis zum dritten Werktag eines Kalendermonats fuer den Ablauf des uebernaechsten Kalendermonats gekuendigt werden. Die Kuendigung muss schriftlich erfolgen.');
  addNumberedItem('2.', 'Die Kuendigungsfrist fuer den Vermieter verlaengert sich nach 5 Jahren seit der Ueberlassung des Wohnraumes auf 6 Monate und nach 8 Jahren auf 9 Monate.');
  addNumberedItem('3.', 'Fuer die Rechtzeitigkeit der Kuendigung kommt es nicht auf die Absendung, sondern auf den Zugang des Kuendigungsschreibens an.');
  addNumberedItem('4.', 'Die Fortsetzung des Gebrauchs der Mietsache nach Ablauf des Mietverhaeltnisses gilt nicht als Verlaengerung. § 545 BGB wird ausgeschlossen.');

  // §5 MIETE
  addParagraph('§ 5', 'Miete');
  const { miete } = vertrag;
  addBoldText('Die monatliche Miete setzt sich wie folgt zusammen:');
  addSpace(2);
  addLabelValue('Grundmiete Wohnung', formatCurrency(miete.grundmieteWohnung), 5);
  if (miete.grundmieteGarage > 0) addLabelValue('Grundmiete Garage/Stellplatz', formatCurrency(miete.grundmieteGarage), 5);
  if (miete.grundmieteSonstiges > 0) addLabelValue('Sonstiges', formatCurrency(miete.grundmieteSonstiges), 5);
  addSpace(1);
  doc.setDrawColor(config.colors.line);
  doc.line(config.margin.left + 5, currentY, config.margin.left + 120, currentY);
  currentY += 3;
  addLabelValue('Summe Grundmiete', formatCurrency(miete.grundmieteGesamt), 5);
  addLabelValue('+ Betriebskostenvorauszahlung', formatCurrency(miete.nebenkostenVorauszahlung), 5);
  addSpace(2);
  doc.setFontSize(config.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(config.colors.accent);
  doc.text(`GESAMTMIETE MONATLICH: ${formatCurrency(miete.gesamtmiete)}`, config.margin.left + 5, currentY);
  currentY += 8;

  // §6 MIETERHOEHUNG (wenn vorhanden)
  if (vertrag.mieterhoehung.typ === 'staffel' && vertrag.mieterhoehung.staffeln.length > 0) {
    addParagraph('§ 6', 'Staffelmiete');
    addText('Die Miete erhoeht sich zu folgenden Zeitpunkten (Staffelmiete gemaess § 557a BGB):');
    addSpace(2);
    vertrag.mieterhoehung.staffeln.forEach((s, i) => {
      addLabelValue(`Staffel ${i + 1} ab ${formatDate(s.datum)}`, formatCurrency(s.betrag), 5);
    });
    addText('Die Miete muss jeweils mindestens 12 Monate unveraendert bleiben.');
  }

  if (vertrag.mieterhoehung.typ === 'index') {
    addParagraph('§ 6', 'Indexmiete');
    addText(`Die Vertragsparteien vereinbaren eine Indexmiete (gemaess § 557b BGB).`);
    addText(`Aendert sich der Verbraucherpreisindex um mehr als ${vertrag.mieterhoehung.indexSchwelle}%, aendert sich die Miete entsprechend.`);
    addText('Waehrend der Geltung einer Indexmiete muss die Miete mindestens 12 Monate unveraendert bleiben.');
  }

  // §7 BETRIEBSKOSTEN
  addParagraph('§ 7', 'Betriebskosten');
  addText('Neben der Grundmiete sind vom Mieter nachstehende Betriebskosten zu tragen:');
  addSpace(2);
  
  const bk = vertrag.betriebskosten;
  const aktiveBK = (Object.keys(BETRIEBSKOSTEN_LABELS) as Array<keyof typeof BETRIEBSKOSTEN_LABELS>).filter(key => bk[key]?.aktiv);
  
  aktiveBK.forEach(key => {
    const pos = bk[key];
    const schluessel = ABRECHNUNGSSCHLUESSEL_LABELS[pos.schluessel] || '';
    addCheckbox(`${BETRIEBSKOSTEN_LABELS[key]} - ${schluessel}`, true, 5);
  });
  
  addSpace(2);
  addText('Die Abrechnung muss dem Mieter spaetestens bis zum Ablauf des 12. Monats nach Ende des Abrechnungszeitraumes zugegangen sein (§ 556 Abs. 3 BGB).');

  // §8 FAELLIGKEIT / BANKVERBINDUNG
  addParagraph('§ 8', 'Faelligkeit der Miete und Bankverbindung');
  addText('Die Miete ist spaetestens bis zum 3. Werktag eines jeden Kalendermonats im Voraus auf folgendes Konto zu ueberweisen:');
  addSpace(2);
  const { bankverbindung } = vertrag;
  addLabelValue('Kontoinhaber', bankverbindung.kontoinhaber, 5);
  addLabelValue('IBAN', bankverbindung.iban, 5);
  if (bankverbindung.bic) addLabelValue('BIC', bankverbindung.bic, 5);
  addSpace(2);
  addText('Bei Zahlungsverzug ist der Vermieter berechtigt, Verzugszinsen und Mahnkosten zu erheben.');

  // §9 HEIZUNG
  addParagraph('§ 9', 'Heizung');
  const { heizung } = vertrag;
  addText(`Die Wohnraeume werden, soweit es die Witterung erfordert, mindestens vom ${heizung.heizperiodeVon} bis ${heizung.heizperiodeBis} in der Zeit von ${heizung.heizzeitVon} bis ${heizung.heizzeitBis} Uhr mit einer Temperatur von nicht weniger als 20 Grad Celsius beheizt.`);
  if (heizung.art) addLabelValue('Heizungsart', heizung.art, 0);
  addText('Der Mieter ist verpflichtet, die anteiligen Kosten fuer den Betrieb der Heizungsanlage zu bezahlen.');

  // §10 WASSERVERSORGUNG
  addParagraph('§ 10', 'Wasserversorgung');
  addText('Wird der Verbrauch fuer Warm- und/oder Kaltwasser durch Messgeraete erfasst, ist der Mieter verpflichtet, die Kosten fuer Anmietung, Ablesung, Wartung und Eichung der Geraete zu bezahlen.');
  addText('Die Warmwasserversorgung erfolgt im ganzen Jahr. Der Mieter ist zur Bezahlung seines Anteils auch dann verpflichtet, wenn er Warmwasser nicht abnimmt.');

  // §11 BENUTZUNG DER MIETSACHE
  addParagraph('§ 11', 'Benutzung der Mietsache');
  addText('Mit Ruecksicht auf die Gesamtheit der Mieter und die Belange des Vermieters bedarf es der vorherigen Zustimmung des Vermieters, wenn der Mieter:');
  addText('a) die Wohnung Dritten ueberlassen will (ausser Besuch von angemessener Dauer)', 5);
  addText('b) die Wohnung zu anderen als Wohnzwecken nutzen will', 5);
  addText('c) Schilder oder Gegenstaende am Haus anbringen will', 5);
  addText('d) Tiere (z.B. Hunde, Katzen) halten will - Kleintiere ausgenommen', 5);
  addText('e) Antennen anbringen oder veraendern will', 5);
  addText('f) Um-, An- und Einbauten vornehmen will', 5);

  // §12 BAULICHE VERAENDERUNGEN
  addParagraph('§ 12', 'Bauliche Veraenderungen durch den Vermieter');
  addText('Bauliche Veraenderungen sowie Erhaltungsmassnahmen, die zur Abwendung drohender Gefahren notwendig werden, darf der Vermieter auch ohne Zustimmung vornehmen.');
  addText('Bei Modernisierungsmassnahmen hat der Vermieter dem Mieter spaetestens 3 Monate vor Beginn Art, Umfang und voraussichtliche Dauer schriftlich mitzuteilen.');

  // §13 BETRETEN DER MIETRAEUME
  addParagraph('§ 13', 'Betreten der Mietraeume');
  addText('Der Mieter hat waehrend der ueblichen Tageszeit (werktags bis 19 Uhr) zu gewaehrleisten, dass der Vermieter und/oder Beauftragte aus begruendetem Anlass nach Terminvereinbarung die Mietsache betreten koennen.');
  addText('Ein begruendeter Anlass liegt z.B. vor: Ablesen von Messgeraeten, Pruefung von Schaeden, Reparaturarbeiten, Besichtigung bei Kuendigung oder Verkaufsabsicht.');

  // §14 INSTANDHALTUNG / KLEINREPARATUREN
  addParagraph('§ 14', 'Instandhaltung der Mietsache');
  addText('Der Mieter hat die Mietsache schonend und pfleglich zu behandeln und dafuer Sorge zu tragen, dass die Raeume ganzjaehrig ausreichend beheizt und belueftet werden.');
  addText('Schaeden sind dem Vermieter unverzueglich anzuzeigen.');
  addSpace(2);
  if (vertrag.kleinreparaturen.aktiv) {
    addBoldText('Kleinreparaturklausel:');
    addText(`Der Mieter hat die Kosten fuer Kleinreparaturen zu tragen bis zu ${formatCurrency(vertrag.kleinreparaturen.maxEinzel)} pro Einzelfall und maximal ${formatCurrency(vertrag.kleinreparaturen.maxJahr)} pro Kalenderjahr.`);
  }

  // §15 SCHOENHEITSREPARATUREN
  addParagraph('§ 15', 'Schoenheitsreparaturen');
  addText('Zu den Schoenheitsreparaturen gehoeren: Tapezieren oder Anstreichen der Waende und Decken, Streichen der Heizkoerper, Innentueren, Fenster von innen sowie Reinigen der Fussboeden.');
  addSpace(2);
  const zustandLabels: Record<string, string> = {
    'renoviert': 'renoviert / nicht renovierungsbeduerftig',
    'unrenoviert': 'unrenoviert',
    'protokoll': 'siehe Uebergabeprotokoll'
  };
  addCheckbox(`Die Wohnung wird ${zustandLabels[vertrag.schoenheitsreparaturen.uebergabeZustand] || 'renoviert'} uebergeben`, true, 0);
  if (vertrag.schoenheitsreparaturen.uebergabeZustand === 'renoviert' && vertrag.schoenheitsreparaturen.mieterPflicht) {
    addText('Der Mieter ist waehrend der Mietzeit verpflichtet, die laufenden Schoenheitsreparaturen auf seine Kosten fachgerecht auszufuehren, soweit diese durch seinen Gebrauch erforderlich werden.');
  }

  // §16 HAUSORDNUNG
  addParagraph('§ 16', 'Hausordnung');
  addText('Die diesem Vertrag beigefuegte Hausordnung ist Bestandteil dieses Vertrages.');
  addText('Sie kann vom Vermieter geaendert werden, wenn dringende Gruende der Ordnung oder Bewirtschaftung dies erfordern.');

  // §17 ENTSCHAEDIGUNGSPFLICHT
  addParagraph('§ 17', 'Entschaedigungspflicht nach Beendigung');
  addText('Wird die Raeumung nach Beendigung des Mietverhaeltnisses verzoegert, ist der Mieter verpflichtet, eine Entschaedigung bis zur Hoehe der ortsueblichen Vergleichsmiete, mindestens jedoch in Hoehe der vereinbarten Miete, bis zur vollstaendigen Raeumung zu zahlen.');

  // §18 RUECKGABE DER MIETSACHE
  addParagraph('§ 18', 'Rueckgabe der Mietsache');
  addText('Bei Beendigung des Mietverhaeltnisses sind die Raeume vollstaendig geraeumt und ordnungsgemaess gereinigt herauszugeben.');
  addText('Alle Schluessel, auch vom Mieter selbst beschaffte, sind dem Vermieter zu uebergeben.');
  addText('Hat der Mieter bauliche Veraenderungen vorgenommen, ist er auf Verlangen des Vermieters verpflichtet, den urspruenglichen Zustand wiederherzustellen.');

  // §19 PERSONENMEHRHEIT
  if (vertrag.mieter.length > 1) {
    addParagraph('§ 19', 'Personenmehrheit als Mieter');
    addText('Mehrere Personen als Mieter haften fuer alle Verpflichtungen aus dem Mietvertrag als Gesamtschuldner.');
    addText('Rechtsgestaltende Erklaerungen muessen von oder gegenueber allen Mietern abgegeben werden.');
  }

  // §20 KAUTION
  addParagraph('§ 20', 'Mietsicherheit (Kaution)');
  const { kaution } = vertrag;
  addText(`Es wird eine Mietsicherheit in Hoehe von ${formatCurrency(kaution.betrag)} vereinbart (max. 3 Monatsgrundmieten gemaess § 551 BGB).`);
  const zahlungsarten: Record<string, string> = {
    ueberweisung: 'Ueberweisung', bar: 'Barzahlung', buergschaft: 'Bankbuergschaft',
    kautionskonto: 'Kautionskonto/Sparbuch', ratenzahlung: 'Ratenzahlung in 3 Raten'
  };
  addLabelValue('Zahlungsart', zahlungsarten[kaution.zahlungsart] || '-', 0);
  addText('Die Kaution wird nach Beendigung des Mietverhaeltnisses und Pruefung aller Ansprueche zurueckgezahlt.');

  // §21 SONSTIGE VEREINBARUNGEN
  if (vertrag.sonstigeVereinbarungen.text) {
    addParagraph('§ 21', 'Sonstige Vereinbarungen');
    addText(vertrag.sonstigeVereinbarungen.text);
  }

  // §22 DATENSCHUTZ
  addParagraph('§ 22', 'Datenschutz');
  addText('Vermieter und Mieter sind damit einverstanden, dass Daten dieses Vertrages (Lage, Art, Groesse, Miete) an Dritte zur Erstellung von Mietspiegeln uebermittelt werden duerfen.');
  addText('Der Mieter hat einen Anspruch auf Auskunft ueber gespeicherte Daten gemaess DSGVO.');

  // §23 SCHLUSSBESTIMMUNGEN
  addParagraph('§ 23', 'Schlussbestimmungen');
  addText('Aenderungen und Ergaenzungen dieses Vertrages beduerfen der Schriftform.');
  addText('Sollten einzelne Bestimmungen unwirksam sein, wird die Wirksamkeit der uebrigen Bestimmungen nicht beruehrt.');
  addText('Der Mieter bestaetigt, ein Exemplar dieses Mietvertrages und die Hausordnung erhalten zu haben.');

  // UNTERSCHRIFTEN
  const mieterAnzahl = vertrag.mieter.length;
  const unterschriftenHoehe = 50 + (mieterAnzahl * 40);
  checkPageBreak(unterschriftenHoehe);
  
  addParagraph('§ 24', 'Unterschriften');
  const { unterschriften } = vertrag;
  addSpace(3);
  addText(`${unterschriften.ort || 'Bremen'}, den ${formatDate(unterschriften.datum)}`);
  addSpace(8);
  
  // Helper: Signatur als Bild einfügen
  const addSignatureImage = (signatureData: string | undefined, x: number, y: number, maxWidth: number, maxHeight: number): boolean => {
    if (signatureData && signatureData.startsWith('data:image')) {
      try {
        // Format aus data URL extrahieren
        const format = signatureData.includes('image/png') ? 'PNG' : 'JPEG';
        doc.addImage(signatureData, format, x, y, maxWidth, maxHeight);
        return true;
      } catch (e) {
        console.warn('Signatur konnte nicht eingefügt werden:', e);
      }
    }
    return false;
  };
  
  // Vermieter Unterschrift
  const signatureHeight = 15;
  const signatureWidth = 50;
  
  // Signatur-Bild einfügen (wenn vorhanden)
  if (unterschriften.vermieterSignatur) {
    const added = addSignatureImage(unterschriften.vermieterSignatur, config.margin.left, currentY, signatureWidth, signatureHeight);
    if (added) {
      currentY += signatureHeight + 3;
    }
  }
  
  doc.setDrawColor(config.colors.text);
  doc.line(config.margin.left, currentY, config.margin.left + 80, currentY);
  currentY += 4;
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.muted);
  doc.text('Vermieter', config.margin.left, currentY);
  doc.setTextColor(config.colors.text);
  doc.text(vermieter.name || '', config.margin.left, currentY + 4);
  currentY += 15;
  
  // Mieter Unterschriften
  vertrag.mieter.forEach((m, i) => {
    checkPageBreak(40);
    
    // Signatur-Bild einfügen (wenn vorhanden)
    const mieterSignatur = unterschriften.mieterSignaturen?.[i];
    if (mieterSignatur) {
      const added = addSignatureImage(mieterSignatur, config.margin.left, currentY, signatureWidth, signatureHeight);
      if (added) {
        currentY += signatureHeight + 3;
      }
    }
    
    doc.setDrawColor(config.colors.text);
    doc.line(config.margin.left, currentY, config.margin.left + 80, currentY);
    currentY += 4;
    doc.setFontSize(config.fontSize.small);
    doc.setTextColor(config.colors.muted);
    doc.text(`Mieter ${mieterAnzahl > 1 ? (i + 1) : ''}`, config.margin.left, currentY);
    doc.setTextColor(config.colors.text);
    doc.text(`${m.vorname} ${m.nachname}`, config.margin.left, currentY + 4);
    currentY += 15;
  });

  // Footer letzte Seite
  doc.setFontSize(config.fontSize.small);
  doc.setTextColor(config.colors.muted);
  doc.text(`Seite ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // SPEICHERN
  const sanitize = (s: string) => s.replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `Mietvertrag_${sanitize(mietobjekt.strasse || 'Adresse')}_${sanitize(mietobjekt.hausnummer || '')}_${new Date().toISOString().slice(0, 10)}.pdf`;
  
  console.log('Speichere PDF:', filename);
  doc.save(filename);
  console.log('PDF erfolgreich erstellt!');
}

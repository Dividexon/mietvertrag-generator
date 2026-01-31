// Mietvertrag Generator - TypeScript Types
// Professioneller Mietvertrag nach deutschem Mietrecht (BGB §§535 ff.)

export type ThemeMode = 'light' | 'dark' | 'system';

// ============================================
// VERTRAGSART
// ============================================
export type Vertragsart = 'wohnraum' | 'gewerbe' | 'garage' | '';

// ============================================
// VERMIETER
// ============================================
export interface Vermieter {
  typ: 'person' | 'firma';
  name: string;
  strasse: string;
  plz: string;
  ort: string;
  vertreter?: string; // Bei Firma: "vertreten durch..."
  telefon?: string;
  email?: string;
}

// ============================================
// MIETER (bis zu 3 Personen)
// ============================================
export interface Mieter {
  id: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  strasse: string;
  plz: string;
  ort: string;
  telefon?: string;
  email?: string;
}

// ============================================
// GEWERBEMIETER (Firma)
// ============================================
export interface GewerbeMieter {
  id: string;
  firmenname: string;
  rechtsform: string; // "GmbH", "UG", "GbR", "Einzelunternehmen", etc.
  handelsregister?: string; // "HRB 12345 AG Bremen"
  vertreter: string; // Geschäftsführer
  strasse: string;
  plz: string;
  ort: string;
  telefon?: string;
  email?: string;
  ustIdNr?: string; // Umsatzsteuer-ID
}

// ============================================
// GEWERBE-SPEZIFISCH
// ============================================
export interface GewerbeObjekt {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  geschoss?: string;
  
  // Nutzung
  nutzungszweck: string; // "Büro", "Einzelhandel", "Lager", "Praxis", etc.
  
  // Flächen
  bueroflaeche: number;
  lagerflaeche: number;
  verkaufsflaeche: number;
  nebenflaeche: number;
  gesamtflaeche: number;
  
  // Extras
  stellplaetze: number;
  kellerraeume: number;
  
  beschreibung?: string;
}

export interface GewerbeMiete {
  grundmieteNetto: number;
  umsatzsteuerOptiert: boolean; // §9 UStG Option
  umsatzsteuerBetrag: number;
  grundmieteBrutto: number;
  nebenkostenVorauszahlung: number;
  gesamtmiete: number;
}

export interface GewerbeMietzeit {
  mietbeginn: string;
  laufzeitJahre: number; // Feste Laufzeit in Jahren
  verlaengerungsoptionen: number; // z.B. 2x 5 Jahre
  kuendigungsfristMonate: number;
}

// ============================================
// GARAGE/STELLPLATZ
// ============================================
export type GaragenArt = 'garage' | 'carport' | 'stellplatz' | 'tiefgarage' | '';

export interface GarageObjekt {
  art: GaragenArt;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  nummer: string; // Garagen-/Stellplatznummer
  beschreibung?: string; // z.B. "mit elektrischem Tor"
}

export interface GarageMiete {
  monatlicheMiete: number;
  kaution: number;
  kautionArt: 'ueberweisung' | 'bar' | 'keine' | '';
}

export interface GarageMietzeit {
  mietbeginn: string;
  befristet: boolean;
  mietende?: string;
  kuendigungsfristMonate: number; // z.B. 3
}

// ============================================
// MIETOBJEKT (§1)
// ============================================
export interface Mietobjekt {
  // Adresse
  strasse: string;
  hausnummer: string;
  wohnungsnummer?: string;
  plz: string;
  ort: string;
  geschoss: string; // "EG", "1.OG", "2.OG", "DG"
  lage?: string; // "links", "rechts"
  
  // Räume (nach Haus & Grund Vorlage)
  zimmeranzahl: number;
  hatKueche: boolean;
  hatKochnische: boolean;
  hatBalkon: boolean;
  hatTerrasse: boolean;
  hatDiele: boolean;
  hatBad: boolean;
  hatDusche: boolean;
  hatWcRaum: boolean;
  hatBoden: boolean;
  hatKeller: boolean;
  wohnflaeche: number;
  raeumeSonstiges?: string;
  
  // Zusätzliche Mietobjekte
  hatCarport: boolean;
  hatGarage: boolean;
  hatStellplatz: boolean;
  stellplatzNummer?: string;
  hatGarten: boolean;
  gartenBeschreibung?: string;
  gemeinschaftseinrichtungen?: string;
  
  // Schlüssel
  schluessel: {
    schliessanlage: number;
    haus: number;
    wohnung: number;
    briefkasten: number;
    sonstige?: string;
  };
}

// ============================================
// MIETZEIT (§2)
// ============================================
export interface Mietzeit {
  mietbeginn: string;
  befristet: boolean;
  mietende?: string;
  befristungsgrund?: string; // PFLICHT bei befristet (§575 BGB)
}

// ============================================
// MIETE (§5)
// ============================================
export interface Miete {
  grundmieteWohnung: number;
  grundmieteGarage: number;
  grundmieteSonstiges: number;
  grundmieteSonstigesBeschreibung?: string;
  grundmieteGesamt: number; // computed
  
  nebenkostenVorauszahlung: number;
  gesamtmiete: number; // computed
}

// ============================================
// BETRIEBSKOSTEN (§5.2) - 26 Positionen + Sonstige
// ============================================
export type Abrechnungsschluessel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '';

export const ABRECHNUNGSSCHLUESSEL_LABELS: Record<string, string> = {
  '1': 'nach Wohnfläche',
  '2': 'nach Personen',
  '3': 'nach Einheiten',
  '4': 'nach Verbrauch/Zählerständen',
  '5': 'nach Heizkostenverordnung',
  '6': 'nach Miteigentumsanteilen (WEG)',
  '7': 'nach Bescheid/Rechnung',
  '8': 'direkte Abrechnung Mieter/Versorger',
  '9': 'in Eigenleistung vom Mieter',
};

export interface BetriebskostenPosition {
  aktiv: boolean;
  schluessel: Abrechnungsschluessel;
}

export interface Betriebskosten {
  heizung: BetriebskostenPosition;
  schornsteinreinigung: BetriebskostenPosition;
  warmwasser: BetriebskostenPosition;
  wartungGasgeraete: BetriebskostenPosition;
  wasserAbwasser: BetriebskostenPosition;
  niederschlagswasser: BetriebskostenPosition;
  muellbeseitigung: BetriebskostenPosition;
  grundsteuer: BetriebskostenPosition;
  deichverband: BetriebskostenPosition;
  feuerstaettenschau: BetriebskostenPosition;
  versicherung: BetriebskostenPosition;
  beleuchtung: BetriebskostenPosition;
  gemeinschaftsstrom: BetriebskostenPosition;
  antenneBreitband: BetriebskostenPosition;
  gebaeudereinigung: BetriebskostenPosition;
  ungezieferbekaempfung: BetriebskostenPosition;
  gehwegreinigung: BetriebskostenPosition;
  strassenreinigung: BetriebskostenPosition;
  gartenpflege: BetriebskostenPosition;
  hauswart: BetriebskostenPosition;
  aufzug: BetriebskostenPosition;
  rauchwarnmelder: BetriebskostenPosition;
  hebeanlage: BetriebskostenPosition;
  lueftungsanlage: BetriebskostenPosition;
  dachrinnenreinigung: BetriebskostenPosition;
  legionellenpruefung: BetriebskostenPosition;
  sonstige: Array<{
    bezeichnung: string;
    schluessel: Abrechnungsschluessel;
  }>;
}

export const BETRIEBSKOSTEN_LABELS: Record<keyof Omit<Betriebskosten, 'sonstige'>, string> = {
  heizung: 'a) Heizung',
  schornsteinreinigung: 'b) Schornsteinreinigung/Emissionsmessung',
  warmwasser: 'c) Kosten der Warmwasserversorgung',
  wartungGasgeraete: 'd) Wartung Gasgeräte/Ölheizung/Wärmepumpe',
  wasserAbwasser: 'e) Wasserversorgungs-/Entwässerungskosten',
  niederschlagswasser: 'f) Niederschlagswassergebühren',
  muellbeseitigung: 'g) Müllbeseitigung',
  grundsteuer: 'h) Grundsteuer',
  deichverband: 'i) Deich- und andere Zweckverbandsbeiträge',
  feuerstaettenschau: 'j) Kosten der Feuerstättenschau',
  versicherung: 'k) Sach- und Haftpflichtversicherung',
  beleuchtung: 'l) Kosten der Beleuchtung',
  gemeinschaftsstrom: 'm) Gemeinschaftsstrom',
  antenneBreitband: 'n) Antennenanlage/Breitbandnetz/Glasfaser',
  gebaeudereinigung: 'o) Gebäudereinigung',
  ungezieferbekaempfung: 'p) Ungezieferbekämpfung',
  gehwegreinigung: 'q) Private Gehwegreinigung',
  strassenreinigung: 'r) Öffentliche Straßenreinigung',
  gartenpflege: 's) Gartenpflege',
  hauswart: 't) Hauswart',
  aufzug: 'u) Aufzugsanlage',
  rauchwarnmelder: 'v) Wartung Rauchwarnmelder',
  hebeanlage: 'w) Wartung Hebeanlage/Rückstausicherung',
  lueftungsanlage: 'x) Wartung Lüftungsanlage',
  dachrinnenreinigung: 'y) Dachrinnenreinigung',
  legionellenpruefung: 'z) Legionellenprüfung',
};

// ============================================
// STAFFELMIETE (§6) oder INDEXMIETE (§7)
// ============================================
export type MieterhoehungTyp = 'keine' | 'staffel' | 'index';

export interface Staffel {
  datum: string;
  betrag: number;
}

export interface Mieterhoehung {
  typ: MieterhoehungTyp;
  staffeln: Staffel[]; // max 9
  indexStart?: string; // Monat/Jahr
  indexSchwelle: number; // default 3%
}

// ============================================
// BANKVERBINDUNG (§8)
// ============================================
export interface Bankverbindung {
  iban: string;
  bic: string;
  kontoinhaber: string;
}

// ============================================
// HEIZUNG (§9)
// ============================================
export interface Heizung {
  art: string; // "Zentralheizung (Gas)", "Fernwärme", etc.
  heizperiodeVon: string; // "01.10"
  heizperiodeBis: string; // "30.04"
  heizzeitVon: string; // "06:00"
  heizzeitBis: string; // "22:00"
}

// ============================================
// KLEINREPARATUREN (§14)
// ============================================
export interface Kleinreparaturen {
  aktiv: boolean;
  maxEinzel: number; // default 100€
  maxJahr: number; // default 450€
}

// ============================================
// SCHÖNHEITSREPARATUREN (§15)
// ============================================
export interface Schoenheitsreparaturen {
  uebergabeRenoviert: boolean;
  mieterPflicht: boolean;
}

// ============================================
// KAUTION (§20)
// ============================================
export type KautionZahlungsart = 'ueberweisung' | 'bar' | 'buergschaft' | 'kautionskonto' | 'ratenzahlung' | '';

export interface Kaution {
  betrag: number; // max 3 Monatsgrundmieten!
  zahlungsart: KautionZahlungsart;
}

// ============================================
// SONSTIGE VEREINBARUNGEN (§21)
// ============================================
export interface SonstigeVereinbarungen {
  text: string;
}

// ============================================
// UNTERSCHRIFTEN
// ============================================
export interface Unterschriften {
  ort: string;
  datum: string;
  vermieterSignatur?: string; // base64
  mieterSignaturen: string[]; // base64 array
}

// ============================================
// KOMPLETT: MIETVERTRAG
// ============================================
export interface Mietvertrag {
  id: string;
  
  // Benutzerdefinierter Name
  bezeichnung?: string;
  
  // Step 1
  vertragsart: Vertragsart;
  
  // Step 2
  vermieter: Vermieter;
  
  // Step 3
  mieter: Mieter[]; // 1-3 Personen
  
  // Step 4
  mietobjekt: Mietobjekt;
  
  // Step 5
  mietzeit: Mietzeit;
  
  // Step 6
  miete: Miete;
  
  // Step 7
  betriebskosten: Betriebskosten;
  
  // Step 8
  mieterhoehung: Mieterhoehung;
  bankverbindung: Bankverbindung;
  
  // Step 9
  heizung: Heizung;
  kleinreparaturen: Kleinreparaturen;
  schoenheitsreparaturen: Schoenheitsreparaturen;
  sonstigeVereinbarungen: SonstigeVereinbarungen;
  
  // Step 10
  kaution: Kaution;
  unterschriften: Unterschriften;
  
  // Meta
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WIZARD STEPS
// ============================================
export interface WizardStep {
  id: number;
  key: string;
  title: string;
  shortTitle: string;
  description: string;
}

// Wohnraum-Steps (10)
export const WIZARD_STEPS: WizardStep[] = [
  { id: 1, key: 'vertragsart', title: 'Vertragsart', shortTitle: 'Art', description: 'Art des Mietvertrags wählen' },
  { id: 2, key: 'vermieter', title: 'Vermieter', shortTitle: 'Vermieter', description: 'Ihre Daten als Vermieter' },
  { id: 3, key: 'mieter', title: 'Mieter', shortTitle: 'Mieter', description: 'Daten der Mietpartei (1-3 Personen)' },
  { id: 4, key: 'mietobjekt', title: 'Mietobjekt', shortTitle: 'Objekt', description: 'Adresse, Räume, Schlüssel' },
  { id: 5, key: 'mietzeit', title: 'Mietzeit', shortTitle: 'Zeit', description: 'Beginn und Laufzeit' },
  { id: 6, key: 'miete', title: 'Miete', shortTitle: 'Miete', description: 'Grundmiete und Vorauszahlungen' },
  { id: 7, key: 'betriebskosten', title: 'Betriebskosten', shortTitle: 'BK', description: 'Umlagefähige Kosten (26 Positionen)' },
  { id: 8, key: 'zahlungMieterhoehung', title: 'Zahlung & Erhöhung', shortTitle: 'Bank', description: 'Bankdaten, Staffel-/Indexmiete' },
  { id: 9, key: 'optionen', title: 'Optionen', shortTitle: 'Optionen', description: 'Heizung, Reparaturen, Sonstiges' },
  { id: 10, key: 'abschluss', title: 'Abschluss', shortTitle: 'Fertig', description: 'Kaution, Vorschau & Unterschrift' },
];

// Gewerbe-Steps (9)
export const WIZARD_STEPS_GEWERBE: WizardStep[] = [
  { id: 1, key: 'vertragsart', title: 'Vertragsart', shortTitle: 'Art', description: 'Art des Mietvertrags wählen' },
  { id: 2, key: 'vermieter', title: 'Vermieter', shortTitle: 'Vermieter', description: 'Ihre Daten als Vermieter' },
  { id: 3, key: 'mieter', title: 'Mieter/Firma', shortTitle: 'Firma', description: 'Daten des Gewerbemieters (Firma)' },
  { id: 4, key: 'mietobjekt', title: 'Gewerbeobjekt', shortTitle: 'Objekt', description: 'Adresse, Flächen, Nutzungszweck' },
  { id: 5, key: 'mietzeit', title: 'Vertragslaufzeit', shortTitle: 'Zeit', description: 'Laufzeit, Optionen, Kündigung' },
  { id: 6, key: 'miete', title: 'Miete', shortTitle: 'Miete', description: 'Grundmiete (netto), USt, Nebenkosten' },
  { id: 7, key: 'pflichten', title: 'Pflichten', shortTitle: 'Pflichten', description: 'Instandhaltung, Nutzung, Konkurrenzschutz' },
  { id: 8, key: 'sonstiges', title: 'Sonstiges', shortTitle: 'Extras', description: 'Bankdaten, Kaution, Sondervereinbarungen' },
  { id: 9, key: 'abschluss', title: 'Abschluss', shortTitle: 'Fertig', description: 'Zusammenfassung & Unterschriften' },
];

// Garage-Steps (5) - Kompakt
export const WIZARD_STEPS_GARAGE: WizardStep[] = [
  { id: 1, key: 'vertragsart', title: 'Vertragsart', shortTitle: 'Art', description: 'Art des Mietvertrags wählen' },
  { id: 2, key: 'parteien', title: 'Vertragsparteien', shortTitle: 'Parteien', description: 'Vermieter und Mieter' },
  { id: 3, key: 'garage', title: 'Garage/Stellplatz', shortTitle: 'Objekt', description: 'Art, Adresse, Nummer' },
  { id: 4, key: 'konditionen', title: 'Konditionen', shortTitle: 'Miete', description: 'Miete, Kaution, Kündigungsfrist' },
  { id: 5, key: 'abschluss', title: 'Abschluss', shortTitle: 'Fertig', description: 'Zusammenfassung & Unterschrift' },
];

// Helper: Get steps for contract type
export function getWizardSteps(vertragsart: Vertragsart): WizardStep[] {
  switch (vertragsart) {
    case 'gewerbe':
      return WIZARD_STEPS_GEWERBE;
    case 'garage':
      return WIZARD_STEPS_GARAGE;
    default:
      return WIZARD_STEPS;
  }
}

// ============================================
// GESCHOSS OPTIONS
// ============================================
export const GESCHOSS_OPTIONS = [
  { value: 'UG', label: 'Untergeschoss' },
  { value: 'EG', label: 'Erdgeschoss' },
  { value: '1.OG', label: '1. Obergeschoss' },
  { value: '2.OG', label: '2. Obergeschoss' },
  { value: '3.OG', label: '3. Obergeschoss' },
  { value: '4.OG', label: '4. Obergeschoss' },
  { value: '5.OG', label: '5. Obergeschoss' },
  { value: 'DG', label: 'Dachgeschoss' },
];

// ============================================
// KAUTION ZAHLUNGSART OPTIONS
// ============================================
export const KAUTION_ZAHLUNGSART_OPTIONS = [
  { value: 'ueberweisung', label: 'Überweisung' },
  { value: 'bar', label: 'Barzahlung' },
  { value: 'buergschaft', label: 'Bürgschaft' },
  { value: 'kautionskonto', label: 'Kautionskonto/Sparbuch' },
  { value: 'ratenzahlung', label: 'Ratenzahlung (3 Raten)' },
];

// ============================================
// GEWERBE OPTIONS
// ============================================
export const RECHTSFORM_OPTIONS = [
  { value: 'einzelunternehmen', label: 'Einzelunternehmen' },
  { value: 'gbr', label: 'GbR (Gesellschaft bürgerlichen Rechts)' },
  { value: 'ohg', label: 'OHG (Offene Handelsgesellschaft)' },
  { value: 'kg', label: 'KG (Kommanditgesellschaft)' },
  { value: 'gmbh', label: 'GmbH' },
  { value: 'ug', label: 'UG (haftungsbeschränkt)' },
  { value: 'ag', label: 'AG (Aktiengesellschaft)' },
  { value: 'ev', label: 'e.V. (eingetragener Verein)' },
  { value: 'sonstige', label: 'Sonstige' },
];

export const NUTZUNGSZWECK_OPTIONS = [
  { value: 'buero', label: 'Büro' },
  { value: 'praxis', label: 'Praxis (Arzt, Rechtsanwalt, etc.)' },
  { value: 'einzelhandel', label: 'Einzelhandel / Laden' },
  { value: 'gastronomie', label: 'Gastronomie' },
  { value: 'lager', label: 'Lager / Logistik' },
  { value: 'werkstatt', label: 'Werkstatt / Produktion' },
  { value: 'sonstige', label: 'Sonstige' },
];

// ============================================
// GARAGE OPTIONS
// ============================================
export const GARAGEN_ART_OPTIONS = [
  { value: 'garage', label: 'Einzelgarage' },
  { value: 'tiefgarage', label: 'Tiefgaragenstellplatz' },
  { value: 'carport', label: 'Carport' },
  { value: 'stellplatz', label: 'Stellplatz (Freifläche)' },
];

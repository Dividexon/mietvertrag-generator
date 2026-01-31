// LocalStorage Service für Mietverträge
// Später einfach auf Supabase umstellbar

import type { Mietvertrag } from '../types';

const STORAGE_KEY = 'mietvertraege';

export interface StoredVertrag {
  id: string;
  bezeichnung: string;
  adresse: string;
  mieter: string;
  gesamtmiete: number;
  vertragsart: string;
  createdAt: string;
  updatedAt: string;
  data: Mietvertrag;
}

// Alle Verträge laden
export function getAllVertraege(): StoredVertrag[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Fehler beim Laden der Verträge:', error);
    return [];
  }
}

// Einzelnen Vertrag laden
export function getVertrag(id: string): StoredVertrag | null {
  const all = getAllVertraege();
  return all.find(v => v.id === id) || null;
}

// Vertrag speichern (neu oder update)
export function saveVertrag(vertrag: Mietvertrag): StoredVertrag {
  const all = getAllVertraege();
  
  const stored: StoredVertrag = {
    id: vertrag.id,
    bezeichnung: generateBezeichnung(vertrag),
    adresse: `${vertrag.mietobjekt.strasse} ${vertrag.mietobjekt.hausnummer}, ${vertrag.mietobjekt.plz} ${vertrag.mietobjekt.ort}`,
    mieter: vertrag.mieter.map(m => `${m.vorname} ${m.nachname}`).join(', ') || 'Kein Mieter',
    gesamtmiete: vertrag.miete.gesamtmiete,
    vertragsart: vertrag.vertragsart,
    createdAt: vertrag.createdAt,
    updatedAt: new Date().toISOString(),
    data: { ...vertrag, updatedAt: new Date().toISOString() },
  };
  
  const existingIndex = all.findIndex(v => v.id === vertrag.id);
  if (existingIndex >= 0) {
    all[existingIndex] = stored;
  } else {
    all.unshift(stored); // Neueste zuerst
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return stored;
}

// Vertrag löschen
export function deleteVertrag(id: string): boolean {
  const all = getAllVertraege();
  const filtered = all.filter(v => v.id !== id);
  
  if (filtered.length === all.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Verträge suchen
export function searchVertraege(query: string): StoredVertrag[] {
  const all = getAllVertraege();
  if (!query.trim()) return all;
  
  const lowerQuery = query.toLowerCase();
  return all.filter(v => 
    v.bezeichnung.toLowerCase().includes(lowerQuery) ||
    v.adresse.toLowerCase().includes(lowerQuery) ||
    v.mieter.toLowerCase().includes(lowerQuery)
  );
}

// Bezeichnung generieren
function generateBezeichnung(vertrag: Mietvertrag): string {
  // Wenn benutzerdefinierte Bezeichnung vorhanden, diese nutzen
  if (vertrag.bezeichnung?.trim()) {
    return vertrag.bezeichnung.trim();
  }
  
  const { mietobjekt, vertragsart } = vertrag;
  
  if (!mietobjekt.strasse) {
    return vertragsart === 'wohnraum' ? 'Neuer Wohnraum-Mietvertrag' :
           vertragsart === 'gewerbe' ? 'Neuer Gewerbe-Mietvertrag' :
           vertragsart === 'garage' ? 'Neuer Garagenmietvertrag' :
           'Neuer Mietvertrag';
  }
  
  const art = vertragsart === 'wohnraum' ? 'Wohnung' :
              vertragsart === 'gewerbe' ? 'Gewerbe' :
              vertragsart === 'garage' ? 'Garage' : '';
  
  return `${art} ${mietobjekt.strasse} ${mietobjekt.hausnummer}`.trim();
}

// Vertrag duplizieren
export function duplicateVertrag(id: string, newBezeichnung?: string): StoredVertrag | null {
  const original = getVertrag(id);
  if (!original) return null;
  
  const newVertrag: Mietvertrag = {
    ...original.data,
    id: crypto.randomUUID(),
    bezeichnung: newBezeichnung || `${original.bezeichnung} (Kopie)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return saveVertrag(newVertrag);
}

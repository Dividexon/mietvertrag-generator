# Mietvertrag Generator - Update 30.01.2026

## Zusammenfassung der Änderungen

### ✅ Erledigt

#### 1. Betriebskosten-Formular (NEU)
- Neuer Step 7 im Wizard: "Betriebskosten"
- Alle 26 Positionen gemäß Spec implementiert:
  - Heizung, Schornsteinreinigung, Warmwasser, Wartung Einzelheizung
  - Wasser/Entwässerung, Niederschlagswasser, Müllbeseitigung
  - Grundsteuer, Deichverbände, Feuerstättenschau
  - Versicherung, Beleuchtung, Gemeinschaftsstrom
  - Antenne/Breitband, Gebäudereinigung, Ungezieferbekämpfung
  - Gehwegreinigung, Straßenreinigung, Gartenpflege
  - Hauswart, Aufzug, Rauchwarnmelder
  - Hebeanlage, Lüftungsanlage, Dachrinnenreinigung
  - Legionellenprüfung, Sonstige (mit Freitext)
- Abrechnungsschlüssel 1-9 für jede Position wählbar
- Schnellauswahl-Buttons: "Standard-Auswahl", "Alle aktivieren", "Alle deaktivieren"

#### 2. PDF-Generierung (Überarbeitet)
- **Puppeteer entfernt** (funktionierte nicht auf Vercel)
- **Neue Lösung: Browser-Druck** (`window.print()`)
- Print-optimierte CSS-Styles für DIN A4
- Vollständige Druckansicht mit allen Vertragsdetails:
  - §1 Vertragsparteien (Vermieter + Mieter)
  - §2 Mieträume (Objekt, Räume, Ausstattung)
  - §3 Mietzeit (Beginn, Befristung)
  - §5 Miete (Grundmiete, Nebenkosten, Gesamtmiete)
  - §8 Zahlung (Bankverbindung)
  - §20 Mietsicherheit (Kaution)
  - Weitere Vereinbarungen (Staffel-/Indexmiete, Kleinreparaturen)
  - Unterschriftenfelder mit Signatur-Bildern
- **Anleitung:** Im Druckdialog "Als PDF speichern" wählen

#### 3. Formular-Validierung (NEU)
- Validierung aller Pflichtfelder vor dem nächsten Step
- Klare Fehlermeldungen auf Deutsch
- Validierte Felder:
  - Vermieter: Name, Straße, PLZ (5 Stellen), Ort
  - Mieter: Vorname, Nachname, Geburtsdatum, Adresse (alle Mieter)
  - Objekt: Straße, PLZ, Ort, Geschoss, Zimmeranzahl
  - Mietzeit: Beginn (+ Ende & Grund bei Befristung)
  - Miete: Grundmiete, Nebenkosten, IBAN, Kontoinhaber
  - Kaution: Betrag + Max-Prüfung (3 Kaltmieten)
  - Unterschrift: Ort, Datum
- Fehler werden rot hervorgehoben, Scroll zum Fehler

#### 4. Wizard auf 11 Steps erweitert
1. Vertragsart
2. Vermieter
3. Mieter (1-3 Personen)
4. Objekt & Räume
5. Schlüssel
6. Mietzeit
7. **Betriebskosten (NEU)**
8. Kaution
9. Optionen (Staffel/Index, Kleinrep., etc.)
10. Sonstiges
11. Unterschrift

#### 5. Code-Bereinigung
- Puppeteer + Handlebars Abhängigkeiten entfernt
- Bundle-Größe reduziert
- API-Route gibt hilfreiche Fehlermeldung zurück

### 📋 Vorhandene Features (bereits implementiert)

- ✅ Vermieter-Formular (Name, Adresse, Kontakt, Vertreter)
- ✅ Mieter-Formular (1-3 Personen, alle Felder)
- ✅ Objekt-Formular (12+ Räume-Checkboxen, Wohnfläche)
- ✅ Schlüssel-Formular (5 Typen)
- ✅ Mietzeit-Formular (Unbefristet/Befristet mit §575 BGB)
- ✅ Miete-Formular (Grundmiete Wohnung + Stellplatz, Nebenkosten, Bank)
- ✅ Kaution-Formular (Betrag + 5 Zahlungsarten)
- ✅ Optionen-Formular (Staffelmiete 9 Staffeln, Indexmiete, Kleinrep., Schönheitsrep., Heizung, Haustiere)
- ✅ Sonstiges-Formular (Freitext)
- ✅ Unterschrift-Formular (Ort, Datum, Signature Pads für alle)
- ✅ Vorschau-Seite mit Zusammenfassung
- ✅ Dark/Light Mode
- ✅ Mobile Responsive (Tailwind CSS)

### 🔗 Links

- **Live:** https://mietvertrag-generator.vercel.app
- **GitHub:** https://github.com/Dividexon/mietvertrag-generator
- **Spec:** docs/MIETVERTRAG-SPEC.md

### 🚀 Deployment

Vercel deployed automatisch bei Push auf `main`.
Letzter erfolgreicher Build: 30.01.2026

---

*Aktualisiert: 30.01.2026*

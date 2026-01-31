# Mietvertrag Generator - Vollständige Spezifikation

Basierend auf: **Haus & Grund Bremen Mietvertrag für Wohnraum**

---

## Checkliste: Alle auszufüllenden Felder

### 1. Vertragsparteien

**Vermieter:**
- [ ] Name / Firma
- [ ] Straße
- [ ] PLZ, Ort
- [ ] ggf. "vertreten durch ..."

**Mieter (bis zu 3 Personen):**
- [ ] Vor- und Zuname
- [ ] Geburtsdatum
- [ ] Straße
- [ ] PLZ, Ort

---

### 2. Mietobjekt und Ausstattung

**Objektadresse:**
- [ ] Anschrift (Straße, PLZ, Ort)
- [ ] ggf. Wohnungs-/Einheitsnummer
- [ ] Geschoss (z.B. "2. OG")

**Räume (Ankreuzen):**
- [ ] Anzahl Zimmer
- [ ] Küche / Kochnische
- [ ] Balkon / Terrasse
- [ ] Diele
- [ ] Bad / Dusche
- [ ] WC-Raum
- [ ] Boden
- [ ] Keller

**Zusätzlich vermietet:**
- [ ] Carport / Garage / PKW-Stellplatz
- [ ] Garten

**Sonstiges:**
- [ ] Gemeinschaftseinrichtungen (Freitext)
- [ ] Schlüssel: Anzahl & Art (Schließanlage, Haus, Wohnung, Briefkasten, Sonstige)

---

### 3. Mietzeit

**Unbefristet:**
- [ ] Mietbeginn (Datum)

**Befristet (§575 BGB):**
- [ ] Befristungsgrund (Pflicht!)
- [ ] Beginn-Datum
- [ ] End-Datum

---

### 4. Miete, Nebenkosten, Zahlung

**Grundmiete:**
- [ ] Wohnraum (EUR)
- [ ] Stellplatz/Garage/Carport (EUR)
- [ ] Summe Grundmiete

**Betriebskosten:**
- [ ] Pro Kostenart: aktiv ja/nein + Abrechnungsschlüssel
- [ ] Monatliche Vorauszahlung (EUR)
- [ ] → Gesamtsumme Miete monatlich

**Staffelmiete (optional):**
- [ ] Je Staffel: Datum + Erhöhungsbetrag

**Indexmiete (optional):**
- [ ] Start ab Monat/Jahr

**Zahlungskonto:**
- [ ] IBAN
- [ ] BIC
- [ ] Kontoinhaber

---

### 5. Sonstiges, Kaution, Unterschriften

**Heizung:**
- [ ] Technische Besonderheiten / Art der Heizung (Freitext)

**Kleinreparaturen:**
- [ ] Max.-Betrag pro Reparaturfall (default: 100€)
- [ ] Höchstbetrag pro Kalenderjahr (default: 450€)

**Mietsicherheit/Kaution:**
- [ ] Höhe (max. 3 Monatsgrundmieten)
- [ ] Zahlungsart (z.B. Überweisung)

**Sonstige Vereinbarungen:**
- [ ] Freitextfeld

**Unterschriften:**
- [ ] Ort
- [ ] Datum
- [ ] Unterschrift Vermieter
- [ ] Unterschrift Mieter (ggf. mehrere)

**Datenschutz-Anlage:**
- [ ] Name/Kontaktdaten Verantwortlicher
- [ ] ggf. Datenschutzbeauftragter

---

## Technische Spezifikation

### 1. Vertragsparteien

#### 1.1 Vermieter
| Feld | Typ | Pflicht | Aktuell |
|------|-----|---------|---------|
| `vermieterName` | text | ✅ | ✅ |
| `vermieterStrasse` | text | ✅ | ✅ |
| `vermieterPlz` | text | ✅ | ✅ |
| `vermieterOrt` | text | ✅ | ✅ |
| `vermieterTelefon` | tel | ❌ | ✅ |
| `vermieterEmail` | email | ❌ | ✅ |
| `vermieterVertreter` | text | ❌ | 🔴 NEU |

#### 1.2 Mieter (bis zu 3 Personen)
| Feld | Typ | Pflicht | Aktuell |
|------|-----|---------|---------|
| `mieter[].vorname` | text | ✅ | 🔴 (nur 1 Name) |
| `mieter[].nachname` | text | ✅ | 🔴 |
| `mieter[].geburtsdatum` | date | ✅ | ✅ |
| `mieter[].strasse` | text | ✅ | ✅ |
| `mieter[].plz` | text | ✅ | 🔴 |
| `mieter[].ort` | text | ✅ | 🔴 |
| `mieter[].telefon` | tel | ❌ | ✅ |
| `mieter[].email` | email | ❌ | ✅ |

**Wichtig:** Der Vertrag unterstützt bis zu **3 Mieter** als Gesamtschuldner (§19).

---

## 2. §1 Mieträume

### 2.1 Objektadresse
| Feld | Typ | Pflicht | Aktuell |
|------|-----|---------|---------|
| `objektStrasse` | text | ✅ | ✅ |
| `objektPlz` | text | ✅ | ✅ |
| `objektOrt` | text | ✅ | ✅ |
| `objektGeschoss` | text | ✅ | ✅ (Etage) |

### 2.2 Räume (Checkboxen)
| Feld | Typ | Default | Aktuell |
|------|-----|---------|---------|
| `anzahlZimmer` | number | - | ✅ |
| `hatKueche` | boolean | false | 🔴 NEU |
| `hatKochnische` | boolean | false | 🔴 NEU |
| `hatBalkon` | boolean | false | ✅ |
| `hatTerrasse` | boolean | false | 🔴 NEU |
| `hatDiele` | boolean | false | 🔴 NEU |
| `hatBad` | boolean | false | 🔴 NEU |
| `hatDusche` | boolean | false | 🔴 NEU |
| `hatWcRaum` | boolean | false | 🔴 NEU |
| `hatBoden` | boolean | false | 🔴 NEU |
| `hatKeller` | boolean | false | ✅ |
| `objektWohnflaeche` | number | - | ✅ |
| `raeumeSonstiges` | text | - | 🔴 NEU |

### 2.3 Zusätzliche Mietobjekte
| Feld | Typ | Aktuell |
|------|-----|---------|
| `hatCarport` | boolean | 🔴 NEU |
| `hatGarage` | boolean | 🔴 NEU |
| `hatStellplatz` | boolean | ✅ |
| `stellplatzNummer` | text | 🔴 NEU |
| `hatGarten` | boolean | 🔴 NEU |
| `gartenBeschreibung` | text | 🔴 NEU |
| `gemeinschaftseinrichtungen` | text | 🔴 NEU |

### 2.4 Schlüssel
| Feld | Typ | Aktuell |
|------|-----|---------|
| `schluesselSchliessanlage` | number | 🔴 NEU |
| `schluesselHaus` | number | 🔴 NEU |
| `schluesselWohnung` | number | 🔴 NEU |
| `schluesselBriefkasten` | number | 🔴 NEU |
| `schluesselSonstige` | text | 🔴 NEU |

---

## 3. §2 Mietzeit

| Feld | Typ | Pflicht | Aktuell |
|------|-----|---------|---------|
| `mietbeginn` | date | ✅ | ✅ |
| `befristet` | boolean | ❌ | ✅ |
| `befristetBis` | date | wenn befristet | ✅ |
| `befristungsgrund` | text | wenn befristet | 🔴 NEU |

**Befristungsgründe (§575 BGB):**
- Eigenbedarf nach Mietende
- Wesentliche Veränderung/Abriss geplant
- Werkswohnung für Dienstleister

---

## 4. §5 Miete

### 4.1 Grundmiete
| Feld | Typ | Aktuell |
|------|-----|---------|
| `grundmieteWohnung` | number (EUR) | ✅ (kaltmiete) |
| `grundmieteGarage` | number (EUR) | 🔴 NEU |
| `grundmieteSonstiges` | number (EUR) | 🔴 NEU |
| `grundmieteSonstigesBeschreibung` | text | 🔴 NEU |
| **`grundmieteGesamt`** | computed | 🔴 NEU |

### 4.2 Betriebskosten (mit Abrechnungsschlüssel)

Jede Position hat: `{ aktiv: boolean, schluessel: 1-9 }`

| Position | Feld | Aktuell |
|----------|------|---------|
| Heizung | `bkHeizung` | 🔴 NEU |
| Schornsteinreinigung | `bkSchornstein` | 🔴 NEU |
| Warmwasser | `bkWarmwasser` | 🔴 NEU |
| Wartung Einzelheizung | `bkWartungHeizung` | 🔴 NEU |
| Wasser/Entwässerung | `bkWasser` | 🔴 NEU |
| Niederschlagswasser | `bkNiederschlag` | 🔴 NEU |
| Müllbeseitigung | `bkMuell` | 🔴 NEU |
| Grundsteuer | `bkGrundsteuer` | 🔴 NEU |
| Deichverbände | `bkDeichverband` | 🔴 NEU |
| Feuerstättenschau | `bkFeuerstaette` | 🔴 NEU |
| Versicherung | `bkVersicherung` | 🔴 NEU |
| Beleuchtung | `bkBeleuchtung` | 🔴 NEU |
| Gemeinschaftsstrom | `bkGemeinschaftsstrom` | 🔴 NEU |
| Antenne/Breitband | `bkAntenne` | 🔴 NEU |
| Gebäudereinigung | `bkReinigung` | 🔴 NEU |
| Ungeziefer | `bkUngeziefer` | 🔴 NEU |
| Gehwegreinigung | `bkGehweg` | 🔴 NEU |
| Straßenreinigung | `bkStrasse` | 🔴 NEU |
| Gartenpflege | `bkGarten` | 🔴 NEU |
| Hauswart | `bkHauswart` | 🔴 NEU |
| Aufzug | `bkAufzug` | 🔴 NEU |
| Rauchwarnmelder | `bkRauchmelder` | 🔴 NEU |
| Hebeanlage | `bkHebeanlage` | 🔴 NEU |
| Lüftungsanlage | `bkLueftung` | 🔴 NEU |
| Dachrinnenreinigung | `bkDachrinne` | 🔴 NEU |
| Legionellenprüfung | `bkLegionellen` | 🔴 NEU |
| Sonstige | `bkSonstige` | 🔴 NEU |

**Abrechnungsschlüssel:**
| Code | Bedeutung |
|------|-----------|
| 1 | nach Wohnfläche |
| 2 | nach Personen |
| 3 | nach Einheiten |
| 4 | nach Verbrauch/Zählerständen |
| 5 | nach Heizkostenverordnung |
| 6 | nach Miteigentumsanteilen |
| 7 | nach Bescheid/Rechnung |
| 8 | direkte Abrechnung Mieter/Versorger |
| 9 | in Eigenleistung vom Mieter |

### 4.3 Vorauszahlungen
| Feld | Typ | Aktuell |
|------|-----|---------|
| `nebenkostenVorauszahlung` | number (EUR) | ✅ (nebenkosten) |
| **`gesamtmiete`** | computed | 🔴 NEU |

---

## 5. §6 Staffelmiete (Optional)

| Feld | Typ | Aktuell |
|------|-----|---------|
| `staffelmieteAktiv` | boolean | ✅ |
| `staffeln[]` | array (max 9) | 🔴 NEU |
| `staffeln[].datum` | date | 🔴 NEU |
| `staffeln[].betrag` | number (EUR) | 🔴 NEU |

**Hinweis:** Miete muss jeweils 12 Monate unverändert bleiben.

---

## 6. §7 Indexmiete (Optional)

| Feld | Typ | Aktuell |
|------|-----|---------|
| `indexmieteAktiv` | boolean | ✅ |
| `indexmieteStart` | month-year | 🔴 NEU |
| `indexmieteSchwelle` | number (%) | 🔴 NEU (default: 3) |

**Hinweis:** Staffelmiete und Indexmiete schließen sich gegenseitig aus!

---

## 7. §8 Fälligkeit & Bankdaten

| Feld | Typ | Pflicht | Aktuell |
|------|-----|---------|---------|
| `bankIban` | text | ✅ | 🔴 NEU |
| `bankBic` | text | ❌ | 🔴 NEU |
| `bankKontoinhaber` | text | ✅ | 🔴 NEU |

**Auto-Text:** Miete fällig bis 3. Werktag im Voraus.

---

## 8. §9 Heizung

| Feld | Typ | Aktuell |
|------|-----|---------|
| `heizungVon` | time | 🔴 NEU |
| `heizungBis` | time | 🔴 NEU |
| `heizungArt` | text | 🔴 NEU |

**Beispiele Heizungsart:**
- Zentralheizung (Gas)
- Zentralheizung (Öl)
- Fernwärme
- Wärmepumpe
- Etagenheizung
- Einzelöfen

---

## 9. §14 Kleinreparaturklausel

| Feld | Typ | Default | Aktuell |
|------|-----|---------|---------|
| `kleinreparaturEinzel` | number (EUR) | 100 | 🔴 NEU |
| `kleinreparaturJahr` | number (EUR) | 450 | 🔴 NEU |

**Hinweis:** Wird nur aktiv wenn Option gesetzt (✅ aktuell als Checkbox vorhanden).

---

## 10. §15 Schönheitsreparaturen

| Feld | Typ | Aktuell |
|------|-----|---------|
| `uebergabeRenoviert` | boolean | 🔴 NEU |
| `schoenheitsreparaturen` | boolean | ✅ |

**Wichtig:** Klausel nur wirksam wenn Wohnung **renoviert übergeben** wird!

---

## 11. §20 Mietsicherheit (Kaution)

| Feld | Typ | Aktuell |
|------|-----|---------|
| `kaution` | number (EUR) | ✅ |
| `kautionZahlungsart` | select | 🔴 NEU |

**Zahlungsarten:**
- Überweisung
- Bar
- Bürgschaft
- Kautionskonto
- Ratenzahlung (3 Raten)

**Validierung:** Max. 3 Nettokaltmieten!

---

## 12. §21 Sonstige Vereinbarungen

| Feld | Typ | Aktuell |
|------|-----|---------|
| `sonstigeVereinbarungen` | textarea | 🔴 NEU |

Freitext für individuelle Regelungen.

---

## 13. Unterschriften

| Feld | Typ | Aktuell |
|------|-----|---------|
| `unterschriftOrt` | text | 🔴 NEU |
| `unterschriftDatum` | date | 🔴 NEU |
| `unterschriftVermieter` | signature (base64) | 🔴 NEU |
| `unterschriftMieter1` | signature (base64) | 🔴 NEU |
| `unterschriftMieter2` | signature (base64) | 🔴 NEU |
| `unterschriftMieter3` | signature (base64) | 🔴 NEU |

**Signature Component:** Siehe `snippets/react-native-signature-pad.md`
Für Web: `react-signature-canvas` verwenden.

---

## 14. Anlagen

### 14.1 Hausordnung
Standardtext wird automatisch als Anlage angehängt.
Enthält:
- Lärmschutz & Ruhezeiten
- Sicherheitsregeln
- Reinigungspflichten
- Heizung/Lüftung
- Gemeinschaftseinrichtungen

### 14.2 Datenschutzhinweise
DSGVO-konformer Standardtext wird automatisch angehängt.

---

## Zusammenfassung: Was fehlt

### Kritisch (Kernfunktionalität)
- [ ] Mehrere Mieter (bis zu 3)
- [ ] Bankverbindung
- [ ] Schlüsselübergabe
- [ ] Detaillierte Räume (Bad, WC, Diele etc.)
- [ ] Unterschriftenfelder

### Wichtig (Vollständigkeit)
- [ ] Betriebskosten-Aufschlüsselung mit Abrechnungsschlüssel
- [ ] Staffelmiete mit Datums-Staffeln
- [ ] Indexmiete Konfiguration
- [ ] Heizungsdetails
- [ ] Kleinreparatur-Beträge
- [ ] Kaution-Zahlungsart
- [ ] Sonstige Vereinbarungen (Freitext)

### Nice-to-have
- [ ] Garage/Stellplatz separat ausweisen
- [ ] Garten-Nutzung Details
- [ ] Gemeinschaftseinrichtungen
- [ ] Befristungsgrund-Auswahl

---

## UI-Vorschlag: Steps (Web & App)

| Step | Sektion | Felder |
|------|---------|--------|
| 1 | **Vertragsart** | Wohnung / Gewerbe / Garage |
| 2 | **Vermieter** | Name, Adresse, Kontakt, ggf. Vertreter |
| 3 | **Mieter** | 1-3 Personen (Name, Geb., Adresse) |
| 4 | **Mietobjekt** | Adresse, Geschoss, Räume (Checkboxen), Wohnfläche |
| 5 | **Ausstattung** | Garage/Stellplatz, Garten, Gemeinschaft, Schlüssel |
| 6 | **Mietzeit** | Beginn, ggf. Befristung + Grund |
| 7 | **Miete** | Grundmiete (Wohnung + Garage), Betriebskosten-Vorauszahlung |
| 8 | **Betriebskosten** | 26 Positionen mit Abrechnungsschlüssel (optional detailliert) |
| 9 | **Staffel/Index** | Staffelmiete ODER Indexmiete (sich gegenseitig ausschließend) |
| 10 | **Zahlung** | IBAN, BIC, Kontoinhaber |
| 11 | **Optionen** | Heizung, Kleinrep., Schönheitsrep., Haustiere |
| 12 | **Kaution** | Höhe + Zahlungsart |
| 13 | **Sonstiges** | Freitext |
| 14 | **Vorschau** | PDF-Preview |
| 15 | **Unterschrift** | Ort, Datum, Digital-Signatur (Vermieter + Mieter) |

### Vereinfachte Version (MVP+)

Für schnellere Umsetzung können Steps 4+5 und 7+8+9 kombiniert werden:

| Step | Sektion |
|------|---------|
| 1 | Vertragsart |
| 2 | Vermieter |
| 3 | Mieter (1-3) |
| 4 | Mietobjekt & Ausstattung |
| 5 | Mietzeit |
| 6 | Miete & Nebenkosten |
| 7 | Optionen (Staffel/Index, Kleinrep., etc.) |
| 8 | Kaution & Bankdaten |
| 9 | Sonstiges |
| 10 | Vorschau & Unterschrift |

---

*Erstellt: 29.01.2026*
*Referenz: Haus & Grund Bremen Mietvertrag (Seriennummer: 051D6C4D)*

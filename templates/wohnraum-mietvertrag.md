# Wohnraum-Mietvertrag (Haus & Grund Bremen)

> Referenz-Template für den Mietvertrag-Generator
> Quelle: Haus & Grund Bremen GmbH

---

## Vertragsparteien

**Vermieter:**
- Name: `[VERMIETER_NAME]`
- Anschrift: `[VERMIETER_ADRESSE]`
- vertreten durch: `[VERTRETER]` (optional)

**Mieter:**
- Name, Geburtsdatum: `[MIETER_1_NAME]`, geb. `[MIETER_1_GEBURTSTAG]`
- Anschrift: `[MIETER_1_ADRESSE]`
- Weitere Mieter: `[MIETER_2_NAME]`, `[MIETER_3_NAME]` (optional)

> Der Mieter verpflichtet sich, auch bei unentgeltlicher dauerhafter Aufnahme von Familienangehörigen und/oder Lebenspartnern, dem Vermieter Namen und Geburtsdaten dieser Personen unaufgefordert mitzuteilen.

---

## §1 Mieträume

Vermietet wird zu Wohnzwecken die Wohnung / das Haus:

| Feld | Wert |
|------|------|
| Adresse | `[OBJEKT_ADRESSE]` |
| Geschoss | `[GESCHOSS]` |
| Zimmer | `[ANZAHL_ZIMMER]` |
| Küche/Kochnische | ☐ |
| Balkon/Terrasse | ☐ |
| Diele | ☐ |
| Bad/Dusche | ☐ |
| WC-Raum | ☐ |
| Boden | ☐ |
| Keller | ☐ |

**Ferner werden vermietet:**
- Carport/Garage/PKW-Stellplatz: `[STELLPLATZ]`
- Garten: ☐

**Gemeinschaftseinrichtungen:** `[GEMEINSCHAFT]`

**Schlüsselübergabe:**
| Typ | Anzahl |
|-----|--------|
| Schließanlagen | `[N]` |
| Haus | `[N]` |
| Wohnung | `[N]` |
| Briefkasten | `[N]` |
| Sonstige | `[N]` |

---

## §2 Mietzeit

### Option A: Unbestimmte Dauer
Das Mietverhältnis beginnt am `[MIETBEGINN]` und läuft auf unbestimmte Zeit.

### Option B: Bestimmte Dauer (gem. §575 BGB)
Das Mietverhältnis beginnt am `[MIETBEGINN]` und endet am `[MIETENDE]`.

**Befristungsgrund:** `[GRUND]`
- Eigennutzung durch Vermieter/Familie
- Wesentliche Veränderung/Instandsetzung
- Vermietung an Dienstleistungsverpflichteten

---

## §3 Kündigung des Vertrages

1. Kündigungsfrist Mieter: **3 Monate** zum Monatsende (bis 3. Werktag)
2. Kündigungsfrist Vermieter:
   - Bis 5 Jahre: 3 Monate
   - Nach 5 Jahren: 6 Monate
   - Nach 8 Jahren: 9 Monate
3. Bei selbstbewohntem 2-Familien-Haus: +3 Monate, ohne berechtigtes Interesse
4. §545 BGB wird ausgeschlossen (keine stillschweigende Verlängerung)

---

## §4 Fristlose Kündigung aus wichtigem Grund

Der Vermieter kann fristlos kündigen bei:
- Erheblicher Gefährdung der Mietsache durch Vernachlässigung
- Unbefugter Überlassung an Dritte
- **Mietrückstand von 2 Monaten** (aufeinanderfolgend oder kumuliert)
- Kautionsrückstand in Höhe von 2 Monatsmieten

---

## §5 Miete

### 5.1 Grundmiete

| Position | Betrag |
|----------|--------|
| a) Wohnraum | `[GRUNDMIETE]` € |
| b) Carport/Garage/Stellplatz | `[STELLPLATZ_MIETE]` € |
| c) Sonstiges | `[SONSTIGE_MIETE]` € |
| **Summe Grundmiete** | `[SUMME_GRUNDMIETE]` € |

### 5.2 Betriebskosten

| Nr. | Kostenart | Schlüssel |
|-----|-----------|-----------|
| a | Heizung | `[1-9]` |
| b | Schornsteinreinigung/Emissionsmessung | `[1-9]` |
| c | Warmwasserversorgung | `[1-9]` |
| d | Wartung Einzelversorgung (Gas/Öl/Wärmepumpe) | `[1-9]` |
| e | Wasserversorgung/Entwässerung | `[1-9]` |
| f | Niederschlagswassergebühren | `[1-9]` |
| g | Müllbeseitigung | `[1-9]` |
| h | Grundsteuer | `[1-9]` |
| i | Deich-/Zweckverbandsbeiträge | `[1-9]` |
| j | Feuerstättenschau | `[1-9]` |
| k | Sach- und Haftpflichtversicherung | `[1-9]` |
| l | Beleuchtung | `[1-9]` |
| m | Gemeinschaftsstrom | `[1-9]` |
| n | Antenne/Breitband/Glasfaser | `[1-9]` |
| o | Gebäudereinigung | `[1-9]` |
| p | Ungezieferbekämpfung | `[1-9]` |
| q | Private Gehwegreinigung | `[1-9]` |
| r | Öffentliche Straßenreinigung | `[1-9]` |
| s | Gartenpflege | `[1-9]` |
| t | Hauswart | `[1-9]` |
| u | Aufzugsanlage | `[1-9]` |
| v | Wartung Rauchwarnmelder | `[1-9]` |
| w | Wartung Hebeanlage/Rückstausicherung | `[1-9]` |
| x | Wartung Lüftungsanlage | `[1-9]` |
| y | Dachrinnenreinigung | `[1-9]` |
| z | Legionellenprüfung | `[1-9]` |

**Verteilerschlüssel:**
| Nr | Schlüssel |
|----|-----------|
| 1 | nach Wohnfläche |
| 2 | nach Personen |
| 3 | nach Einheiten |
| 4 | nach Verbrauch/Zählerständen |
| 5 | nach Heizkostenverordnung |
| 6 | nach Miteigentumsanteilen (WEG) |
| 7 | nach Bescheid/Rechnung |
| 8 | Direkte Abrechnung Mieter ↔ Versorger |
| 9 | Eigenleistung Mieter |

**Monatliche Vorauszahlung Betriebskosten:** `[BK_VORAUSZAHLUNG]` €

**Gesamtmiete monatlich:** `[GESAMTMIETE]` €

### 5.3-5.7 Abrechnungsregeln
- Jährliche Abrechnung innerhalb 12 Monate nach Abrechnungszeitraum
- Nachforderung nach Fristablauf ausgeschlossen (§556 Abs.3 BGB)
- Anpassung der Vorauszahlungen nach Abrechnung möglich
- Nachzahlung innerhalb 1 Monat nach Erhalt

---

## §6 Staffelmiete (optional)

| Nr. | Datum | Erhöhung |
|-----|-------|----------|
| 1 | `[DATUM]` | `[BETRAG]` € |
| 2 | `[DATUM]` | `[BETRAG]` € |
| ... | ... | ... |

> Miete muss jeweils mind. 12 Monate unverändert bleiben.

---

## §7 Indexmiete (optional)

Ab `[MONAT/JAHR]` wird Indexmiete vereinbart:
- Anpassung bei Änderung des Verbraucherpreisindex > **3%**
- Erklärung in Textform erforderlich
- Neue Miete ab übernächstem Monat nach Zugang

---

## §8 Fälligkeit der Miete

- Fällig: **Spätestens 3. Werktag** des Monats, im Voraus
- Verzugszinsen + Mahnkosten bei Verzug

**Bankverbindung:**
- IBAN: `[IBAN]`
- BIC: `[BIC]`
- Kontoinhaber: `[KONTOINHABER]`

---

## §9 Heizung

- Heizperiode: **1. Oktober - 30. April**
- Heizzeit: `[VON]` bis `[BIS]` Uhr
- Mindesttemperatur: **20°C** in Wohnräumen
- Art der Heizung: `[HEIZUNGSART]`

---

## §10 Wasserversorgung

- Warmwasser ganzjährig
- Verbrauchserfassung durch Messgeräte
- Kosten für Anmietung, Ablesung, Wartung, Eichung trägt Mieter

---

## §11 Benutzung der Mietsache

**Zustimmungspflichtig:**
- a) Untervermietung (auch unentgeltlich, außer Besuch)
- b) Gewerbliche Nutzung
- c) Schilder/Aufschriften am Haus
- d) Tierhaltung (außer Kleintiere)
- e) Antennen
- f) Andere Beheizungsart
- g) Um-/An-/Einbauten, Installationen
- h) Fahrzeuge außerhalb vorgesehener Plätze

---

## §12 Bauliche Veränderungen durch Vermieter

- Erhaltungsmaßnahmen jederzeit ohne Zustimmung
- Modernisierung: Ankündigung 3 Monate vorher (Art, Umfang, Dauer, Mieterhöhung)
- Mieter muss Zugang gewähren

---

## §13 Betreten der Mieträume

- Werktags bis 19 Uhr nach Terminvereinbarung
- Begründeter Anlass: Ablesen, Prüfung, Reparatur, Besichtigung
- Bei Abwesenheit: Mieter stellt Zugang sicher

---

## §14 Instandhaltung der Mietsache

1. Pflegliche Behandlung
2. Ausreichend heizen und lüften (Stoßlüftung 2-3x täglich)
3. Schäden unverzüglich anzeigen
4. **Kleinreparaturen:** Max. `[KLEINREP_EINZELN]` € pro Fall, max. `[KLEINREP_JAHR]` € pro Jahr
5. Balkone/Loggien reinigen, Abflüsse freihalten
6. Gartenpflege (falls übernommen): Rasenmähen, Heckenschneiden, Laub
7. Treppenhausreinigung, Schneebeseitigung (falls übernommen)

---

## §15 Schönheitsreparaturen

**Umfang:**
- Tapezieren/Anstreichen Wände & Decken
- Streichen: Heizkörper, Rohre, Innentüren, Außentüren (innen), Fenster (innen)
- Reinigen der Fußböden

**Pflicht:** Bei Übergabe im renovierten Zustand → Mieter führt laufende Schönheitsreparaturen durch

---

## §16 Hausordnung

Die anliegende Hausordnung ist Vertragsbestandteil.

---

## §17 Entschädigungspflicht nach Beendigung

- Bei verzögerter Räumung: Nutzungsentschädigung (mind. Höhe der Miete)
- Bei fristloser Kündigung: Mietausfallhaftung bis ordentliche Kündigungsfrist

---

## §18 Rückgabe der Mietsache

- Vollständig geräumt und gereinigt
- Alle Schlüssel zurückgeben (auch selbst beschaffte)
- Einrichtungen darf Mieter wegnehmen (Vermieter kann ablösen)
- Rückbau auf Verlangen

---

## §19 Personenmehrheit als Mieter

- Gesamtschuldnerische Haftung
- Gegenseitige Empfangsvollmacht (außer Kündigung durch Mieter)

---

## §20 Mietsicherheit (Kaution)

**Höhe:** `[KAUTION]` € (max. 3 Monatsgrundmieten)
**Zahlungsart:** `[ZAHLUNGSART]` (Überweisung / Ratenzahlung / Bürgschaft)

---

## §21 Sonstige Vereinbarungen

`[SONSTIGE_VEREINBARUNGEN]`

---

## §22 Datenschutz

- Erhebung personenbezogener Daten zur Vertragserfüllung
- Weitergabe an Messdienstfirmen, Abrechnungsunternehmen, Handwerker
- Speicherung bis 3 Jahre nach Vertragsende (Verjährungsfrist)

---

## §23 Salvatorische Klausel

Unwirksame Bestimmungen berühren nicht die Gültigkeit der übrigen.

---

## Unterschriften

| | Vermieter | Mieter |
|--|-----------|--------|
| Ort/Datum | `[ORT_DATUM]` | `[ORT_DATUM]` |
| Unterschrift | _____________ | _____________ |

---

# Anlage: Hausordnung

## I. Schutz vor Lärm
- **Ruhezeiten:** 13-15 Uhr, 22-07 Uhr, Sonn-/Feiertage bis 09 Uhr
- Zimmerlautstärke bei geöffneten Fenstern
- Kein Grillen auf Balkonen

## II. Sicherheit
- Haustür 22-06 Uhr geschlossen
- Fluchtwege freihalten (keine Fahrräder im Treppenhaus)
- Keine leicht entzündlichen Gegenstände lagern

## III. Gemeinschaftseinrichtungen
- Rücksichtnahme, bei Streit entscheidet Vermieter

## IV. Heizung/Lüftung
- Ganzjährig ausreichend heizen und lüften
- Nicht zum Treppenhaus hin lüften

## V. Reinigung
- Verunreinigungen sofort beseitigen
- Mülltrennung
- Reinigungspflicht je nach Stockwerk (falls in Eigenleistung)
- Bürgersteigreinigung + Winterdienst (EG-Bewohner)

---

*Stand: Januar 2026 | Haus & Grund Bremen*

# PDF-Generierung - Technische Anleitung

## Architektur

```
User-Eingabe (Formular)
    ↓
JSON-Objekt (Schema)
    ↓
Template-Engine (Handlebars) füllt HTML-Template
    ↓
Puppeteer rendert HTML zu PDF
    ↓
Download für Nutzer
```

## Layout-Spezifikation (Original)

| Eigenschaft | Wert |
|-------------|------|
| Papierformat | DIN A4 (210mm × 297mm) |
| Ränder | 20mm oben/unten, 15mm links/rechts |
| Schriftart | Arial |
| Schriftgrößen | 8pt (Fußnoten) - 11pt (Haupttext) - 14pt (Titel) |
| Kopfzeile | "Haus & Grund Bremen GmbH" + Seriennummer |
| Fußzeile | "Seite X von 10" |
| Sections | Nummerierte Paragraphen (§1, §2 ...) |

## Dependencies

```bash
npm install handlebars puppeteer
```

## Dateien

- `templates/mietvertrag-template.html` - HTML-Vorlage
- `lib/pdf-generator.js` - Generator-Logik
- `pages/api/generate-mietvertrag.js` - API-Route

## Wichtige Details

1. **Schriftarten:** Arial/Helvetica via @font-face laden
2. **Checkboxen:** Unicode-Symbole ☐ (leer) und ☑ (checked)
3. **Tabellen:** `border-collapse: collapse` + 1px solid
4. **Seitenzahlen:** Puppeteer's footerTemplate mit pageNumber/totalPages
5. **Mehrseitige Paragrafen:** Vollständigen Gesetzestext manuell einfügen

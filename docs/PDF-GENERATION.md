# PDF-Generierung - Technische Anleitung

## Architektur

```
User-Eingabe (Formular)
    ↓
TypeScript Mietvertrag-Objekt
    ↓
jsPDF Generator (src/utils/pdfGenerator.ts)
    ↓
PDF Download für Nutzer
```

## Layout-Spezifikation (Modern)

| Eigenschaft | Wert |
|-------------|------|
| Papierformat | DIN A4 (210mm × 297mm) |
| Ränder | 25mm oben/unten, 20mm links/rechts |
| Schriftart | Helvetica (PDF Standard) |
| Schriftgrößen | 8pt (Fußnoten) - 9pt (Text) - 12pt (Überschriften) - 18pt (Titel) |
| Kopfzeile | "MIETVERTRAG" + Erstellungsdatum |
| Fußzeile | Seitenzahl zentriert |
| Akzentfarbe | Cyan (#00bcd4) für Paragraphen-Balken |
| Sections | Nummerierte Paragraphen (§1, §2 ...) mit Akzent-Balken |

## Dependency

```bash
npm install jspdf
```

## Dateien

- `src/utils/pdfGenerator.ts` - Moderner PDF Generator mit jsPDF
- Kein Template-System nötig - alles programmatisch generiert

## Features

1. **Automatische Seitenumbrüche**: Prüft vor jedem Element ob genug Platz
2. **Konsistente Formatierung**: Einheitliche Helper-Funktionen
3. **Checkbox-Symbole**: Unicode ☐ und ☑ für visuelle Checklisten
4. **Währungsformatierung**: Korrekte deutsche Formatierung mit €
5. **Datumsformatierung**: Deutsches Format (TT.MM.JJJJ)

## Design-Prinzipien

- **Clean & Modern**: Keine überladenen Designs
- **Professionell**: Klare Hierarchie durch Typografie
- **Marken-neutral**: Kein externes Branding
- **Lesbar**: Ausreichend Weißraum und Kontrast

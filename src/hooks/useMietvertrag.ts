import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Mietvertrag, Mieter, BetriebskostenPosition, Betriebskosten, Abrechnungsschluessel } from '../types';

const createDefaultBKPosition = (): BetriebskostenPosition => ({
  aktiv: false,
  schluessel: '1',
});

const createDefaultBetriebskosten = (): Betriebskosten => ({
  heizung: { aktiv: true, schluessel: '5' },
  schornsteinreinigung: { aktiv: true, schluessel: '1' },
  warmwasser: { aktiv: true, schluessel: '5' },
  wartungGasgeraete: createDefaultBKPosition(),
  wasserAbwasser: { aktiv: true, schluessel: '4' },
  niederschlagswasser: createDefaultBKPosition(),
  muellbeseitigung: { aktiv: true, schluessel: '2' },
  grundsteuer: { aktiv: true, schluessel: '1' },
  deichverband: createDefaultBKPosition(),
  feuerstaettenschau: createDefaultBKPosition(),
  versicherung: { aktiv: true, schluessel: '1' },
  beleuchtung: { aktiv: true, schluessel: '1' },
  gemeinschaftsstrom: createDefaultBKPosition(),
  antenneBreitband: createDefaultBKPosition(),
  gebaeudereinigung: createDefaultBKPosition(),
  ungezieferbekaempfung: createDefaultBKPosition(),
  gehwegreinigung: createDefaultBKPosition(),
  strassenreinigung: { aktiv: true, schluessel: '1' },
  gartenpflege: createDefaultBKPosition(),
  hauswart: createDefaultBKPosition(),
  aufzug: createDefaultBKPosition(),
  rauchwarnmelder: { aktiv: true, schluessel: '3' },
  hebeanlage: createDefaultBKPosition(),
  lueftungsanlage: createDefaultBKPosition(),
  dachrinnenreinigung: createDefaultBKPosition(),
  legionellenpruefung: createDefaultBKPosition(),
  sonstige: [],
});

const createDefaultMieter = (): Mieter => ({
  id: uuidv4(),
  vorname: '',
  nachname: '',
  geburtsdatum: '',
  strasse: '',
  plz: '',
  ort: '',
  telefon: '',
  email: '',
});

const createDefaultMietvertrag = (): Mietvertrag => ({
  id: uuidv4(),
  
  vertragsart: '',
  
  vermieter: {
    typ: 'person',
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    vertreter: '',
    telefon: '',
    email: '',
  },
  
  mieter: [createDefaultMieter()],
  
  mietobjekt: {
    strasse: '',
    hausnummer: '',
    wohnungsnummer: '',
    plz: '',
    ort: '',
    geschoss: '',
    lage: '',
    zimmeranzahl: 0,
    hatKueche: false,
    hatKochnische: false,
    hatBalkon: false,
    hatTerrasse: false,
    hatDiele: false,
    hatBad: false,
    hatDusche: false,
    hatWcRaum: false,
    hatBoden: false,
    hatKeller: false,
    wohnflaeche: 0,
    raeumeSonstiges: '',
    hatCarport: false,
    hatGarage: false,
    hatStellplatz: false,
    stellplatzNummer: '',
    hatGarten: false,
    gartenBeschreibung: '',
    gemeinschaftseinrichtungen: '',
    schluessel: {
      schliessanlage: 0,
      haus: 2,
      wohnung: 3,
      briefkasten: 2,
      sonstige: '',
    },
  },
  
  mietzeit: {
    mietbeginn: '',
    befristet: false,
    mietende: '',
    befristungsgrund: '',
  },
  
  miete: {
    grundmieteWohnung: 0,
    grundmieteGarage: 0,
    grundmieteSonstiges: 0,
    grundmieteSonstigesBeschreibung: '',
    grundmieteGesamt: 0,
    nebenkostenVorauszahlung: 0,
    gesamtmiete: 0,
  },
  
  betriebskosten: createDefaultBetriebskosten(),
  
  mieterhoehung: {
    typ: 'keine',
    staffeln: [],
    indexStart: '',
    indexSchwelle: 3,
  },
  
  bankverbindung: {
    iban: '',
    bic: '',
    kontoinhaber: '',
  },
  
  heizung: {
    art: '',
    heizperiodeVon: '01.10.',
    heizperiodeBis: '30.04.',
    heizzeitVon: '06:00',
    heizzeitBis: '22:00',
  },
  
  kleinreparaturen: {
    aktiv: true,
    maxEinzel: 100,
    maxJahr: 450,
  },
  
  schoenheitsreparaturen: {
    uebergabeZustand: 'renoviert',
    mieterPflicht: true,
  },
  
  sonstigeVereinbarungen: {
    text: '',
  },
  
  kaution: {
    betrag: 0,
    zahlungsart: 'ueberweisung',
  },
  
  unterschriften: {
    ort: 'Bremen',
    datum: new Date().toISOString().split('T')[0],
    vermieterSignatur: '',
    mieterSignaturen: [],
  },
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export function useMietvertrag() {
  const [vertrag, setVertrag] = useState<Mietvertrag>(createDefaultMietvertrag);
  const [currentStep, setCurrentStep] = useState(1);

  // Generic update function for nested objects
  const updateVertrag = useCallback(<K extends keyof Mietvertrag>(
    section: K,
    data: Partial<Mietvertrag[K]> | Mietvertrag[K]
  ) => {
    setVertrag(prev => {
      const currentValue = prev[section];
      let newValue: Mietvertrag[K];
      
      if (typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)) {
        newValue = { ...(currentValue as object), ...(data as object) } as Mietvertrag[K];
      } else {
        newValue = data as Mietvertrag[K];
      }
      
      return {
        ...prev,
        [section]: newValue,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  // Mieter management
  const addMieter = useCallback(() => {
    setVertrag(prev => {
      if (prev.mieter.length >= 3) return prev; // Max 3 Mieter
      return {
        ...prev,
        mieter: [...prev.mieter, createDefaultMieter()],
      };
    });
  }, []);

  const removeMieter = useCallback((id: string) => {
    setVertrag(prev => ({
      ...prev,
      mieter: prev.mieter.filter(m => m.id !== id),
    }));
  }, []);

  const updateMieter = useCallback((id: string, data: Partial<Mieter>) => {
    setVertrag(prev => ({
      ...prev,
      mieter: prev.mieter.map(m => 
        m.id === id ? { ...m, ...data } : m
      ),
    }));
  }, []);

  // Betriebskosten toggle
  const toggleBetriebskosten = useCallback((key: keyof Omit<Betriebskosten, 'sonstige'>) => {
    setVertrag(prev => ({
      ...prev,
      betriebskosten: {
        ...prev.betriebskosten,
        [key]: {
          ...prev.betriebskosten[key],
          aktiv: !prev.betriebskosten[key].aktiv,
        },
      },
    }));
  }, []);

  const updateBetriebskostenSchluessel = useCallback((
    key: keyof Omit<Betriebskosten, 'sonstige'>, 
    schluessel: string
  ) => {
    setVertrag(prev => ({
      ...prev,
      betriebskosten: {
        ...prev.betriebskosten,
        [key]: {
          ...prev.betriebskosten[key],
          schluessel,
        },
      },
    }));
  }, []);

  // Sonstige Betriebskosten management
  const addSonstigeBetriebskosten = useCallback(() => {
    setVertrag(prev => ({
      ...prev,
      betriebskosten: {
        ...prev.betriebskosten,
        sonstige: [...prev.betriebskosten.sonstige, { bezeichnung: '', schluessel: '1' }],
      },
    }));
  }, []);

  const removeSonstigeBetriebskosten = useCallback((index: number) => {
    setVertrag(prev => ({
      ...prev,
      betriebskosten: {
        ...prev.betriebskosten,
        sonstige: prev.betriebskosten.sonstige.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateSonstigeBetriebskosten = useCallback((
    index: number, 
    data: { bezeichnung?: string; schluessel?: Abrechnungsschluessel }
  ) => {
    setVertrag(prev => ({
      ...prev,
      betriebskosten: {
        ...prev.betriebskosten,
        sonstige: prev.betriebskosten.sonstige.map((s, i) => 
          i === index ? { ...s, ...data } : s
        ),
      },
    }));
  }, []);

  // Staffelmiete management
  const addStaffel = useCallback(() => {
    setVertrag(prev => {
      if (prev.mieterhoehung.staffeln.length >= 9) return prev;
      return {
        ...prev,
        mieterhoehung: {
          ...prev.mieterhoehung,
          staffeln: [...prev.mieterhoehung.staffeln, { datum: '', betrag: 0 }],
        },
      };
    });
  }, []);

  const removeStaffel = useCallback((index: number) => {
    setVertrag(prev => ({
      ...prev,
      mieterhoehung: {
        ...prev.mieterhoehung,
        staffeln: prev.mieterhoehung.staffeln.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateStaffel = useCallback((index: number, data: { datum?: string; betrag?: number }) => {
    setVertrag(prev => ({
      ...prev,
      mieterhoehung: {
        ...prev.mieterhoehung,
        staffeln: prev.mieterhoehung.staffeln.map((s, i) => 
          i === index ? { ...s, ...data } : s
        ),
      },
    }));
  }, []);

  // Navigation
  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 10));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 10)));
  }, []);

  // Reset
  const resetVertrag = useCallback((bezeichnung?: string) => {
    const newVertrag = createDefaultMietvertrag();
    if (bezeichnung) {
      newVertrag.bezeichnung = bezeichnung;
    }
    setVertrag(newVertrag);
    setCurrentStep(1);
  }, []);

  // Load existing vertrag
  const loadVertrag = useCallback((data: Mietvertrag) => {
    setVertrag(data);
    setCurrentStep(1);
  }, []);

  // Computed: Update Gesamtmiete when values change
  const updateMieteBerechnung = useCallback(() => {
    setVertrag(prev => {
      const grundmieteGesamt = 
        prev.miete.grundmieteWohnung + 
        prev.miete.grundmieteGarage + 
        prev.miete.grundmieteSonstiges;
      
      const gesamtmiete = grundmieteGesamt + prev.miete.nebenkostenVorauszahlung;
      
      return {
        ...prev,
        miete: {
          ...prev.miete,
          grundmieteGesamt,
          gesamtmiete,
        },
      };
    });
  }, []);

  return {
    vertrag,
    setVertrag,
    updateVertrag,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    addMieter,
    removeMieter,
    updateMieter,
    toggleBetriebskosten,
    updateBetriebskostenSchluessel,
    addSonstigeBetriebskosten,
    removeSonstigeBetriebskosten,
    updateSonstigeBetriebskosten,
    addStaffel,
    removeStaffel,
    updateStaffel,
    resetVertrag,
    loadVertrag,
    updateMieteBerechnung,
  };
}

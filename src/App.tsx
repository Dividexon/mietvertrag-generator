import { useState, useEffect, useRef } from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import { Dashboard } from './components/Dashboard';
import { VertragSelector } from './components/VertragSelector';
import { SettingsModal } from './components/SettingsModal';
import { ContractPreview, type SavedSignature } from './components/ContractPreview';
import {
  Step1Vertragsart,
  Step2Vermieter,
  Step3Mieter,
  Step4Mietobjekt,
  Step5Mietzeit,
  Step6Miete,
  Step7Betriebskosten,
  Step8ZahlungMieterhoehung,
  Step9Optionen,
  Step10Abschluss,
} from './components/steps';
import { useTheme } from './hooks/useTheme';
import { useMietvertrag } from './hooks/useMietvertrag';
import { saveVertrag, getVertrag } from './services/storage';
import './index.css';

const SIGNATURES_STORAGE_KEY = 'saved_signatures';

type View = 'dashboard' | 'editor';

function App() {
  const { mode, setMode } = useTheme();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [savedSignatures, setSavedSignatures] = useState<SavedSignature[]>([]);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved signatures from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SIGNATURES_STORAGE_KEY);
    if (stored) {
      setSavedSignatures(JSON.parse(stored));
    }
  }, []);
  
  const {
    vertrag,
    updateVertrag,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    addMieter,
    removeMieter,
    updateMieter,
    toggleBetriebskosten,
    updateBetriebskostenSchluessel,
    addStaffel,
    removeStaffel,
    updateStaffel,
    resetVertrag,
    loadVertrag,
  } = useMietvertrag();

  // Auto-save when vertrag changes (debounced)
  useEffect(() => {
    if (currentView !== 'editor') return;
    
    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Set new timer for auto-save (2 seconds after last change)
    autoSaveTimerRef.current = setTimeout(() => {
      if (vertrag.vertragsart) {
        saveVertrag(vertrag);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 1500);
      }
    }, 2000);
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [vertrag, currentView]);

  // Navigation handlers
  const handleCreateNew = () => {
    resetVertrag();
    setCurrentView('editor');
  };

  const handleEdit = (id: string) => {
    const stored = getVertrag(id);
    if (stored) {
      loadVertrag(stored.data);
      setCurrentView('editor');
    }
  };

  const handleBackToDashboard = () => {
    // Save before leaving
    if (vertrag.vertragsart) {
      saveVertrag(vertrag);
    }
    setCurrentView('dashboard');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    saveVertrag(vertrag);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);
  };

  const handleClearAll = () => {
    localStorage.removeItem('mietvertraege');
  };

  // Signature handlers
  const handleUpdateSignature = (type: 'vermieter' | 'mieter', index: number, signature: string) => {
    if (type === 'vermieter') {
      updateVertrag('unterschriften', { vermieterSignatur: signature });
    } else {
      const currentSignatures = vertrag.unterschriften.mieterSignaturen || [];
      const newSignatures = [...currentSignatures];
      newSignatures[index] = signature;
      updateVertrag('unterschriften', { mieterSignaturen: newSignatures });
    }
  };

  const handleSaveSignatureTemplate = (name: string, signature: string) => {
    const newSignature: SavedSignature = {
      id: crypto.randomUUID(),
      name,
      signature,
      createdAt: new Date().toISOString(),
    };
    const updated = [...savedSignatures, newSignature];
    setSavedSignatures(updated);
    localStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleDeleteSignatureTemplate = (id: string) => {
    const updated = savedSignatures.filter(sig => sig.id !== id);
    setSavedSignatures(updated);
    localStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleEditSignatureTemplate = (id: string, signature: string) => {
    const updated = savedSignatures.map(sig => 
      sig.id === id ? { ...sig, signature } : sig
    );
    setSavedSignatures(updated);
    localStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(updated));
  };

  // Get current vertrag info for selector
  const getVertragInfo = () => {
    const { mietobjekt, vertragsart } = vertrag;
    const art = vertragsart === 'wohnraum' ? 'Wohnung' :
                vertragsart === 'gewerbe' ? 'Gewerbe' :
                vertragsart === 'garage' ? 'Garage' : '';
    
    const bezeichnung = mietobjekt.strasse 
      ? `${art} ${mietobjekt.strasse} ${mietobjekt.hausnummer}`.trim()
      : 'Neuer Mietvertrag';
    
    const adresse = mietobjekt.strasse
      ? `${mietobjekt.strasse} ${mietobjekt.hausnummer}, ${mietobjekt.plz} ${mietobjekt.ort}`
      : 'Noch keine Adresse eingegeben';
    
    return { bezeichnung, adresse };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Vertragsart
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2Vermieter
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3Mieter
            vertrag={vertrag}
            addMieter={addMieter}
            removeMieter={removeMieter}
            updateMieter={updateMieter}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4Mietobjekt
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <Step5Mietzeit
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <Step6Miete
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 7:
        return (
          <Step7Betriebskosten
            vertrag={vertrag}
            toggleBetriebskosten={toggleBetriebskosten}
            updateBetriebskostenSchluessel={updateBetriebskostenSchluessel}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 8:
        return (
          <Step8ZahlungMieterhoehung
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            addStaffel={addStaffel}
            removeStaffel={removeStaffel}
            updateStaffel={updateStaffel}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 9:
        return (
          <Step9Optionen
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 10:
        return (
          <Step10Abschluss
            vertrag={vertrag}
            updateVertrag={updateVertrag}
            goToStep={goToStep}
            onPrev={prevStep}
            onSave={handleSave}
            onPreview={() => setShowPreview(true)}
          />
        );
      default:
        return null;
    }
  };

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <div className={mode === 'dark' ? 'dark' : ''}>
        <Dashboard 
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onSettings={() => setShowSettings(true)}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          mode={mode}
          setMode={setMode}
          onClearAll={handleClearAll}
        />
      </div>
    );
  }

  // Editor View
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <button 
            className="header-btn"
            onClick={handleBackToDashboard}
            title="Zurück zur Übersicht"
          >
            <MdArrowBack size={24} />
          </button>
          <h1>
            {vertrag.vertragsart === 'wohnraum' ? 'Wohnraum-Mietvertrag' :
             vertrag.vertragsart === 'gewerbe' ? 'Gewerbe-Mietvertrag' :
             vertrag.vertragsart === 'garage' ? 'Garagenmietvertrag' :
             'Mietvertrag'}
          </h1>
        </div>
        <div className="header-actions">
          <button 
            className="header-btn" 
            onClick={handleSave}
            title="Speichern"
            style={{
              background: saveStatus === 'saved' ? 'var(--success)' : 
                         saveStatus === 'saving' ? 'var(--warning)' : undefined,
              color: saveStatus !== 'idle' ? 'white' : undefined,
            }}
          >
            <MdSave size={20} />
          </button>
          <ThemeToggle mode={mode} setMode={setMode} />
        </div>
      </header>

      {/* Vertrag Selector */}
      <VertragSelector
        currentVertrag={getVertragInfo()}
        onSelect={handleEdit}
      />

      <ProgressBar currentStep={currentStep} vertragsart={vertrag.vertragsart} onStepClick={goToStep} />

      <main className="main-content">
        {renderStep()}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        mode={mode}
        setMode={setMode}
        onClearAll={handleClearAll}
      />

      {/* Contract Preview */}
      {showPreview && (
        <ContractPreview
          vertrag={vertrag}
          onClose={() => setShowPreview(false)}
          onUpdateSignature={handleUpdateSignature}
          savedSignatures={savedSignatures}
          onSaveSignatureTemplate={handleSaveSignatureTemplate}
          onDeleteSignatureTemplate={handleDeleteSignatureTemplate}
          onEditSignatureTemplate={handleEditSignatureTemplate}
        />
      )}
    </div>
  );
}

export default App;

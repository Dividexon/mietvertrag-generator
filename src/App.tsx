import { useState } from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import { Dashboard } from './components/Dashboard';
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

type View = 'dashboard' | 'editor';

function App() {
  const { mode, setMode } = useTheme();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
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
    setCurrentView('dashboard');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    saveVertrag(vertrag);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleSettings = () => {
    // TODO: Settings modal
    console.log('Settings clicked');
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
          onSettings={handleSettings}
        />
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <ThemeToggle mode={mode} setMode={setMode} />
        </div>
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
              background: saveStatus === 'saved' ? 'var(--success)' : undefined,
              color: saveStatus === 'saved' ? 'white' : undefined,
            }}
          >
            <MdSave size={20} />
          </button>
          <ThemeToggle mode={mode} setMode={setMode} />
        </div>
      </header>

      <ProgressBar currentStep={currentStep} vertragsart={vertrag.vertragsart} />

      <main className="main-content">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;

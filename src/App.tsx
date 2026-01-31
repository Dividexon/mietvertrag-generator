import { MdDescription, MdRefresh } from 'react-icons/md';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
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
import './index.css';

function App() {
  const { mode, setMode } = useTheme();
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
  } = useMietvertrag();

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

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <div className="header-icon">
            <MdDescription size={24} color="white" />
          </div>
          <h1>Mietvertrag Generator</h1>
        </div>
        <div className="header-actions">
          <button 
            className="header-btn" 
            onClick={resetVertrag}
            title="Neu starten"
          >
            <MdRefresh />
          </button>
          <ThemeToggle mode={mode} setMode={setMode} />
        </div>
      </header>

      <ProgressBar currentStep={currentStep} />

      <main className="main-content">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;

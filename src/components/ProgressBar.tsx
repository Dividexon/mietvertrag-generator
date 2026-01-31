import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { getWizardSteps, Vertragsart } from '../types';

interface Props {
  currentStep: number;
  vertragsart: Vertragsart;
  onStepClick: (step: number) => void;
}

export function ProgressBar({ currentStep, vertragsart, onStepClick }: Props) {
  const steps = getWizardSteps(vertragsart);
  const progress = (currentStep / steps.length) * 100;
  const currentStepData = steps.find(s => s.id === currentStep);

  return (
    <div className="progress-container">
      {/* Desktop: Steps with Labels and Numbers */}
      <div className="progress-steps-row desktop-only">
        {steps.map((step) => (
          <button
            key={step.id}
            className={`progress-step-item ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}
            onClick={() => onStepClick(step.id)}
            title={step.title}
          >
            <span className="progress-step-label">{step.shortTitle}</span>
            <span className="progress-step-number">
              {step.id < currentStep ? '✓' : step.id}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile: Current Step Indicator */}
      <div className="progress-mobile mobile-only">
        <button 
          className="progress-mobile-nav"
          onClick={() => currentStep > 1 && onStepClick(currentStep - 1)}
          disabled={currentStep === 1}
        >
          <MdChevronLeft size={24} />
        </button>
        
        <div className="progress-mobile-current">
          <span className="progress-mobile-label">{currentStepData?.shortTitle || ''}</span>
          <span className="progress-mobile-number">{currentStep} / {steps.length}</span>
        </div>
        
        <button 
          className="progress-mobile-nav"
          onClick={() => currentStep < steps.length && onStepClick(currentStep + 1)}
          disabled={currentStep === steps.length}
        >
          <MdChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

import { getWizardSteps, Vertragsart } from '../types';

interface Props {
  currentStep: number;
  vertragsart: Vertragsart;
  onStepClick: (step: number) => void;
}

export function ProgressBar({ currentStep, vertragsart, onStepClick }: Props) {
  const steps = getWizardSteps(vertragsart);
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="progress-container">
      {/* Steps with Labels and Numbers */}
      <div className="progress-steps-row">
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

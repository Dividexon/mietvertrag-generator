import { getWizardSteps, Vertragsart } from '../types';

interface Props {
  currentStep: number;
  vertragsart: Vertragsart;
}

export function ProgressBar({ currentStep, vertragsart }: Props) {
  const steps = getWizardSteps(vertragsart);
  const progress = (currentStep / steps.length) * 100;
  const currentStepData = steps[currentStep - 1];

  return (
    <div className="progress-container">
      <div className="progress-text">
        Schritt <span>{currentStep}</span> von {steps.length} — {currentStepData?.title}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step indicators */}
      <div className="progress-steps">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`progress-step ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}
            title={step.title}
          >
            {step.id < currentStep ? '✓' : step.id}
          </div>
        ))}
      </div>
    </div>
  );
}

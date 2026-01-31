import { WIZARD_STEPS } from '../types';

interface Props {
  currentStep: number;
}

export function ProgressBar({ currentStep }: Props) {
  const progress = (currentStep / WIZARD_STEPS.length) * 100;
  const currentStepData = WIZARD_STEPS[currentStep - 1];

  return (
    <div className="progress-container">
      <div className="progress-text">
        Schritt <span>{currentStep}</span> von {WIZARD_STEPS.length} — {currentStepData?.title}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step indicators */}
      <div className="progress-steps">
        {WIZARD_STEPS.map((step) => (
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

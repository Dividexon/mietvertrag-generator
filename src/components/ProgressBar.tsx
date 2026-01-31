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
        Schritt {currentStep} von {WIZARD_STEPS.length} — {currentStepData?.title}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

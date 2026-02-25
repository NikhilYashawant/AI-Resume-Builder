import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { STEPS } from '../../data/steps';
import { useArtifacts } from '../../context/ArtifactContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProofFooter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hasArtifact } = useArtifacts();

    const currentPath = location.pathname.split('/rb/')[1];
    const currentStepIndex = STEPS.findIndex(s => s.route === currentPath);
    const currentStep = STEPS[currentStepIndex];

    if (!currentStep) return null;

    const isFirst = currentStepIndex === 0;
    const isLast = currentStepIndex === STEPS.length - 1;
    const isStepComplete = hasArtifact(currentStep.id);

    const handleNext = () => {
        if (isLast) {
            navigate('/rb/proof');
        } else {
            navigate(`/rb/${STEPS[currentStepIndex + 1].route}`);
        }
    };

    const handlePrev = () => {
        if (!isFirst) {
            navigate(`/rb/${STEPS[currentStepIndex - 1].route}`);
        }
    };

    return (
        <div className="h-16 border-t border-slate-200 bg-white flex items-center justify-between px-8 sticky bottom-0 z-50">
            <button
                onClick={handlePrev}
                disabled={isFirst}
                className={`flex items-center text-sm font-medium ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'
                    }`}
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
            </button>

            <button
                onClick={handleNext}
                disabled={!isStepComplete}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${!isStepComplete
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
            >
                {isLast ? 'Finish & Proof' : 'Next Step'}
                <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};

export default ProofFooter;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { STEPS } from '../../data/steps';

const TopBar = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/rb/')[1];
    const currentStep = STEPS.find(s => s.route === currentPath);

    return (
        <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="font-semibold text-slate-900">AI Resume Builder</div>
            <div className="text-sm font-medium text-slate-500">
                {currentStep
                    ? `Project 3 — Step ${currentStep.id} of 8`
                    : currentPath === 'proof'
                        ? 'Project 3 — Proof of Work'
                        : 'Project 3 — Build Track'}
            </div>
            <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Build Track
                </span>
            </div>
        </div>
    );
};

export default TopBar;

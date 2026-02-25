import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BuildPanel from './BuildPanel';
import ProofFooter from './ProofFooter';
import ContextHeader from './ContextHeader';
import Workspace from './Workspace';
import { STEPS } from '../../data/steps';

const PremiumLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/rb/')[1];
    const currentStep = STEPS.find(s => s.route === currentPath);

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
            <TopBar />

            {currentStep ? (
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <ContextHeader title={currentStep.title} description={`Step ${currentStep.id}: ${currentStep.title}`} />
                        <Workspace>
                            <Outlet />
                        </Workspace>
                        <ProofFooter />
                    </div>
                    <BuildPanel step={currentStep} />
                </div>
            ) : (
                <div className="flex-1 flex flex-col overflow-auto">
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default PremiumLayout;

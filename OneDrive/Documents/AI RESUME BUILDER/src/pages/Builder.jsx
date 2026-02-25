import React from 'react';
import { useResume } from '../hooks/useResume';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/builder/ResumePreview';
import AtsScore from '../components/builder/AtsScore';

const Builder = () => {
    const resumeState = useResume();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-8">
                {/* Left: Form */}
                <div className="overflow-visible">
                    <ResumeForm {...resumeState} />
                </div>

                {/* Right: Preview + Score */}
                <div className="hidden lg:block space-y-6">
                    <AtsScore data={resumeState.resumeData} />
                    <ResumePreview
                        data={resumeState.resumeData}
                        template={resumeState.template}
                        setTemplate={resumeState.setTemplate}
                        themeColor={resumeState.themeColor}
                        setThemeColor={resumeState.setThemeColor}
                    />
                </div>
            </div>
        </div>
    );
};

export default Builder;

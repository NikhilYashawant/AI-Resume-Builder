import React, { useState } from 'react';
import { useResume } from '../hooks/useResume';
import ResumeLayout from '../components/resume/ResumeLayout';
import AtsScore from '../components/builder/AtsScore';

const Preview = () => {
    const { resumeData, template, setTemplate, themeColor, setThemeColor } = useResume();
    const [isCopying, setIsCopying] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const templates = [
        { id: 'Classic', name: 'Classic' },
        { id: 'Modern', name: 'Modern' },
        { id: 'Minimal', name: 'Minimal' }
    ];

    const colors = [
        { id: 'teal', value: 'hsl(168, 60%, 40%)', name: 'Teal' },
        { id: 'navy', value: 'hsl(220, 60%, 35%)', name: 'Navy' },
        { id: 'burgundy', value: 'hsl(345, 60%, 35%)', name: 'Burgundy' },
        { id: 'forest', value: 'hsl(150, 50%, 30%)', name: 'Forest' },
        { id: 'charcoal', value: 'hsl(0, 0%, 25%)', name: 'Charcoal' }
    ];

    const isIncomplete = !resumeData.personalInfo.fullName ||
        (resumeData.experience.length === 0 && resumeData.projects.length === 0);

    const handlePrint = () => {
        window.print();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const copyAsText = async () => {
        const d = resumeData;
        const sections = [
            d.personalInfo.fullName,
            '',
            'CONTACT',
            [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' | '),
            '',
            'SUMMARY',
            d.summary,
            '',
            'EDUCATION',
            ...d.education.map(edu => `${edu.degree} - ${edu.school} (${edu.date})`),
            '',
            'EXPERIENCE',
            ...d.experience.map(exp => `${exp.role} at ${exp.company} (${exp.date})\n${exp.description}\n`),
            '',
            'PROJECTS',
            ...d.projects.map(proj => {
                const links = [proj.link, proj.githubUrl].filter(Boolean).join(', ');
                return `${proj.name}${links ? ` (${links})` : ''}\n${proj.description}\n`;
            }),
            '',
            'SKILLS',
            `Technical: ${d.skills.technical?.join(', ') || 'N/A'}`,
            `Soft Skills: ${d.skills.soft?.join(', ') || 'N/A'}`,
            `Tools: ${d.skills.tools?.join(', ') || 'N/A'}`,
            '',
            'LINKS',
            [d.personalInfo.github, d.personalInfo.linkedin].filter(Boolean).join('\n')
        ];

        const text = sections.filter(s => s !== undefined && s !== null).join('\n');

        try {
            await navigator.clipboard.writeText(text);
            setIsCopying(true);
            setTimeout(() => setIsCopying(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-4 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
                        <span className="text-emerald-400">✓</span>
                        <p className="text-sm font-bold tracking-tight">PDF export ready! Check your downloads.</p>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-8">
                {/* Left Side: Score & Controls */}
                <div className="w-full lg:w-80 space-y-6 no-print lg:sticky lg:top-24">
                    <AtsScore data={resumeData} />

                    {/* Controls */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Template</label>
                                <div className="grid grid-cols-1 gap-1 bg-slate-100 p-1 rounded-xl">
                                    {templates.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTemplate(t.id)}
                                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all text-left ${template === t.id
                                                ? 'bg-white text-slate-900 shadow-md'
                                                : 'text-slate-500 hover:text-slate-900'
                                                }`}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Theme</label>
                                <div className="flex flex-wrap items-center gap-3">
                                    {colors.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => setThemeColor(c.value)}
                                            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === c.value ? 'border-slate-900 scale-110 ring-2 ring-slate-100 ring-offset-1' : 'border-transparent'}`}
                                            style={{ backgroundColor: c.value }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-6 border-t border-slate-100 w-full">
                            <button
                                onClick={handlePrint}
                                className="premium-button-primary shadow-lg shadow-slate-900/20 w-full"
                            >
                                Download PDF
                            </button>
                            <button
                                onClick={copyAsText}
                                className="premium-button-secondary bg-white w-full"
                            >
                                {isCopying ? 'Copied!' : 'Copy as Text'}
                            </button>
                        </div>
                    </div>

                    {isIncomplete && (
                        <div className="bg-amber-50 border border-amber-200 px-6 py-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <p className="text-amber-800 text-[11px] font-medium leading-relaxed">Your resume looks incomplete. A professional resume requires at least a Name, Experience entry, and your contact details to pass ATS filters.</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Resume View */}
                <div className="flex-1 shadow-2xl print:shadow-none print:m-0 w-full">
                    <ResumeLayout data={resumeData} template={template} themeColor={themeColor} />
                </div>
            </div>
        </div>
    );
};

export default Preview;

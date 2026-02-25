import React, { useState, useEffect } from 'react';

const Proof = () => {
    const [submission, setSubmission] = useState(() => {
        const saved = localStorage.getItem('rb_final_submission');
        return saved ? JSON.parse(saved) : {
            lovable: '',
            github: '',
            deployed: '',
            steps: Array(8).fill(false),
            checklist: Array(10).fill(false)
        };
    });

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        localStorage.setItem('rb_final_submission', JSON.stringify(submission));
    }, [submission]);

    const steps = [
        "Project Initialization & Routing",
        "Premium Layout & Workspace Set",
        "Resume Core State & Persistence",
        "Personal Info & Summary Forms",
        "Experience & Projects Builder",
        "Skills Categorization & ATS Logic",
        "Multi-Template & Theme Engine",
        "Final Verification & Export Pass"
    ];

    const checklistItems = [
        "All form sections save to localStorage",
        "Live preview updates in real-time",
        "Template switching preserves data",
        "Color theme persists after refresh",
        "ATS score calculates correctly",
        "Score updates live on edit",
        "Export buttons work (copy/download)",
        "Empty states handled gracefully",
        "Mobile responsive layout works",
        "No console errors on any page"
    ];

    const isValidUrl = (url) => {
        try {
            return /^https?:\/\/.+/.test(url);
        } catch {
            return false;
        }
    };

    const isStepsComplete = submission.steps.every(s => s);
    const isChecklistComplete = submission.checklist.every(c => c);
    const isLinksProvided = isValidUrl(submission.lovable) && isValidUrl(submission.github) && isValidUrl(submission.deployed);
    const isShipped = isStepsComplete && isChecklistComplete && isLinksProvided;

    const copyFinalSubmission = async () => {
        const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${submission.lovable}
GitHub Repository: ${submission.github}
Live Deployment: ${submission.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const toggleStep = (index) => {
        const newSteps = [...submission.steps];
        newSteps[index] = !newSteps[index];
        setSubmission({ ...submission, steps: newSteps });
    };

    const toggleChecklist = (index) => {
        const newChecklist = [...submission.checklist];
        newChecklist[index] = !newChecklist[index];
        setSubmission({ ...submission, checklist: newChecklist });
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between group">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Proof of Work</h1>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-700 ${isShipped ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/20' : 'bg-slate-200 text-slate-500'}`}>
                                {isShipped ? 'Shipped' : 'In Progress'}
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm">Documenting the final stretch of the AI Resume Builder project.</p>
                    </div>
                    {isShipped && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                            <p className="text-emerald-600 font-medium text-sm tracking-tight border-l-2 border-emerald-500 pl-4 py-1 bg-emerald-50/50 pr-6 rounded-r-lg">
                                Project 3 Shipped Successfully.
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Build Steps */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="premium-card p-8 bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Step Completion Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {steps.map((step, i) => (
                                    <button
                                        key={i}
                                        onClick={() => toggleStep(i)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${submission.steps[i]
                                            ? 'bg-emerald-50 border-emerald-200 border-dashed ring-1 ring-emerald-100'
                                            : 'bg-white border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${submission.steps[i] ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white border-slate-200 text-slate-300'}`}>
                                            {submission.steps[i] ? '✓' : i + 1}
                                        </div>
                                        <span className={`text-[13px] font-medium leading-tight ${submission.steps[i] ? 'text-emerald-800' : 'text-slate-600'}`}>
                                            {step}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="premium-card p-8 bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                10-Point Testing Checklist
                            </h2>
                            <div className="space-y-2">
                                {checklistItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => toggleChecklist(i)}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${submission.checklist[i] ? 'bg-amber-500 border-amber-400 text-white' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                                            {submission.checklist[i] && <span className="text-[10px] pb-0.5 font-black">✓</span>}
                                        </div>
                                        <span className={`text-[13px] font-medium transition-colors ${submission.checklist[i] ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Artifacts & Export */}
                    <div className="space-y-8 flex flex-col">
                        <section className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-8">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                Artifact Collection
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Lovable Project Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://lovable.dev/..."
                                        value={submission.lovable}
                                        onChange={(e) => setSubmission({ ...submission, lovable: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all text-sm outline-none ${submission.lovable ? (isValidUrl(submission.lovable) ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20 text-rose-600') : 'border-slate-100 focus:border-slate-300'}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">GitHub Repository</label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        value={submission.github}
                                        onChange={(e) => setSubmission({ ...submission, github: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all text-sm outline-none ${submission.github ? (isValidUrl(submission.github) ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20 text-rose-600') : 'border-slate-100 focus:border-slate-300'}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Deployed URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://resume-builder.pages.dev/..."
                                        value={submission.deployed}
                                        onChange={(e) => setSubmission({ ...submission, deployed: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all text-sm outline-none ${submission.deployed ? (isValidUrl(submission.deployed) ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20 text-rose-600') : 'border-slate-100 focus:border-slate-300'}`}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 space-y-4">
                                <button
                                    onClick={copyFinalSubmission}
                                    disabled={!isLinksProvided}
                                    className={`premium-button-secondary w-full py-4 relative group ${!isLinksProvided ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                >
                                    <span className="relative z-10">{copied ? 'Copied Final Export' : 'Copy Final Submission'}</span>
                                    {isLinksProvided && <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg pointer-events-none" />}
                                </button>
                                {!isLinksProvided && (
                                    <p className="text-[10px] text-slate-400 text-center italic">Provide all valid links above to enable export.</p>
                                )}
                            </div>
                        </section>

                        <div className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-1000 flex flex-col items-center justify-center text-center space-y-4 ${isShipped ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-100/50 border-slate-200 opacity-60'}`}>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-700 ${isShipped ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-200 text-slate-400'}`}>
                                📦
                            </div>
                            <div className="space-y-1">
                                <h3 className={`font-bold transition-colors ${isShipped ? 'text-emerald-900' : 'text-slate-600'}`}>Shipping Readiness</h3>
                                <p className="text-[11px] text-slate-500 font-medium px-4 leading-relaxed">
                                    {isShipped
                                        ? "All validation criteria met. Your project is ready for final submission."
                                        : "Complete all steps, pass all tests, and provide all links to achieve 'Shipped' status."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proof;

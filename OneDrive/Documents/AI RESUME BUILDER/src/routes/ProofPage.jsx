import React, { useState } from 'react';
import { useArtifacts } from '../context/ArtifactContext';
import { STEPS } from '../data/steps';
import { CheckCircle, XCircle, Copy } from 'lucide-react';

const ProofPage = () => {
    const { hasArtifact } = useArtifacts();
    const [links, setLinks] = useState({ lovable: '', github: '', deploy: '' });

    const allStepsComplete = STEPS.every(step => hasArtifact(step.id));
    const allLinksPresent = Object.values(links).every(l => l.trim().length > 0);
    const isShippable = allStepsComplete && allLinksPresent;

    const handleCopySubmission = () => {
        const submission = `
Project: AI Resume Builder
Status: ${isShippable ? 'SHIPPED' : 'IN PROGRESS'}

Steps Compliance:
${STEPS.map(s => `- [${hasArtifact(s.id) ? 'x' : ' '}] ${s.title}`).join('\n')}

Links:
- Lovable: ${links.lovable}
- GitHub: ${links.github}
- Deployment: ${links.deploy}
    `.trim();

        navigator.clipboard.writeText(submission);
        alert('Submission copied to clipboard!');
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Proof of Work</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isShippable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {isShippable ? 'Ready to Ship' : 'In Progress'}
                    </span>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Build Track Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {STEPS.map(step => (
                                <div key={step.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                                    {hasArtifact(step.id) ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-slate-300" />
                                    )}
                                    <span className={`text-sm ${hasArtifact(step.id) ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                                        {step.id}. {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Project Links</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lovable Project Link</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    value={links.lovable}
                                    onChange={e => setLinks({ ...links, lovable: e.target.value })}
                                    placeholder="https://lovable.dev/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Repository</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    value={links.github}
                                    onChange={e => setLinks({ ...links, github: e.target.value })}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deployment URL</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    value={links.deploy}
                                    onChange={e => setLinks({ ...links, deploy: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <button
                            onClick={handleCopySubmission}
                            className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium"
                        >
                            <Copy className="w-4 h-4" />
                            <span>Copy Final Submission</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;

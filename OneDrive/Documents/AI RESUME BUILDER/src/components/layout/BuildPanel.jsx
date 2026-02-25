import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle, AlertCircle, Image } from 'lucide-react';
import { useArtifacts } from '../../context/ArtifactContext';

const BuildPanel = ({ step }) => {
    const { hasArtifact, saveArtifact } = useArtifacts();
    const [status, setStatus] = useState(hasArtifact(step.id) ? 'success' : 'pending');

    const handleCopy = () => {
        // Logic to copy specific prompt for the step
        navigator.clipboard.writeText(`Prompt for ${step.title}`);
    };

    const handleItWorked = () => {
        saveArtifact(step.id, JSON.stringify({ status: 'completed', timestamp: Date.now() }));
        setStatus('success');
    };

    const handleError = () => {
        setStatus('error');
    };

    return (
        <div className="w-[30%] border-l border-slate-200 bg-white flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 font-semibold text-slate-800">
                Build Instructions
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Copy This Into Lovable
                    </label>
                    <div className="relative">
                        <textarea
                            readOnly
                            className="w-full h-32 p-3 bg-slate-50 rounded-md border border-slate-200 text-sm text-slate-600 focus:outline-none resize-none"
                            value={`Prompt for ${step.title}... (Placeholder)`}
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-indigo-600 bg-white rounded-md border border-slate-200 shadow-sm"
                            title="Copy"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div>
                    <a
                        href="https://lovable.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2.5 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Build in Lovable
                    </a>
                </div>

                <div className="border-t border-slate-100 pt-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                        Verification
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleItWorked}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${status === 'success'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-slate-200 hover:border-green-200 hover:bg-green-50 text-slate-600'
                                }`}
                        >
                            <CheckCircle className={`w-6 h-6 mb-1 ${status === 'success' ? 'text-green-500' : 'text-slate-400'}`} />
                            <span className="text-xs font-medium">It Worked</span>
                        </button>

                        <button
                            onClick={handleError}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${status === 'error'
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-600'
                                }`}
                        >
                            <AlertCircle className={`w-6 h-6 mb-1 ${status === 'error' ? 'text-red-500' : 'text-slate-400'}`} />
                            <span className="text-xs font-medium">Error</span>
                        </button>
                    </div>

                    <button className="flex items-center justify-center w-full mt-3 py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-50 text-xs">
                        <Image className="w-4 h-4 mr-1.5" />
                        Add Screenshot (Optional)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildPanel;

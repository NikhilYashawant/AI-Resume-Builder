import React from 'react';
import ResumeLayout from '../resume/ResumeLayout';

const ResumePreview = ({ data, template, setTemplate, themeColor, setThemeColor }) => {
    const templates = [
        { id: 'Classic', name: 'Classic', description: 'Serif • Traditional • Rules' },
        { id: 'Modern', name: 'Modern', description: 'Sans • Sidebar • Bold' },
        { id: 'Minimal', name: 'Minimal', description: 'Sans • Sparse • Clean' }
    ];

    const colors = [
        { id: 'teal', value: 'hsl(168, 60%, 40%)', name: 'Teal' },
        { id: 'navy', value: 'hsl(220, 60%, 35%)', name: 'Navy' },
        { id: 'burgundy', value: 'hsl(345, 60%, 35%)', name: 'Burgundy' },
        { id: 'forest', value: 'hsl(150, 50%, 30%)', name: 'Forest' },
        { id: 'charcoal', value: 'hsl(0, 0%, 25%)', name: 'Charcoal' }
    ];

    return (
        <div className="space-y-8 sticky top-24">
            {/* Template & Theme Controls */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Template</label>
                    <div className="grid grid-cols-3 gap-3">
                        {templates.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTemplate(t.id)}
                                className={`group relative flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all ${template === t.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-slate-100 hover:border-slate-300'}`}
                            >
                                {/* Thumbnail Sketch */}
                                <div className={`w-[120px] aspect-[3/4] rounded shadow-sm border ${template === t.id ? 'bg-white' : 'bg-slate-50'} overflow-hidden`}>
                                    {t.id === 'Classic' && (
                                        <div className="p-2 space-y-1">
                                            <div className="w-8 h-1 bg-slate-200 mx-auto" />
                                            <div className="w-12 h-0.5 bg-slate-100 mx-auto" />
                                            <div className="w-full h-px bg-slate-200 my-2" />
                                            <div className="space-y-1">
                                                <div className="w-full h-0.5 bg-slate-100" />
                                                <div className="w-full h-0.5 bg-slate-100" />
                                            </div>
                                        </div>
                                    )}
                                    {t.id === 'Modern' && (
                                        <div className="flex h-full">
                                            <div className="w-1/3 h-full bg-slate-200 p-1 space-y-1">
                                                <div className="w-full h-1 bg-white" />
                                                <div className="w-2/3 h-0.5 bg-white/50" />
                                            </div>
                                            <div className="flex-1 p-2 space-y-1">
                                                <div className="w-3/4 h-1 bg-slate-100" />
                                                <div className="w-full h-0.5 bg-slate-50" />
                                            </div>
                                        </div>
                                    )}
                                    {t.id === 'Minimal' && (
                                        <div className="p-2 space-y-2">
                                            <div className="w-1/2 h-1 bg-slate-200" />
                                            <div className="space-y-1">
                                                <div className="w-full h-0.5 bg-slate-50" />
                                                <div className="w-full h-0.5 bg-slate-50" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className={`text-[10px] font-bold ${template === t.id ? 'text-blue-600' : 'text-slate-600'}`}>{t.name}</span>
                                </div>
                                {template === t.id && (
                                    <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white">
                                        ✓
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Theme Color</label>
                    <div className="flex items-center gap-3">
                        {colors.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setThemeColor(c.value)}
                                title={c.name}
                                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === c.value ? 'border-slate-900 scale-110 ring-2 ring-slate-100 ring-offset-1' : 'border-transparent'}`}
                                style={{ backgroundColor: c.value }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-[calc(100vh-320px)] overflow-auto bg-slate-900/5 rounded-2xl border border-slate-200 flex items-start justify-center p-8 bg-grid-slate-100/50 scrollbar-hide">
                <div className="scale-[0.5] origin-top transform-gpu transition-all duration-500 hover:scale-[0.52]">
                    <ResumeLayout data={data} template={template} themeColor={themeColor} />
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;

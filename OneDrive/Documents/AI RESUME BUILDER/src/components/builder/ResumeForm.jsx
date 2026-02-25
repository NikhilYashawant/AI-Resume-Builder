import React, { useState } from 'react';

const BulletHint = ({ text }) => {
    if (!text.trim()) return null;

    const commonVerbs = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];
    const lines = text.split('\n').filter(l => l.trim());

    const hints = [];

    const missingVerb = lines.some(line => {
        const firstWord = line.trim().split(/\s+/)[0]?.replace(/[^a-zA-Z]/g, '');
        return !commonVerbs.some(v => v.toLowerCase() === firstWord?.toLowerCase());
    });

    const missingNumbers = !/[0-9]+|%|k|M/i.test(text);

    if (missingVerb) hints.push("Start with a strong action verb (e.g. Built, Led).");
    if (missingNumbers) hints.push("Add measurable impact (numbers, %, etc).");

    if (hints.length === 0) return null;

    return (
        <div className="flex flex-col gap-1 mt-2">
            {hints.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-medium text-amber-600/80">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    {h}
                </div>
            ))}
        </div>
    );
};

const TagInput = ({ tags = [], onChange, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                onChange([...tags, input.trim()]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    };

    const removeTag = (index) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 p-2 bg-white border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-slate-900/5 focus-within:border-slate-900 transition-all min-h-[42px]">
                {tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                        {tag}
                        <button
                            onClick={() => removeTag(i)}
                            className="hover:text-red-500 transition-colors"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    className="flex-1 bg-transparent outline-none text-sm min-w-[120px] py-1"
                />
            </div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Press Enter to add</p>
        </div>
    );
};

const ResumeForm = ({ resumeData, updatePersonalInfo, updateSummary, updateSkills, suggestSkills, addItem, updateItem, removeItem, loadSampleData }) => {
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [openProjectId, setOpenProjectId] = useState(null);

    const handleSuggest = async () => {
        setIsSuggesting(true);
        await suggestSkills();
        setIsSuggesting(false);
    };

    return (
        <div className="space-y-12 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Resume Content</h2>
                <button
                    onClick={loadSampleData}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
                >
                    Load Sample Data
                </button>
            </div>

            {/* Personal Info */}
            <section className="space-y-4">
                <h3 className="premium-label">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        placeholder="Full Name"
                        className="premium-input"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                    />
                    <input
                        placeholder="Email Address"
                        className="premium-input"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                    />
                    <input
                        placeholder="Phone Number"
                        className="premium-input"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    />
                    <input
                        placeholder="Location"
                        className="premium-input"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    />
                    <input
                        placeholder="GitHub URL"
                        className="premium-input"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                    />
                    <input
                        placeholder="LinkedIn URL"
                        className="premium-input"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                    />
                </div>
            </section>

            {/* Summary */}
            <section className="space-y-4">
                <h3 className="premium-label">Professional Summary</h3>
                <textarea
                    placeholder="Briefly describe your career goals and expertise..."
                    className="premium-input h-32 resize-none"
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                />
            </section>

            {/* Education */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="premium-label">Education</h3>
                    <button onClick={() => addItem('education')} className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase">Add</button>
                </div>
                {resumeData.education.map(edu => (
                    <div key={edu.id} className="p-4 bg-white border border-slate-100 rounded-lg space-y-3 relative group">
                        <button
                            onClick={() => removeItem('education', edu.id)}
                            className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                        <input
                            placeholder="School/University"
                            className="premium-input text-sm"
                            value={edu.school || ''}
                            onChange={(e) => updateItem('education', edu.id, { school: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="Degree/Major"
                                className="premium-input text-sm"
                                value={edu.degree || ''}
                                onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                            />
                            <input
                                placeholder="Dates (e.g. 2018 - 2022)"
                                className="premium-input text-sm"
                                value={edu.date || ''}
                                onChange={(e) => updateItem('education', edu.id, { date: e.target.value })}
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Experience */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="premium-label">Experience</h3>
                    <button onClick={() => addItem('experience')} className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase">Add</button>
                </div>
                {resumeData.experience.map(exp => (
                    <div key={exp.id} className="p-4 bg-white border border-slate-100 rounded-lg space-y-3 relative group">
                        <button
                            onClick={() => removeItem('experience', exp.id)}
                            className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                        <input
                            placeholder="Company Name"
                            className="premium-input text-sm"
                            value={exp.company || ''}
                            onChange={(e) => updateItem('experience', exp.id, { company: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="Role/Title"
                                className="premium-input text-sm"
                                value={exp.role || ''}
                                onChange={(e) => updateItem('experience', exp.id, { role: e.target.value })}
                            />
                            <input
                                placeholder="Dates (e.g. 2020 - Present)"
                                className="premium-input text-sm"
                                value={exp.date || ''}
                                onChange={(e) => updateItem('experience', exp.id, { date: e.target.value })}
                            />
                        </div>
                        <textarea
                            placeholder="Key achievements and responsibilities..."
                            className="premium-input text-sm h-24 resize-none"
                            value={exp.description || ''}
                            onChange={(e) => updateItem('experience', exp.id, { description: e.target.value })}
                        />
                        <BulletHint text={exp.description || ''} />
                    </div>
                ))}
            </section>

            {/* Projects */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="premium-label">Projects</h3>
                    <button onClick={() => addItem('projects')} className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase">Add Project</button>
                </div>
                <div className="space-y-3">
                    {resumeData.projects.map(proj => (
                        <div key={proj.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm transition-all">
                            <button
                                onClick={() => setOpenProjectId(openProjectId === proj.id ? null : proj.id)}
                                className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-sm text-slate-700">{proj.name || 'Untitled Project'}</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem('projects', proj.id);
                                        }}
                                        className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase"
                                    >
                                        Delete
                                    </button>
                                    <span className={`text-slate-400 transform transition-transform ${openProjectId === proj.id ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>
                            </button>

                            {openProjectId === proj.id && (
                                <div className="p-4 space-y-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Project Title</label>
                                            <input
                                                placeholder="e.g. AetherDB"
                                                className="premium-input text-sm"
                                                value={proj.name || ''}
                                                onChange={(e) => updateItem('projects', proj.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Live URL (Optional)</label>
                                            <input
                                                placeholder="https://..."
                                                className="premium-input text-sm"
                                                value={proj.link || ''}
                                                onChange={(e) => updateItem('projects', proj.id, { link: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">GitHub URL (Optional)</label>
                                            <input
                                                placeholder="github.com/..."
                                                className="premium-input text-sm"
                                                value={proj.githubUrl || ''}
                                                onChange={(e) => updateItem('projects', proj.id, { githubUrl: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Tech Stack</label>
                                            <TagInput
                                                tags={proj.techStack || []}
                                                onChange={(tags) => updateItem('projects', proj.id, { techStack: tags })}
                                                placeholder="React, AWS..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                                            <span className={`text-[10px] font-mono ${(proj.description?.length || 0) > 200 ? 'text-red-500' : 'text-slate-400'}`}>
                                                {proj.description?.length || 0}/200
                                            </span>
                                        </div>
                                        <textarea
                                            placeholder="What did you build and how?"
                                            className="premium-input text-sm h-24 resize-none"
                                            maxLength={200}
                                            value={proj.description || ''}
                                            onChange={(e) => updateItem('projects', proj.id, { description: e.target.value })}
                                        />
                                        <BulletHint text={proj.description || ''} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="premium-label">Expertise & Skills</h3>
                    <button
                        onClick={handleSuggest}
                        disabled={isSuggesting}
                        className={`text-[10px] font-bold flex items-center gap-1.5 transition-all
                            ${isSuggesting ? 'text-indigo-400 animate-pulse' : 'text-indigo-600 hover:text-indigo-800'}
                            uppercase tracking-widest`}
                    >
                        {isSuggesting ? 'Suggesting...' : '✨ Suggest Skills'}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Technical Skills ({resumeData.skills.technical?.length || 0})</label>
                        </div>
                        <TagInput
                            tags={resumeData.skills.technical || []}
                            onChange={(tags) => updateSkills('technical', tags)}
                            placeholder="e.g. React, Node.js, Python..."
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Soft Skills ({resumeData.skills.soft?.length || 0})</label>
                        </div>
                        <TagInput
                            tags={resumeData.skills.soft || []}
                            onChange={(tags) => updateSkills('soft', tags)}
                            placeholder="e.g. Leadership, Communication..."
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tools & Technologies ({resumeData.skills.tools?.length || 0})</label>
                        </div>
                        <TagInput
                            tags={resumeData.skills.tools || []}
                            onChange={(tags) => updateSkills('tools', tags)}
                            placeholder="e.g. Git, Docker, AWS..."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ResumeForm;

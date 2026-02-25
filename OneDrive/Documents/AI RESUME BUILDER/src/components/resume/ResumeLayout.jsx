import React from 'react';

const ResumeLayout = ({ data, template = 'Classic', themeColor = 'hsl(168, 60%, 40%)' }) => {
    const { personalInfo, summary, education, experience, projects, skills } = data;

    const validEducation = education.filter(edu => edu.school || edu.degree);
    const validExperience = experience.filter(exp => exp.company || exp.role);
    const validProjects = projects.filter(proj => proj.name || proj.description);

    const hasSkills = skills.technical?.length > 0 || skills.soft?.length > 0 || skills.tools?.length > 0;

    const isModern = template === 'Modern';
    const isMinimal = template === 'Minimal';
    const isClassic = template === 'Classic';

    // Helper for heading styles
    const getHeadingStyle = () => {
        if (isModern) return `text-lg font-bold uppercase tracking-widest mb-4 border-b-2 pb-2`;
        if (isMinimal) return `text-xs font-bold uppercase tracking-[0.3em] mb-6 text-slate-400`;
        return `text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 pb-1 mb-4`;
    };

    const SectionHeader = ({ title }) => (
        <h2 className={getHeadingStyle()} style={{ color: isClassic || isMinimal ? themeColor : undefined, borderColor: isModern ? themeColor : undefined }}>
            {title}
        </h2>
    );

    const ContactInfo = ({ className = "" }) => (
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${className}`}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.github && <span className="opacity-70">{personalInfo.github}</span>}
            {personalInfo.linkedin && <span className="opacity-70">{personalInfo.linkedin}</span>}
        </div>
    );

    const SkillsContent = () => (
        <div className="space-y-6">
            {skills.technical?.length > 0 && (
                <div>
                    <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isModern ? 'text-white/60' : 'text-slate-400'}`}>Technical</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.technical.map((s, i) => (
                            <span key={i} className={`text-[10px] px-2 py-1 rounded-md font-bold ${isModern ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {skills.soft?.length > 0 && (
                <div>
                    <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isModern ? 'text-white/60' : 'text-slate-400'}`}>Soft Skills</h3>
                    <div className="space-y-1">
                        {skills.soft.map((s, i) => (
                            <div key={i} className={`text-[11px] font-medium ${isModern ? 'text-white/80' : 'text-slate-600 list-item ml-4'}`}>{s}</div>
                        ))}
                    </div>
                </div>
            )}
            {skills.tools?.length > 0 && (
                <div>
                    <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isModern ? 'text-white/60' : 'text-slate-400'}`}>Tools</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {skills.tools.map((s, i) => (
                            <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded border ${isModern ? 'border-white/20 text-white/70' : 'border-slate-200 text-slate-500'}`}>{s}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    if (isModern) {
        return (
            <div className="resume-page bg-white text-slate-900 w-[210mm] min-h-[297mm] shadow-2xl mx-auto font-sans flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-[280px] p-10 text-white flex flex-col gap-10 shrink-0" style={{ backgroundColor: themeColor }}>
                    <header>
                        <h1 className="text-3xl font-black tracking-tighter mb-4 leading-tight">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <ContactInfo className="flex-col text-white/80 gap-2" />
                    </header>

                    {hasSkills && (
                        <section>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/20">Expertise</h2>
                            <SkillsContent />
                        </section>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-12 space-y-10">
                    {summary.trim() && (
                        <section>
                            <SectionHeader title="Profile" />
                            <p className="text-[13px] leading-relaxed text-slate-600">{summary}</p>
                        </section>
                    )}

                    {validExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Experience" />
                            <div className="space-y-8">
                                {validExperience.map(exp => (
                                    <div key={exp.id} className="print-avoid-break">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[14px] text-slate-900">{exp.role}</h3>
                                            <span className="text-[11px] font-bold text-slate-400">{exp.date}</span>
                                        </div>
                                        <div className="text-[12px] font-bold mb-3" style={{ color: themeColor }}>{exp.company}</div>
                                        <p className="text-[12px] leading-relaxed text-slate-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {validProjects.length > 0 && (
                        <section>
                            <SectionHeader title="Projects" />
                            <div className="space-y-8">
                                {validProjects.map(proj => (
                                    <div key={proj.id} className="print-avoid-break">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[14px] text-slate-900">{proj.name}</h3>
                                            <div className="flex gap-3 text-[10px] font-bold opacity-40">
                                                {proj.link && <span>LIVE</span>}
                                                {proj.githubUrl && <span>CODE</span>}
                                            </div>
                                        </div>
                                        <p className="text-[12px] leading-relaxed text-slate-600 mb-3">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.techStack?.map((t, i) => (
                                                <span key={i} className="text-[9px] font-black uppercase tracking-wider text-slate-400">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {validEducation.length > 0 && (
                        <section>
                            <SectionHeader title="Education" />
                            <div className="space-y-6">
                                {validEducation.map(edu => (
                                    <div key={edu.id} className="print-avoid-break">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-[14px]">{edu.school}</h4>
                                            <span className="text-[11px] font-bold text-slate-400">{edu.date}</span>
                                        </div>
                                        <div className="text-[12px] text-slate-500">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`resume-page bg-white text-slate-900 p-16 w-[210mm] min-h-[297mm] shadow-2xl mx-auto transition-all ${isMinimal ? 'font-sans' : 'font-serif'}`}>
            <header className={`mb-12 ${isMinimal ? '' : 'text-center border-b-2 pb-8'}`} style={{ borderColor: isClassic ? themeColor : undefined }}>
                <h1 className={`${isMinimal ? 'text-4xl font-light tracking-tight' : 'text-4xl font-bold tracking-tight uppercase'} mb-4`} style={{ color: isMinimal ? themeColor : undefined }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <ContactInfo className={isMinimal ? 'justify-start opacity-60' : 'justify-center'} />
            </header>

            <div className="space-y-10">
                {summary.trim() && (
                    <section>
                        <SectionHeader title="Professional Profile" />
                        <p className={`text-[13px] leading-relaxed ${isMinimal ? 'text-slate-500 font-light' : 'text-slate-800'}`}>{summary}</p>
                    </section>
                )}

                {validExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-8">
                            {validExperience.map(exp => (
                                <div key={exp.id} className="print-avoid-break">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-[14px] tracking-tight">{exp.role}</h3>
                                        <span className="text-[11px] font-medium text-slate-500">{exp.date}</span>
                                    </div>
                                    <div className={`text-[12px] font-bold mb-3 ${isMinimal ? 'text-slate-400 font-medium' : 'italic text-slate-700'}`}>{exp.company}</div>
                                    <p className={`text-[13px] leading-relaxed ${isMinimal ? 'text-slate-500 font-light' : 'text-slate-600'}`}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {validProjects.length > 0 && (
                    <section>
                        <SectionHeader title="Selected Projects" />
                        <div className="space-y-8">
                            {validProjects.map(proj => (
                                <div key={proj.id} className="print-avoid-break">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-[14px]">{proj.name}</h3>
                                        <div className="flex gap-4 text-[10px] font-bold text-slate-400">
                                            {proj.link && <span>DEMO</span>}
                                            {proj.githubUrl && <span>SOURCE</span>}
                                        </div>
                                    </div>
                                    <p className={`text-[13px] leading-relaxed mb-3 ${isMinimal ? 'text-slate-500 font-light' : 'text-slate-600'}`}>{proj.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {proj.techStack?.map((t, i) => (
                                            <span key={i} className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {hasSkills && (
                    <section>
                        <SectionHeader title="Expertise" />
                        <div className={isMinimal ? 'grid grid-cols-1 gap-6' : 'space-y-6'}>
                            <SkillsContent />
                        </div>
                    </section>
                )}

                {validEducation.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-6">
                            {validEducation.map(edu => (
                                <div key={edu.id} className="print-avoid-break">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-[14px]">{edu.school}</h4>
                                        <span className="text-[11px] font-medium text-slate-500">{edu.date}</span>
                                    </div>
                                    <div className="text-[12px] text-slate-600">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResumeLayout;

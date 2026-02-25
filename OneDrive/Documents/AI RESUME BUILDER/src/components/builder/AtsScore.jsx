import React, { useMemo } from 'react';

const AtsScore = ({ data }) => {
    const calculation = useMemo(() => {
        let score = 0;
        const suggestions = [];

        const { personalInfo, summary, experience, education, projects, skills } = data;

        // 1. Name (+10)
        if (personalInfo.fullName?.trim()) score += 10;
        else suggestions.push({ text: "Add your full name", points: 10 });

        // 2. Email (+10)
        if (personalInfo.email?.trim()) score += 10;
        else suggestions.push({ text: "Add your email address", points: 10 });

        // 3. Summary > 50 chars (+10)
        if (summary?.trim().length > 50) score += 10;
        else suggestions.push({ text: "Write a summary (>50 chars)", points: 10 });

        // 4. Experience (+15)
        const hasWorkWithBullets = experience.some(exp =>
            exp.role &&
            exp.description?.trim().length > 10 &&
            (/[•\-\*]/.test(exp.description) || exp.description.includes('\n'))
        );
        if (hasWorkWithBullets) score += 15;
        else suggestions.push({ text: "Add experience with bullet points", points: 15 });

        // 5. Education (+10)
        if (education.some(edu => edu.school && edu.degree)) score += 10;
        else suggestions.push({ text: "Add your education details", points: 10 });

        // 6. Skills (at least 5) (+10)
        const totalSkills = (skills.technical?.length || 0) + (skills.soft?.length || 0) + (skills.tools?.length || 0);
        if (totalSkills >= 5) score += 10;
        else suggestions.push({ text: "Add at least 5 skills", points: 10 });

        // 7. Projects (+10)
        if (projects.some(proj => proj.name && proj.description)) score += 10;
        else suggestions.push({ text: "Add at least one project", points: 10 });

        // 8. Phone (+5)
        if (personalInfo.phone?.trim()) score += 5;
        else suggestions.push({ text: "Add your phone number", points: 5 });

        // 9. LinkedIn (+5)
        if (personalInfo.linkedin?.trim()) score += 5;
        else suggestions.push({ text: "Add your LinkedIn profile", points: 5 });

        // 10. GitHub (+5)
        if (personalInfo.github?.trim()) score += 5;
        else suggestions.push({ text: "Add your GitHub link", points: 5 });

        // 11. Action Verbs (+10)
        const actionVerbs = ['built', 'led', 'designed', 'improved', 'developed', 'managed', 'created', 'implemented', 'optimized', 'increased', 'decreased', 'reduced', 'coordinated'];
        const hasActionVerbs = actionVerbs.some(verb => summary?.toLowerCase().includes(verb));
        if (hasActionVerbs) score += 10;
        else suggestions.push({ text: "Use action verbs in summary", points: 10 });

        return {
            score: Math.min(score, 100),
            suggestions: suggestions.sort((a, b) => b.points - a.points).slice(0, 3)
        };
    }, [data]);

    const { score, suggestions } = calculation;

    const getScoreInfo = () => {
        if (score <= 40) return { label: 'Needs Work', color: 'text-rose-500', bg: 'text-rose-500' };
        if (score <= 70) return { label: 'Getting There', color: 'text-amber-500', bg: 'text-amber-500' };
        return { label: 'Strong Resume', color: 'text-emerald-500', bg: 'text-emerald-500' };
    };

    const status = getScoreInfo();

    return (
        <div className="premium-card p-6 bg-slate-900 text-white space-y-6 overflow-hidden relative">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-colors duration-1000 ${status.color.replace('text', 'bg')}`} />

            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">ATS Readiness Score</p>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black transition-colors duration-1000 ${status.color}`}>{score}</span>
                        <span className="text-slate-500 font-medium">/ 100</span>
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${status.color}`}>{status.label}</p>
                </div>
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform">
                        <circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-slate-800"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 34}
                            strokeDashoffset={2 * Math.PI * 34 * (1 - score / 100)}
                            className={`transition-all duration-1000 ease-out ${status.color}`}
                        />
                    </svg>
                    <span className="absolute text-[11px] font-black">{score}%</span>
                </div>
            </div>

            {suggestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-800 relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Top Improvements</p>
                    <ul className="space-y-2.5">
                        {suggestions.map((s, i) => (
                            <li key={i} className="flex items-center justify-between text-[11px] text-slate-300 group">
                                <div className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                                    {s.text}
                                </div>
                                <span className="font-bold text-slate-500 text-[9px] bg-slate-800 px-1.5 py-0.5 rounded">+{s.points} pts</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AtsScore;

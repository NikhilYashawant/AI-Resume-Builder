import { useState, useEffect } from 'react';

const INITIAL_DATA = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    }
};

const SAMPLE_DATA = {
    personalInfo: {
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 0123',
        location: 'San Francisco, CA',
        github: 'github.com/arivera',
        linkedin: 'linkedin.com/in/arivera'
    },
    summary: 'Distinguished Software Engineer with 8+ years of experience in building scalable cloud architectures and leading high-performance engineering teams.',
    education: [
        { id: 1, school: 'Stanford University', degree: 'M.S. in Computer Science', date: '2016 - 2018' },
        { id: 2, school: 'UC Berkeley', degree: 'B.S. in EECS', date: '2012 - 2016' }
    ],
    experience: [
        { id: 1, company: 'TechNova Solutions', role: 'Staff Engineer', date: '2021 - Present', description: 'Architecting distributed systems serving 10M+ users daily.' },
        { id: 2, company: 'CloudScale Inc.', role: 'Senior Developer', date: '2018 - 2021', description: 'Reduced infrastructure costs by 40% through serverless migration.' }
    ],
    projects: [
        {
            id: 1,
            name: 'AetherDB',
            description: 'An open-source distributed database with eventual consistency.',
            techStack: ['Rust', 'gRPC', 'Raft'],
            githubUrl: 'github.com/arivera/aether'
        }
    ],
    skills: {
        technical: ['React', 'Node.js', 'TypeScript', 'Python', 'Rust', 'Go'],
        soft: ['Leadership', 'Problem Solving', 'Strategic Planning'],
        tools: ['AWS', 'Docker', 'Kubernetes', 'GraphQL']
    }
};

export const useResume = () => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Migration check: if skills is still a string, convert to object
            if (typeof parsed.skills === 'string') {
                return {
                    ...parsed,
                    skills: { technical: parsed.skills.split(',').map(s => s.trim()), soft: [], tools: [] }
                };
            }
            return parsed;
        }
        return INITIAL_DATA;
    });

    const [template, setTemplate] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderTemplate');
        return saved || 'Classic';
    });

    const [themeColor, setThemeColor] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderThemeColor');
        return saved || 'hsl(168, 60%, 40%)';
    });

    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resumeBuilderTemplate', template);
    }, [template]);

    useEffect(() => {
        localStorage.setItem('resumeBuilderThemeColor', themeColor);
    }, [themeColor]);

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
    };

    const updateSummary = (summary) => {
        setResumeData(prev => ({ ...prev, summary }));
    };

    const updateSkills = (category, skills) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: skills
            }
        }));
    };

    const suggestSkills = async () => {
        await new Promise(r => setTimeout(r, 1000));
        setResumeData(prev => ({
            ...prev,
            skills: {
                technical: [...new Set([...prev.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                soft: [...new Set([...prev.skills.soft, "Team Leadership", "Problem Solving"])],
                tools: [...new Set([...prev.skills.tools, "Git", "Docker", "AWS"])]
            }
        }));
    };

    const addItem = (section) => {
        const newItem = { id: Date.now() };
        if (section === 'projects') {
            newItem.techStack = [];
        }
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const updateItem = (section, id, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === id ? { ...item, ...data } : item)
        }));
    };

    const removeItem = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const loadSampleData = () => {
        setResumeData(SAMPLE_DATA);
    };

    return {
        resumeData,
        template,
        setTemplate,
        themeColor,
        setThemeColor,
        updatePersonalInfo,
        updateSummary,
        updateSkills,
        suggestSkills,
        addItem,
        updateItem,
        removeItem,
        loadSampleData
    };
};

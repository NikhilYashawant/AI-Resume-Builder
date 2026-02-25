import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 bg-slate-50">
            <div className="max-w-3xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                        Build a Resume That <span className="text-slate-400 italic">Gets Read.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Design-forward, ATS-friendly resumes crafted with intentionality and premium aesthetics.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/builder')}
                        className="premium-button-primary"
                    >
                        Start Building
                    </button>
                    <button
                        className="premium-button-secondary"
                    >
                        Explore Templates
                    </button>
                </div>

                <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Premium Design", desc: "Minimalist, calm, and professional layouts." },
                        { title: "Real-time Preview", desc: "See your changes instantly as you type." },
                        { title: "ATS Ready", desc: "Optimized for modern hiring systems." }
                    ].map((feature, i) => (
                        <div key={i} className="space-y-2">
                            <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

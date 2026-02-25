import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50 no-print">
            <div className="flex items-center gap-8">
                <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900">
                    AI Resume Builder
                </NavLink>
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/builder"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-500'}`
                        }
                    >
                        Builder
                    </NavLink>
                    <NavLink
                        to="/preview"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-500'}`
                        }
                    >
                        Preview
                    </NavLink>
                    <NavLink
                        to="/rb/proof"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-500'}`
                        }
                    >
                        Proof
                    </NavLink>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest">
                    Beta
                </span>
            </div>
        </nav>
    );
};

export default Navbar;

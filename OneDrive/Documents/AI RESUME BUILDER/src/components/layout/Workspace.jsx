import React from 'react';

const Workspace = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px] p-8">
                {children}
            </div>
        </div>
    );
};

export default Workspace;

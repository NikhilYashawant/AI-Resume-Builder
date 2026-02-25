import React from 'react';

const ContextHeader = ({ title, description }) => {
    return (
        <div className="border-b border-slate-100 bg-white px-8 py-6 no-print">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {description && <p className="mt-2 text-slate-500">{description}</p>}
        </div>
    );
};

export default ContextHeader;

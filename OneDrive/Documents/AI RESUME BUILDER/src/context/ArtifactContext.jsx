import React, { createContext, useContext, useState, useEffect } from 'react';
import { STEPS } from '../data/steps';

const ArtifactContext = createContext();

export const ArtifactProvider = ({ children }) => {
    const [artifacts, setArtifacts] = useState({});

    useEffect(() => {
        // Load artifacts from localStorage on mount
        const loadedArtifacts = {};
        STEPS.forEach(step => {
            const stored = localStorage.getItem(step.artifactKey);
            if (stored) {
                loadedArtifacts[step.id] = stored;
            }
        });
        setArtifacts(loadedArtifacts);
    }, []);

    const saveArtifact = (stepId, content) => {
        const step = STEPS.find(s => s.id === stepId);
        if (step) {
            localStorage.setItem(step.artifactKey, content);
            setArtifacts(prev => ({ ...prev, [stepId]: content }));
        }
    };

    const hasArtifact = (stepId) => {
        return !!artifacts[stepId];
    };

    return (
        <ArtifactContext.Provider value={{ artifacts, saveArtifact, hasArtifact }}>
            {children}
        </ArtifactContext.Provider>
    );
};

export const useArtifacts = () => useContext(ArtifactContext);

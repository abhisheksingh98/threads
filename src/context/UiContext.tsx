import React, { createContext, useContext, useState, ReactNode } from 'react';

type Tab = 'home' | 'search' | 'activity' | 'profile';
type Theme = 'light' | 'dark';

interface UiContextType {
    isCreateModalOpen: boolean;
    activeTab: Tab;
    theme: Theme;
    toggleCreateModal: () => void;
    setActiveTab: (tab: Tab) => void;
    toggleTheme: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [theme, setTheme] = useState<Theme>('light');

    const toggleCreateModal = () => setIsCreateModalOpen(prev => !prev);
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <UiContext.Provider value={{
            isCreateModalOpen,
            activeTab,
            theme,
            toggleCreateModal,
            setActiveTab,
            toggleTheme
        }}>
            {children}
        </UiContext.Provider>
    );
};

export const useUi = () => {
    const context = useContext(UiContext);
    if (context === undefined) {
        throw new Error('useUi must be used within a UiProvider');
    }
    return context;
};

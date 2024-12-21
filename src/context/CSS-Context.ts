import { createContext, useContext } from "react";

interface I_CSS_Responsive_Context {
    isDocIndexOpen: boolean;
    setIsDocIndexOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDocBookmarkOpen: boolean;
    setIsDocBookmarkOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResponsiveContext = createContext<I_CSS_Responsive_Context | undefined>(undefined);

export const useResponsiveContext = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error("useResponsiveContext must be used within an Provider")
    }
    return context
}

export const ResponsiveContextProvider = ResponsiveContext.Provider
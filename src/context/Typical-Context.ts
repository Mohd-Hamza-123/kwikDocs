import { createContext, useContext } from "react";

interface I_TypialContext {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TypicalContext = createContext<I_TypialContext | undefined>(undefined);

export const useTypicalContext = () => {
    const context = useContext(TypicalContext);
    if (!context) {
        throw new Error("useTypicalContext must be used within an Provider")
    }
    return context
}

export const TypicalContextProvider = TypicalContext.Provider
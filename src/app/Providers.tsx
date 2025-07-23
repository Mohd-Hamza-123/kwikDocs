'use client'
import React, { ReactNode } from 'react'
import ThemeProvider from './ThemeProvider'
import QueryProvider from './QueryProvider'
import StoreProvider from './StoreProvider'
import InitializationWrapper from './InitializationWrapper'
import CSS_Context_Provider_Wrapper from '@/context/CSS_Context_Provider'
import TypicalContextProviderWrapper from '@/context/TypicalContextProvider'

const Providers = ({ children }: { children: ReactNode }) => {
    
    return (
        <ThemeProvider>
            <StoreProvider>
                <TypicalContextProviderWrapper>
                    <CSS_Context_Provider_Wrapper>
                        <QueryProvider>
                            <InitializationWrapper>
                                {children}
                            </InitializationWrapper>
                        </QueryProvider>
                    </CSS_Context_Provider_Wrapper>
                </TypicalContextProviderWrapper>
            </StoreProvider>
        </ThemeProvider>
    );
};

export default Providers
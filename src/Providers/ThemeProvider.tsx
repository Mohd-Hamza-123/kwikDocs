'use client'
import React, { ReactNode} from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => setMounted(true), [])

    // if (!mounted) return <>{children}</>

    return (
        <NextThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme={false}>
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider
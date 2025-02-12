'use client'
import { useAppSelector } from '@/lib/hooks/hooks';
import React from 'react';

const OverlayLoader = () => {

    const isLoading = useAppSelector((state) => state.loadingSlice.overlayLoading)
    const loadingMsg = useAppSelector((state) => state.loadingSlice.overlayLoadingMsg)
    
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-white dark:bg-bgDark bg-opacity-50 flex flex-col gap-2 items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <h4 className='text-center text-black dark:text-slate-200 text-md'>{loadingMsg || 'please wait...'}</h4>
        </div>
    );
};

export default OverlayLoader;
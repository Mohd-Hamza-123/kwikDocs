import { createSlice } from '@reduxjs/toolkit'

export interface PostItemsProps {
    slug: string;
    title: string;
    description?: string | undefined;
    slugAsParams: string;
    body: string;
    published: boolean
}

export interface CounterState {
    post: any,
    activeSlug: string,
}

const initialState: CounterState = {
    post: null,
    activeSlug: '',
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.post = action.payload.post
        },
        setActiveSlug: (state, action) => {
            state.activeSlug = action.payload.activeSlug
        }
    },
})

export const { setPosts, setActiveSlug } = postSlice?.actions

export default postSlice.reducer
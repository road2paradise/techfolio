import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Error } from "../models/error";
import { RootState } from "../store/store";
import axios from 'axios';
import { baseURL } from '../constants/url';
import { ContentClient } from '../clients/client';

export const fetchContent = createAsyncThunk(
    'content/fetchAll',
    async () => {
        try {
            var client = new ContentClient();
            var response = await client.get();
            return response;
        } catch (error) {
            throw error;
        }
    }
)
export type Introduction = {
    heading: string,
    headingList: string[]
}

export interface Content {
    introduction: Introduction
}

export interface ContentState {
    content: Introduction[],
    loadingState: "HAS_NOT_LOADED" | "IS_LOADING" | "HAS_LOADED",
    error?: Error,
}

const initialState = {
    content: [],
    loadingState: "HAS_NOT_LOADED",
    error: undefined,
} as ContentState

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContent.fulfilled, (state, action) => {
                state.content = action.payload
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchContent.rejected, (state, action) => {
                state.loadingState = "HAS_LOADED"
                state.error = action.payload as Error
            })
            .addCase(fetchContent.pending, (state, action) => {
                state.loadingState = "IS_LOADING"
            })
  }
})

export const selectContent = (state: RootState): ContentState => state.content;
export default contentSlice.reducer
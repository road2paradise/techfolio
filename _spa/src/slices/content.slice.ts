import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Error } from "../models/error";
import { RootState } from "../store/store";
import { AssetDto, ContentClient, WorkExperienceDto } from '../clients/client';

const client = new ContentClient();
export const fetchGreetings = createAsyncThunk(
    'content/fetchGreetings',
    async () => {
        try {
            return (await client.getGreetings()).greetingsList;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchAssets = createAsyncThunk(
    'content/fetchAssets',
    async () => {
        try {
            return await client.getAssets();
        } catch (error) {
            throw error;
        }
    }
);

export const fetchWorkExperience = createAsyncThunk(
    'content/fetchWorkExperience',
    async () => {
        try {
            return await client.getWorkExperience();
        } catch (error) {
            throw error;
        }
    }
)
export interface ContentState {
    greetings: string[],
    assets: AssetDto[],
    workExperience: WorkExperienceDto[],
    loadingState: "HAS_NOT_LOADED" | "IS_LOADING" | "HAS_LOADED",
    error?: Error,
}

const initialState = {
    greetings: [],
    assets: [],
    workExperience: [],
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
            .addCase(fetchGreetings.fulfilled, (state, action) => {
                state.greetings = action.payload    
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchGreetings.rejected, (state, action) => {
                state.loadingState = "HAS_LOADED"
                state.error = action.payload as Error
            })
            .addCase(fetchGreetings.pending, (state, _) => {
                state.loadingState = "IS_LOADING"
            })
            .addCase(fetchAssets.pending, (state, _) => {
                state.loadingState = "IS_LOADING"
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.assets = action.payload
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.loadingState = "HAS_LOADED"
                state.error = action.payload as Error
            })
            .addCase(fetchWorkExperience.pending, (state, _) => {
                state.loadingState = "IS_LOADING"
            })
            .addCase(fetchWorkExperience.fulfilled, (state, action) => {
                state.workExperience = action.payload
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchWorkExperience.rejected, (state, action) => {
                state.loadingState = "HAS_LOADED"
                state.error = action.payload as Error
            })
  }
})

export const selectContent = (state: RootState): ContentState => state.content;
export default contentSlice.reducer
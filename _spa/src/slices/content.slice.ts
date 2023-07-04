import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Error } from "../models/error";
import { RootState } from "../store/store";
import { IWebsiteBodyTextFields, IWorkExperienceFields } from '../generated/contentful';
import { mapAssets, mapWebsiteBodyText, mapWorkExperience } from '../helpers/mappers';
import { Asset } from 'contentful';

const compareByDate = (a: IWorkExperienceFields, b: IWorkExperienceFields):any => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return  dateB.getTime() - dateA.getTime();
};

export const fetchWebsiteBodyText = createAsyncThunk(
    'content/fetchWebsiteBodyText',
    async () => {
        try {
        return mapWebsiteBodyText();
        } catch (error) {
            throw error;
        }
    }
);

export const fetchAssets = createAsyncThunk(
    'content/fetchAssets',
    async () => {
        try {
            return await mapAssets();
        } catch (error) {
            throw error;
        }
    }
);

export const fetchWorkExperience = createAsyncThunk(
    'content/fetchWorkExperience',
    async () => {
        try {
            const content = mapWorkExperience();
            return (await content).sort(compareByDate)
        } catch (error) {
            throw error;
        }
    }
)
export interface ContentState {
    body: IWebsiteBodyTextFields,
    assets: Asset[],
    workExperience: IWorkExperienceFields[],
    loadingState: "HAS_NOT_LOADED" | "IS_LOADING" | "HAS_LOADED",
    error?: Error,
}

const initialState = {
    body: {
        greetings: [],
        welcomeParagraph: "",
        name: "",
        jobTitle: "",
        quotes: [],
    },
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
            .addCase(fetchWebsiteBodyText.fulfilled, (state, action) => {
                state.body = action.payload[0]    
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchWebsiteBodyText.rejected, (state, action) => {
                state.loadingState = "HAS_LOADED"
                state.error = action.payload as Error
            })
            .addCase(fetchWebsiteBodyText.pending, (state, _) => {
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
export const selectProfilePicture = (state: RootState): Asset => state.content.assets.filter(a => a.fields.file?.contentType!.toString().toLowerCase().includes("image"))[0];
export const selectCV = (state: RootState): Asset => state.content.assets.filter(a => a.sys.type.toLowerCase().includes("pdf"))[0];
export default contentSlice.reducer
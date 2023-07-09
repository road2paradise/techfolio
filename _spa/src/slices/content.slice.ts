import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Error } from "../models/error";
import { RootState } from "../store/store";
import { IWebsiteBodyTextFields, IWorkExperienceFields } from '../generated/contentful';
import { mapSections, mapAssets, mapWebsiteBodyText, mapWorkExperience, Sections } from '../helpers/mappers';
import { Asset } from 'contentful';

const compareByDate = (a: IWorkExperienceFields, b: IWorkExperienceFields):any => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return  dateB.getTime() - dateA.getTime();
};

export const fetchWebsiteContent = createAsyncThunk(
    'content/fetchWebsiteContent', 
    async () => {
        try {
            const response = await (await fetch('/content.json')).json();
            const body = await mapWebsiteBodyText(response);
            const assets = await mapAssets(response);
            const workExperience = (await mapWorkExperience(response)).sort(compareByDate)
            const sections = (await mapSections(response));
            return {
                body,
                assets,
                workExperience,
                sections
            }
        } catch (error) {
            throw error;
        }
    }
)


export type Content = {
    body: IWebsiteBodyTextFields,
    sections: Sections[]
    assets: Asset[],
    workExperience: IWorkExperienceFields[]
}
export interface ContentState {
    content?: Content,
    loadingState: "HAS_NOT_LOADED" | "IS_LOADING" | "HAS_LOADED",
    error?: Error,
}

const initialState = {
    content: undefined,
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
            .addCase(fetchWebsiteContent.fulfilled, (state, action) => {
                state.content = action.payload
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchWebsiteContent.rejected, (state, action) => {
                state.error = action.payload as Error
                state.loadingState = "HAS_LOADED"
            })
            .addCase(fetchWebsiteContent.pending, (state, action) => {
                state.loadingState = "IS_LOADING"
            })
  }
})

export const selectContent = (state: RootState): Content | undefined => state.content.content;
export const selectBody = (state: RootState): IWebsiteBodyTextFields | undefined => state.content.content?.body;
export const selectWorkExperience = (state: RootState): IWorkExperienceFields[] | undefined => state.content.content?.workExperience;
export const selectAssets = (state: RootState): Asset[] | undefined => state.content.content?.assets;
export const selectProfilePicture = (state: RootState): Asset | undefined => state.content.content?.assets.filter(a => a.fields.title!.toString().toLowerCase().includes("profile picture"))[0];
export const selectAboutSection = (state: RootState): Sections | undefined => state.content.content?.sections.filter(s => s.title?.toLowerCase() === "about")[0]
export default contentSlice.reducer
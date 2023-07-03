import { IWebsiteBodyTextFields, IWorkExperienceFields } from "../generated/contentful";
import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";


// This is to allow me to host content within my public folder.
const getContentData = async () => {
    try {
      const response = await fetch('/content.json');
      if (!response.ok) {
        throw new Error('Failed to fetch content data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const mapWebsiteBodyText =  async (): Promise<IWebsiteBodyTextFields[]> => {
    const content = await getContentData();
    return content
        .filter((entry: any) => entry.sys.contentType?.sys.id === "websiteBodyText")
        .map((entry: any) => {
            const { fields } = entry;            
            return {
            jobTitle: fields.jobTitle ?? '',
            name: fields.name ?? '',
            welcomeParagraph: fields.welcomeParagraph ?? '',
            greetings: fields.greetings ?? [],
            quotes: fields.quotes ?? [],
            };
        });
}

export const mapWorkExperience = async (): Promise<IWorkExperienceFields[]> => {
    const content = await getContentData();
    return content
    .filter((entry: any) => entry.sys.contentType?.sys.id === "workExperience")
    .map((entry: any) => {
        const { fields } = entry;
        return {
            jobTitle: fields.jobTitle ?? '',
            companyName: fields.companyName ?? '',
            location: fields.location ?? '',
            startDate: fields.startDate ?? '',
            endDate: fields.endDate ?? '',
            description: fields.description as Document,
        };
    });
}


export const mapAssets = async (): Promise<Asset[]> => {
    const content = await getContentData();
    return content
      .filter((entry: any) => entry.sys.type === "Asset")
      .map((entry: any) => entry as Asset);
  };
import { IImage, ISectionFields, IWebsiteBodyTextFields, IWorkExperienceFields } from "../generated/contentful";
import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";

export interface Sections extends ISectionFields {
    assets: Asset[]
}

export const mapSections = async (content: any): Promise<Sections[]> => {
    return content.filter((entry: any) => entry.sys.contentType?.sys.id === "section")
        .map((entry: any) => {
            const { fields } = entry;
            /* Because im noob :( */
            const imageId = fields.images.map((x: IImage) => x.sys.id);
            const entryId = content.filter((i: any) => imageId.includes(i.sys.id)).map((x: any) => x.fields.image.sys.id);
            const assets = content.filter((i: any) => entryId.includes(i.sys.id));
            return {
                title: fields.title ?? "",
                content: fields.content ?? "",
                images: fields.images ?? "",
                assets: assets
            }
        });
}


export const mapWebsiteBodyText = async (content: any): Promise<IWebsiteBodyTextFields> => {
  const filteredEntries = content.filter((entry: any) => entry.sys.contentType?.sys.id === "websiteBodyText");
  const { fields } = filteredEntries[0];

  return {
      jobTitle: fields.jobTitle ?? '',
      name: fields.name ?? '',
      welcomeParagraph: fields.welcomeParagraph ?? '',
      greetings: fields.greetings ?? [],
      quotes: fields.quotes ?? [],
  };
};

export const mapWorkExperience = async (content: any): Promise<IWorkExperienceFields[]> => {
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


export const mapAssets = async (content: any): Promise<Asset[]> => {
    return content
      .filter((entry: any) => entry.sys.type === "Asset")
      .map((entry: any) => entry as Asset);
};
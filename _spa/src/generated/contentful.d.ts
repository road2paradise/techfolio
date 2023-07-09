// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IImageFields {
  /** Image */
  image: Asset;

  /** Caption */
  caption: string;

  /** ImageType */
  imageType:
    | "About"
    | "Introduction"
    | "WorkExperience"
    | "Projects"
    | "Contact";
}

/** Image used in my personal website */

export interface IImage extends Entry<IImageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "image";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISectionFields {
  /** Title */
  title?: string | undefined;

  /** Content */
  content: Document;

  /** Images */
  images?: IImage[] | undefined;
}

/** Each section of my website */

export interface ISection extends Entry<ISectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "section";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IWebsiteBodyTextFields {
  /** JobTitle */
  jobTitle: string;

  /** Name */
  name: string;

  /** WelcomeParagraph */
  welcomeParagraph: string;

  /** Greetings */
  greetings: string[];

  /** Quotes */
  quotes?: string[] | undefined;
}

/** Body text for various places in my personal website */

export interface IWebsiteBodyText extends Entry<IWebsiteBodyTextFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "websiteBodyText";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IWorkExperienceFields {
  /** Job Title */
  jobTitle: string;

  /** Company Name */
  companyName: string;

  /** Location */
  location?: string | undefined;

  /** Start Date */
  startDate: string;

  /** End Date */
  endDate?: string | undefined;

  /** Description */
  description: Document;
}

/** This is a section in my techfolio detailing my work experience. */

export interface IWorkExperience extends Entry<IWorkExperienceFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "workExperience";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "image"
  | "section"
  | "websiteBodyText"
  | "workExperience";

export type IEntry = IImage | ISection | IWebsiteBodyText | IWorkExperience;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";

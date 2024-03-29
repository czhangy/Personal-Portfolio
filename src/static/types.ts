import { Project as ProjectModel } from "@prisma/client";

/** JSX elements rendered conditionally */
export type ConditionalJSX = JSX.Element | "";

/** HTML element that has been selected by a queryBy... method */
export type QueriedHTMLElement = HTMLElement | null;

/** HTML elements that have been selected by a queryAllBy... method */
export type QueriedHTMLElements = HTMLElement[];

/** Left/right side */
export type Side = "left" | "right";

/** Social media sites used on the site */
export type Social = "github" | "linkedin" | "instagram" | "twitter";

/** Project object definition */
export type Project = Omit<ProjectModel, "id">;

/** Experience object definition */
export type Experience = {
    company: string;
    logo: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string[];
};

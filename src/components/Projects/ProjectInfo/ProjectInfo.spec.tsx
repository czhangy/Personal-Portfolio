import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import {
    mockMultiToolProject,
    mockNoGitHubProject,
    mockNoLinkProject,
    mockNoLinksProject,
    mockNoToolsProject,
    mockProject,
} from "@/mocks/projects";
import { mockTool1, mockTool2 } from "@/mocks/tools";
import {
    ALT,
    GIT_LINK_ALT,
    HEADING,
    HREF,
    IMAGE,
    LINK,
    LIST,
    LIST_ITEM,
    SITE_LINK_ALT,
} from "@/static/constants";
import { QueriedHTMLElement, QueriedHTMLElements } from "@/static/types";

import ProjectInfo, { ProjectInfoProps } from "./ProjectInfo";

describe("ProjectInfo", () => {
    /** The number of sections required to be in the component */
    const MIN_SECTIONS: number = 2;
    /** The number of sections that can be in the component */
    const MAX_SECTIONS: number = 3;
    /** The index of the category section */
    const CATEGORY_SECTION_IDX: number = 0;
    /** The index of the summary section */
    const SUMMARY_SECTION_IDX: number = 1;
    /** The index of the tools section */
    const TOOLS_SECTION_IDX: number = 2;
    /** The title of the summary section */
    const SUMMARY_TITLE: string = "Summary";
    /** The title of the tools section */
    const TOOLS_TITLE: string = "Tools";

    let images: QueriedHTMLElements;
    let headings: QueriedHTMLElements;
    let links: QueriedHTMLElements;
    let toolsList: QueriedHTMLElement;
    let tools: QueriedHTMLElements;

    /**
     * Checks to see if the tools section is rendered correctly
     */
    const assertToolsSectionRenders = (): void => {
        expect(headings.length).toBe(MAX_SECTIONS);
        expect(headings[TOOLS_SECTION_IDX]).toHaveTextContent(TOOLS_TITLE);
        expect(toolsList).toBeInTheDocument();
    };

    /**
     * Checks to see if a GitHub link is rendered correctly
     */
    const assertGitHubLinkRenders = (
        link: HTMLElement,
        image: HTMLElement,
        href: string,
    ): void => {
        expect(link).toHaveAttribute(HREF, href);
        expect(image).toHaveAttribute(ALT, GIT_LINK_ALT);
    };

    /**
     * Checks to see if a site link is rendered correctly
     */
    const assertSiteLinkRenders = (
        link: HTMLElement,
        image: HTMLElement,
        href: string,
    ): void => {
        expect(link).toHaveAttribute(HREF, href);
        expect(image).toHaveAttribute(ALT, SITE_LINK_ALT);
    };

    /**
     * Renders the component and assigns local variables
     *
     * @param {ProjectInfoProps} props Props to pass to the component
     */
    const renderProjectInfo = (props: ProjectInfoProps): void => {
        render(<ProjectInfo project={props.project} tools={props.tools} />);
        images = screen.queryAllByRole(IMAGE);
        headings = screen.queryAllByRole(HEADING);
        links = screen.queryAllByRole(LINK);
        toolsList = screen.queryByRole(LIST);
        tools = screen.queryAllByRole(LIST_ITEM);
    };

    it("Renders correctly", () => {
        renderProjectInfo({ project: mockProject, tools: [mockTool1] });
        expect(images[0]).toHaveAttribute(ALT, mockProject.name);
        expect(headings[CATEGORY_SECTION_IDX]).toHaveTextContent(
            mockProject.category,
        );
        expect(screen.queryByTestId("project-summary")).toHaveTextContent(
            mockProject.summary,
        );
        expect(headings[SUMMARY_SECTION_IDX]).toHaveTextContent(SUMMARY_TITLE);
    });

    it("Renders the links section correctly when no links are present", () => {
        renderProjectInfo({ project: mockNoLinksProject, tools: [mockTool1] });
        expect(links.length).toBe(0);
        expect(images.length).toBe(1);
    });

    it("Renders the links section correctly when the GitHub link isn't present", () => {
        renderProjectInfo({ project: mockNoGitHubProject, tools: [mockTool1] });
        expect(links.length).toBe(1);
        expect(images.length).toBe(2);
        assertSiteLinkRenders(
            links[0],
            images[1],
            mockNoGitHubProject.siteLink!,
        );
    });

    it("Renders the links section correctly when the site link isn't present", () => {
        renderProjectInfo({ project: mockNoLinkProject, tools: [mockTool1] });
        expect(links.length).toBe(1);
        expect(images.length).toBe(2);
        assertGitHubLinkRenders(
            links[0],
            images[1],
            mockNoLinkProject.gitLink!,
        );
    });

    it("Renders the links section correctly when both links are present", () => {
        renderProjectInfo({ project: mockProject, tools: [mockTool1] });
        expect(links.length).toBe(2);
        expect(images.length).toBe(3);
        assertGitHubLinkRenders(links[0], images[1], mockProject.gitLink!);
        assertSiteLinkRenders(links[1], images[2], mockProject.siteLink!);
    });

    it("Renders the tool section correctly when no tools are present", () => {
        renderProjectInfo({ project: mockNoToolsProject, tools: [] });
        expect(headings.length).toBe(MIN_SECTIONS);
        expect(toolsList).not.toBeInTheDocument();
        expect(tools.length).toBe(0);
    });

    it("Renders the tool section correctly when 1 tool is present", () => {
        renderProjectInfo({ project: mockProject, tools: [mockTool1] });
        assertToolsSectionRenders();
        expect(tools.length).toBe(1);
    });

    it("Renders the tool section correctly when multiple tool is present", () => {
        renderProjectInfo({
            project: mockMultiToolProject,
            tools: [mockTool1, mockTool2],
        });
        assertToolsSectionRenders();
        expect(tools.length).toBe(2);
    });
});

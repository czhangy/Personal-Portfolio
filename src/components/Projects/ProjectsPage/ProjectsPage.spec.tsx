import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockProjects } from "@/mocks/projects";
import { mockTools } from "@/mocks/tools";
import { BUTTON, LEFT, RIGHT } from "@/static/constants";
import { QueriedHTMLElements } from "@/static/types";

import ProjectsPage from "./ProjectsPage";

describe("ProjectsPage", () => {
    /** Index of the left door for a list of doors in the component */
    const LEFT_DOOR_IDX: number = 0;
    /** Index of the right door for a list of doors in the component */
    const RIGHT_DOOR_IDX: number = 1;
    /** Number of info components (modal + info) */
    const NUM_INFO_COMPONENTS: number = 2;
    /** Number of doors */
    const NUM_DOORS: number = 2;

    let projectDoors: QueriedHTMLElements;
    let projectButtons: QueriedHTMLElements;

    /**
     * A mock of Element.scrollTo for testing purposes
     */
    const mockScrollTo = jest.fn().mockImplementation();

    /**
     * Checks to see if the component is in a state where no project is set
     */
    const assertProjectUnset = (): void => {
        expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
        expect(screen.queryByTestId("project-info")).not.toBeInTheDocument();
        expect(projectDoors[LEFT_DOOR_IDX]).toHaveClass("closed");
        expect(projectDoors[RIGHT_DOOR_IDX]).toHaveClass("closed");
        expect(screen.queryByTestId("scroll-container")).toHaveClass(
            "disabled",
        );
    };

    /**
     * Checks to see if the component is in a state where a project has been set
     *
     * @param {string} projectName The name of the project that is being set
     */
    const assertProjectSet = (projectName: string): void => {
        expect(screen.queryByTestId("modal-overlay")).toBeInTheDocument();
        expect(screen.queryAllByTestId("project-info").length).toBe(
            NUM_INFO_COMPONENTS,
        );
        expect(projectDoors[LEFT_DOOR_IDX]).not.toHaveClass("closed");
        expect(projectDoors[RIGHT_DOOR_IDX]).not.toHaveClass("closed");
        expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
        expect(screen.queryByTestId("scroll-container")).not.toHaveClass(
            "disabled",
        );
        expect(screen.queryAllByAltText(projectName).length).toBe(
            NUM_INFO_COMPONENTS,
        );
    };

    /**
     * Renders the component and assigns local variables
     */
    const renderProjectsPage = (): void => {
        render(<ProjectsPage projects={mockProjects} tools={mockTools} />);
        Element.prototype.scrollTo = mockScrollTo;
        projectDoors = screen.queryAllByTestId("door");
        projectButtons = screen.queryAllByRole(BUTTON);
    };

    it("Renders correctly", () => {
        renderProjectsPage();
        expect(projectDoors.length).toBe(NUM_DOORS);
        expect(projectDoors[LEFT_DOOR_IDX]).toHaveClass(LEFT);
        expect(projectDoors[RIGHT_DOOR_IDX]).toHaveClass(RIGHT);
        expect(screen.queryByTestId("projects-menu")).toBeInTheDocument();
        assertProjectUnset();
    });

    it("Renders components correctly when a project is selected", async () => {
        renderProjectsPage();
        expect(projectButtons[0]).toHaveTextContent(mockProjects[0].name);
        fireEvent.click(projectButtons[0]);
        await waitFor(() => assertProjectSet(mockProjects[0].name));
    });

    it("Renders components correctly when a project is unselected from the menu", async () => {
        renderProjectsPage();
        expect(projectButtons[0]).toHaveTextContent(mockProjects[0].name);
        fireEvent.click(projectButtons[0]);
        await waitFor(() => assertProjectSet(mockProjects[0].name));
        fireEvent.click(projectButtons[0]);
        await waitFor(assertProjectUnset);
    });

    it("Renders components correctly when a project is unselected from the modal", async () => {
        renderProjectsPage();
        expect(projectButtons[0]).toHaveTextContent(mockProjects[0].name);
        fireEvent.click(projectButtons[0]);
        await waitFor(() => assertProjectSet(mockProjects[0].name));
        fireEvent.click(screen.getByTestId("modal-overlay"));
        await waitFor(assertProjectUnset);
    });

    it("Renders components correctly when a different project is selected", async () => {
        renderProjectsPage();
        expect(projectButtons[0]).toHaveTextContent(mockProjects[0].name);
        fireEvent.click(projectButtons[0]);
        await waitFor(() => assertProjectSet(mockProjects[0].name));
        fireEvent.click(projectButtons[1]);
        await waitFor(() => {
            expect(projectDoors[LEFT_DOOR_IDX]).toHaveClass("closed");
            expect(projectDoors[RIGHT_DOOR_IDX]).toHaveClass("closed");
            expect(screen.queryByTestId("scroll-container")).toHaveClass(
                "disabled",
            );
        });
        await waitFor(() => assertProjectSet(mockProjects[1].name));
    });
});

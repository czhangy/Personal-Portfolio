import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockProjects } from "@/mocks/projects";
import { BUTTON, LIST, LIST_ITEM } from "@/static/constants";
import {
    Project,
    QueriedHTMLElement,
    QueriedHTMLElements,
} from "@/static/types";

import ProjectsMenu from "./ProjectsMenu";

describe("ProjectsMenu", () => {
    let menu: QueriedHTMLElement;
    let buttons: QueriedHTMLElements;

    /**
     * A select handler for testing purposes
     */
    const mockSelectHandler = jest.fn().mockImplementation();

    /**
     * Renders the component and assigns local variables
     */
    const renderProjectsMenu = (): void => {
        render(
            <ProjectsMenu
                projects={mockProjects}
                onSelect={mockSelectHandler}
            />,
        );
        menu = screen.queryByRole(LIST);
        buttons = screen.queryAllByRole(BUTTON);
    };

    it("Renders correctly", () => {
        renderProjectsMenu();
        const cards: QueriedHTMLElements = screen.queryAllByRole(LIST_ITEM);
        expect(menu).not.toHaveClass("disabled");
        expect(cards.length).toBe(mockProjects.length);
        expect(buttons.length).toBe(mockProjects.length);
        mockProjects.forEach((project: Project, idx: number) =>
            expect(cards[idx]).toHaveTextContent(project.name),
        );
    });

    it("Calls the select handler on card click", () => {
        renderProjectsMenu();
        mockProjects.forEach((project: Project, idx: number) => {
            fireEvent.click(buttons[idx]);
            expect(mockSelectHandler).toHaveBeenCalledWith(project);
        });
    });

    it("Disables and re-enables on card click", async () => {
        renderProjectsMenu();
        fireEvent.click(buttons[0]);
        expect(menu).toHaveClass("disabled");
        await waitFor(() => expect(menu).not.toHaveClass("disabled"));
    });
});

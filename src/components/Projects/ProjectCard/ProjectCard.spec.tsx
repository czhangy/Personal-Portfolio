import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { mockProject } from "@/mocks/projects";
import { BUTTON, HEADING } from "@/static/constants";
import { QueriedHTMLElement } from "@/static/types";

import ProjectCard from "./ProjectCard";

describe("ProjectCard", () => {
    let button: QueriedHTMLElement;

    /**
     * A click handler for testing purposes
     */
    const mockClickHandler = jest.fn().mockImplementation();

    /**
     * Renders the component and assigns local variables
     */
    const renderProjectCard = (): void => {
        render(
            <ProjectCard project={mockProject} onClick={mockClickHandler} />,
        );
        button = screen.queryByRole(BUTTON);
    };

    it("Renders correctly", () => {
        renderProjectCard();
        expect(button).toBeInTheDocument();
        expect(screen.queryByRole(HEADING)).toHaveTextContent(mockProject.name);
    });

    it("Calls the click handler when clicked", () => {
        renderProjectCard();
        expect(button).toBeInTheDocument();
        fireEvent.click(button!);
        expect(mockClickHandler).toHaveBeenCalled();
    });
});

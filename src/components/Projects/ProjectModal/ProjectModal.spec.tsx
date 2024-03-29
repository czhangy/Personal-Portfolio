import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockProject } from "@/mocks/projects";
import { mockTool1 } from "@/mocks/tools";
import { QueriedHTMLElement } from "@/static/types";

import ProjectModal from "./ProjectModal";

describe("ProjectModal", () => {
    let modalOverlay: QueriedHTMLElement;

    /**
     * A close handler for testing purposes
     */
    const mockCloseHandler = jest.fn().mockImplementation();

    /**
     * Renders the component and assigns local variables
     */
    const renderProjectModal = (): void => {
        render(
            <ProjectModal
                project={mockProject}
                tools={[mockTool1]}
                onClose={mockCloseHandler}
            />,
        );
        modalOverlay = screen.queryByTestId("modal-overlay");
    };

    it("Renders correctly", () => {
        renderProjectModal();
        expect(modalOverlay).not.toHaveClass("closing");
        expect(screen.queryByTestId("project-info")).toBeInTheDocument();
    });

    it("Calls the close handler when the overlay is clicked", async () => {
        renderProjectModal();
        fireEvent.click(modalOverlay!);
        await waitFor(() => expect(mockCloseHandler).toHaveBeenCalled());
    });
});

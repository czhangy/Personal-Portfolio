import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { IMAGE, LINK } from "@/static/constants";

import HomePage from "./HomePage";

describe("HomePage", () => {
    /** The about section title */
    const ABOUT_TITLE: string = "About Me";
    /** The projects section title */
    const PROJECTS_TITLE: string = "My Projects";
    /** The experience section title */
    const EXPERIENCE_TITLE: string = "My Experience";
    /** The number of cards on the page */
    const NUM_CARDS = 7;

    /**
     * Renders the component
     */
    const renderHomePage = (): void => {
        render(<HomePage />);
    };

    it("Renders expected content", () => {
        renderHomePage();
        expect(screen.queryByText(ABOUT_TITLE)).toBeInTheDocument();
        expect(screen.queryByText(PROJECTS_TITLE)).toBeInTheDocument();
        expect(screen.queryByText(EXPERIENCE_TITLE)).toBeInTheDocument();
        expect(screen.queryAllByRole(LINK).length).toBe(NUM_CARDS);
        expect(screen.queryAllByRole(IMAGE).length).toBe(NUM_CARDS);
    });
});

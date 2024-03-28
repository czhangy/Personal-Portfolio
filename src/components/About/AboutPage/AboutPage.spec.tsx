import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { HEADING, IMAGE } from "@/static/constants";

import AboutPage from "./AboutPage";

describe("AboutPage", () => {
    /** The number of sections expected on the page */
    const NUM_SECTIONS: number = 3;

    /**
     * Renders the component
     */
    const renderAboutPage = (): void => {
        render(<AboutPage />);
    };

    it("Renders correctly", () => {
        renderAboutPage();
        expect(screen.getAllByRole(HEADING).length).toBe(NUM_SECTIONS);
        expect(screen.getAllByRole(IMAGE).length).toBe(NUM_SECTIONS);
    });
});

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { HREF, LINK } from "@/static/constants";

import Navbar from "./Navbar";

describe("Navbar", () => {
    /**
     * Renders the component
     */
    const renderNavbar = (): void => {
        render(<Navbar />);
    };

    it("Renders correctly", () => {
        renderNavbar();
        expect(screen.queryAllByRole(LINK)[0]).toHaveAttribute(HREF, "/");
        expect(screen.queryByTestId("menu")).toBeInTheDocument();
    });
});

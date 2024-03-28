import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { ALT, IMAGE } from "@/static/constants";

import Image from "./Image";

describe("Image", () => {
    /** The text used for the test image's alt attribute */
    const ALT_TEXT: string = "Test";

    /**
     * Renders the component
     */
    const renderImage = (): void => {
        render(<Image src="/assets/images/default.webp" alt={ALT_TEXT} />);
    };

    it("Renders with the correct attributes", () => {
        renderImage();
        expect(screen.queryByRole(IMAGE)).toHaveAttribute(ALT, ALT_TEXT);
    });
});

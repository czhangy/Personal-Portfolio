import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import PageWrapper, { PageWrapperProps } from "./PageWrapper";

describe("PageWrapper", () => {
    /** The test ID used for the test child element */
    const TEST_ID: string = "test";

    /**
     * Renders the component
     *
     * @param {PageWrapperProps} props Props to pass to the component
     */
    const renderPageWrapper = (props: PageWrapperProps): void => {
        render(<PageWrapper>{props.children}</PageWrapper>);
    };

    it("Renders correctly", () => {
        renderPageWrapper({ children: <div data-testid={TEST_ID}></div> });
        expect(screen.queryByTestId(TEST_ID)).toBeInTheDocument;
    });
});

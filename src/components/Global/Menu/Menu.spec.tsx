import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BUTTON, HREF, LINK, LIST, LIST_ITEM } from "@/static/constants";
import { QueriedHTMLElement } from "@/static/types";

import Menu from "./Menu";

describe("Menu", () => {
    let overlay: QueriedHTMLElement;
    let menu: QueriedHTMLElement;
    let button: QueriedHTMLElement;
    let bar: QueriedHTMLElement;

    /** The names of the pages displayed in the menu */
    const PAGES: string[] = ["About", "Projects", "Experience"];

    /**
     * Checks that the menu is in a closed state
     */
    const assertMenuClosed = (): void => {
        expect(overlay).toHaveClass("hide");
        expect(menu).toHaveClass("closed");
        expect(bar).not.toHaveClass("cross");
    };

    /**
     * Renders the component and assigns local variables
     */
    const renderMenu = (): void => {
        render(<Menu />);
        overlay = screen.queryByTestId("menu-overlay");
        menu = screen.queryByRole(LIST);
        button = screen.queryByRole(BUTTON);
        bar = screen.queryByTestId("menu-bar");
    };

    it("Can be toggled open/closed by button press", async () => {
        renderMenu();
        expect(button).toBeInTheDocument();
        assertMenuClosed();
        fireEvent.click(button!);
        expect(overlay).toHaveClass("show");
        expect(menu).toHaveClass("open");
        expect(bar).toHaveClass("cross");
        fireEvent.click(button!);
        await waitFor(() => assertMenuClosed());
    });

    it("Navigates to other pages correctly", () => {
        renderMenu();
        const links: HTMLElement[] = screen.queryAllByRole(LINK);
        expect(links.length).toBe(PAGES.length);
        PAGES.forEach((page: string, idx: number) => {
            expect(links[idx]).toHaveTextContent(page);
            expect(links[idx]).toHaveProperty(
                HREF,
                `http://localhost/${page.toLowerCase()}`,
            );
        });
    });

    it("Closes menu on overlay click", async () => {
        renderMenu();
        fireEvent.click(button!);
        fireEvent.click(overlay!);
        await waitFor(() => assertMenuClosed());
    });

    it("Closes menu on nav click", async () => {
        renderMenu();
        fireEvent.click(button!);
        fireEvent.click(screen.getAllByRole(LIST_ITEM)[0]);
        await waitFor(() => assertMenuClosed());
    });

    it("Closes menu on scroll", async () => {
        renderMenu();
        fireEvent.click(button!);
        fireEvent.scroll(window);
        await waitFor(() => assertMenuClosed());
    });
});

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { LEFT, RIGHT } from "@/static/constants";
import { QueriedHTMLElement } from "@/static/types";

import ProjectDoor, { ProjectDoorProps } from "./ProjectDoor";

describe("ProjectDoor", () => {
    /** The string constant representing the decal on the left project door */
    const LEFT_DECAL: string = "</";
    /** The string constant representing the decal on the right project door */
    const RIGHT_DECAL: string = "/>";

    let door: QueriedHTMLElement;

    /**
     * Checks that the left door is rendered correctly
     */
    const assertLeftDoorRendered = (): void => {
        expect(door).toHaveClass(LEFT);
        expect(screen.queryByText(LEFT_DECAL)).toBeInTheDocument();
        expect(screen.queryByText(RIGHT_DECAL)).not.toBeInTheDocument();
    };

    /**
     * Checks that the right door is rendered correctly
     */
    const assertRightDoorRendered = (): void => {
        expect(door).toHaveClass(RIGHT);
        expect(screen.queryByText(RIGHT_DECAL)).toBeInTheDocument();
        expect(screen.queryByText(LEFT_DECAL)).not.toBeInTheDocument();
    };

    /**
     * Renders the component and assigns local variables
     *
     * @param {ProjectDoorProps} props Props to pass to the component
     */
    const renderProjectCard = (props: ProjectDoorProps): void => {
        render(<ProjectDoor side={props.side} open={props.open} />);
        door = screen.queryByTestId("door");
    };

    it("Renders correctly when open on the left", () => {
        renderProjectCard({ side: LEFT, open: true });
        expect(door).not.toHaveClass("closed");
        assertLeftDoorRendered();
    });

    it("Renders correctly when open on the right", () => {
        renderProjectCard({ side: RIGHT, open: true });
        expect(door).not.toHaveClass("closed");
        assertRightDoorRendered();
    });

    it("Renders correctly when closed on the left", () => {
        renderProjectCard({ side: LEFT, open: false });
        expect(door).toHaveClass("closed");
        assertLeftDoorRendered();
    });

    it("Renders correctly when closed on the right", () => {
        renderProjectCard({ side: RIGHT, open: false });
        expect(door).toHaveClass("closed");
        assertRightDoorRendered();
    });
});

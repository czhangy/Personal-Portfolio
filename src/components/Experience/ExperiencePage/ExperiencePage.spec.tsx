import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import {
    mockCurrentExperience,
    mockEmptyDescriptionExperience,
} from "@/mocks/experiences";
import { LIST_ITEM } from "@/static/constants";
import {
    Experience,
    QueriedHTMLElement,
    QueriedHTMLElements,
} from "@/static/types";

import ExperiencePage, { ExperiencePageProps } from "./ExperiencePage";

describe("ExperiencePage", () => {
    let experiences: QueriedHTMLElements;
    let timeframes: QueriedHTMLElements;
    let endpoint: QueriedHTMLElement;

    /**
     * Checks that the timeframe is rendered correctly
     *
     * @param {HTMLElement} timeframe
     * @param {string} startDate
     * @param {string} endDate
     */
    const assertTimeframeRenders = (
        timeframe: HTMLElement,
        startDate: string,
        endDate: string,
    ): void => {};

    /**
     * Checks that the experiences render correctly
     *
     * @param {number} experienceList The list of experiences that were rendered
     */
    const assertExperiencesRender = (experienceList: Experience[]): void => {
        expect(experiences.length).toBe(experienceList.length);
        expect(timeframes.length).toBe(experienceList.length);
        timeframes.forEach((timeframe: HTMLElement) =>
            expect(timeframe).toHaveTextContent(
                `${experienceList[0].startDate} - ${experienceList[0].endDate}`,
            ),
        );
    };

    /**
     * Renders the component and assigns local variables
     *
     * @param {ExperiencePageProps} props Props to pass to the component
     */
    const renderExperiencePage = (props: ExperiencePageProps): void => {
        render(<ExperiencePage experiences={props.experiences} />);
        experiences = screen.queryAllByRole(LIST_ITEM);
        timeframes = screen.queryAllByTestId("page-timeframe");
        endpoint = screen.queryByTestId("endpoint");
    };

    it("Renders correctly with odd length", () => {
        const experienceList: Experience[] = [mockEmptyDescriptionExperience];
        renderExperiencePage({ experiences: experienceList });
        assertExperiencesRender(experienceList);
        expect(endpoint).toHaveClass("left-endpoint");
    });

    it("Renders correctly with even length", () => {
        const experienceList: Experience[] = [
            mockEmptyDescriptionExperience,
            mockEmptyDescriptionExperience,
        ];
        renderExperiencePage({ experiences: experienceList });
        assertExperiencesRender(experienceList);
        expect(endpoint).toHaveClass("right-endpoint");
    });

    it("Timeframe strips out end date", () => {
        renderExperiencePage({ experiences: [mockCurrentExperience] });
        expect(timeframes[0]).toHaveTextContent(
            mockCurrentExperience.startDate,
        );
    });
});

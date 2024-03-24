import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import {
    mockCurrentExperience,
    mockEmptyDescriptionExperience,
    mockExperience,
} from "@/mocks/experiences";

import ExperienceCard, { ExperienceCardProps } from "./ExperienceCard";

describe("ExperienceCard", () => {
    let experienceDescription: HTMLUListElement | null;
    let experienceTimeframe: HTMLParagraphElement | null;

    /**
     * Checks that the basic card components render correctly
     *
     * @param {string} company The name of the company
     * @param {string} title The job title
     */
    const assertCardRenders = (company: string, title: string): void => {
        expect(screen.queryByRole("img")).toHaveAttribute("alt", company);
        expect(screen.queryByRole("heading")).toHaveTextContent(company);
        expect(screen.queryByText(title)).toBeInTheDocument();
    };

    /**
     * Checks that the description renders correctly
     *
     * @param {string[]} description The array of bullet points describing the experience
     */
    const assertDescriptionRenders = (description: string[]): void => {
        const bullets: HTMLLIElement[] = screen.queryAllByRole("listitem");
        expect(experienceDescription).toBeInTheDocument();
        expect(bullets.length).toBe(description.length);
        bullets.forEach((bullet: HTMLLIElement, idx: number) =>
            expect(bullet).toHaveTextContent(description[idx]),
        );
    };

    /**
     * Checks that the timeframe renders correctly
     *
     * @param {string} startDate The start date of the experience
     * @param {string} endDate The start date of the experience
     */
    const assertTimeframeRenders = (
        startDate: string,
        endDate: string,
    ): void => {
        expect(experienceTimeframe).toHaveTextContent(
            `${startDate} - ${endDate}`,
        );
    };

    /**
     * Renders the component and assigns local variables
     *
     * @param {ExperienceCardProps} props Props to pass to the component
     */
    const renderExperienceCard = (props: ExperienceCardProps): void => {
        render(<ExperienceCard experience={props.experience} />);
        experienceDescription = screen.queryByRole("list");
        experienceTimeframe = screen.queryByTestId("card-timeframe");
    };

    it("Renders correctly", () => {
        renderExperienceCard({ experience: mockExperience });
        assertCardRenders(mockExperience.company, mockExperience.title);
        assertDescriptionRenders(mockExperience.description);
        assertTimeframeRenders(
            mockExperience.startDate,
            mockExperience.endDate,
        );
    });

    it("Renders correctly with no description", () => {
        renderExperienceCard({ experience: mockEmptyDescriptionExperience });
        assertCardRenders(
            mockEmptyDescriptionExperience.company,
            mockEmptyDescriptionExperience.title,
        );
        assertTimeframeRenders(
            mockEmptyDescriptionExperience.startDate,
            mockEmptyDescriptionExperience.endDate,
        );
        expect(experienceDescription).not.toBeInTheDocument();
    });

    it("Renders correctly with no end date", () => {
        renderExperienceCard({ experience: mockCurrentExperience });
        assertCardRenders(
            mockCurrentExperience.company,
            mockCurrentExperience.title,
        );
        assertDescriptionRenders(mockCurrentExperience.description);
        expect(experienceTimeframe).toHaveTextContent(
            mockCurrentExperience.startDate,
        );
    });
});

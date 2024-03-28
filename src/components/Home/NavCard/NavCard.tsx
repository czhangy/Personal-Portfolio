import Link from "next/link";

import Image from "@/components/Global/Image/Image";
import { COVER } from "@/static/constants";
import { Side } from "@/static/types";

import styles from "./NavCard.module.scss";

export type NavCardProps = {
    /** The title of the nav card */
    title: string;
    /** The path that the nav card links to and pulls its background image from */
    path: string;
    /** The side of the nav card the title is on */
    align: Side;
};

const NavCard: React.FC<NavCardProps> = (props: NavCardProps) => {
    /**
     * Gets the src of the background image using the provided path
     *
     * @returns {string} The path to the .webp of the background image
     */
    const getBackgroundSrc = (): string => {
        return `/assets/images/home${props.path}.webp`;
    };

    /**
     * Gets the classes used to style the card and align the title on the correct side
     *
     * @returns {string} The classes needed to style the card title
     */
    const getTitleClass = (): string => {
        return `${styles.title} ${styles[`${props.align}-title`]}`;
    };

    return (
        <Link href={props.path}>
            <a className={styles["nav-card"]}>
                <Image
                    src={getBackgroundSrc()}
                    alt={props.title}
                    objectFit={COVER}
                />
                <h2 className={getTitleClass()}>{props.title}</h2>
            </a>
        </Link>
    );
};

export default NavCard;

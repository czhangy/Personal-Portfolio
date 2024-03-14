// TS

// Next
import Head from "next/head";
// Page components
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ProjectsPage from "@/components/ProjectsPage/ProjectsPage";

import type { NextPage } from "next";

const Projects: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Charles Zhang | My Projects</title>
            </Head>
            <PageWrapper>
                <ProjectsPage />
            </PageWrapper>
        </div>
    );
};

export default Projects;

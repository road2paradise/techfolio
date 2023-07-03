import React from 'react';
import Avatar from '@mui/material/Avatar';
import "./IntroductionSection.css";
import { Theme, useTheme } from '@mui/material';
import { Asset } from 'contentful';


type IntroductionSectionProps = {
    profilePicture: Asset;
    jobTitle: string;
    name: string;
    welcomeParagraph: string
};

export default function IntroductionSection({
    profilePicture,
    name,
    jobTitle,
    welcomeParagraph,
}: IntroductionSectionProps) {
    const theme = useTheme<Theme>();
    const isDark = theme.palette.mode === 'dark';
    return (
        <>
            <section className="introduction-section">
                <div className={isDark ? "black-section" : "grey-section"} />
                <div>
                    {<Avatar className="profile-avatar" alt={profilePicture.fields.title?.toString()} src={profilePicture.fields.file?.url?.toString()} />}
                    <h2 className="profile-name-jobtitle-section">{name}<b> {"|"} {jobTitle}</b></h2>
                    <p className="welcome-paragraph-section">{welcomeParagraph}</p>
                </div>
            </section>
        </>
    );
};

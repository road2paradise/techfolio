import React from 'react';
import { AssetDto } from '../../../clients/client';
import Avatar from '@mui/material/Avatar';
import "./IntroductionSection.css";
import { Theme, useTheme } from '@mui/material';


type IntroductionSectionProps = {
    profilePicture: AssetDto;
    jobTitle: string;
    name: string;
    welcomeParagraph: string
    cv: AssetDto;
};

export default function IntroductionSection({
    profilePicture,
    name,
    jobTitle,
    welcomeParagraph,
    cv
}: IntroductionSectionProps) {
    const theme = useTheme<Theme>();
    const isDark = theme.palette.mode === 'dark';
    return (
        <>
            <section className="introduction-section">
                <div className={isDark ? "black-section" : "grey-section"} />
                <div>
                    <Avatar className="profile-avatar" alt={profilePicture.title} src={profilePicture.url} />
                    <h2 className="profile-name-jobtitle-section">{name}<b> {"|"} {jobTitle}</b></h2>
                    <p className="welcome-paragraph-section">{welcomeParagraph}</p>

                </div>
            </section>
        </>
    );
};

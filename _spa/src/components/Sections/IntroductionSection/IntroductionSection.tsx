import React from 'react';
import { AssetDto } from '../../../clients/client';
import Avatar from '@mui/material/Avatar';
import "./IntroductionSection.css";
import Button from '@mui/material/Button';

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
    return (
        <section className="introduction-section">
            <div className={"grey-section"} />
            <Avatar className="profile-avatar" alt={profilePicture.title} src={profilePicture.url} />
            <h2 className="profile-name-jobtitle-section">{name}<b>{"|"}  {jobTitle}</b></h2>
            <p className="welcome-paragraph-section">{welcomeParagraph}</p>
            <Button variant="contained" className="cv-link-btn" href={cv.url}>Cirriculum Vitae</Button>
        </section>
    );
};

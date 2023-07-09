import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectBody, selectProfilePicture } from '../../../slices/content.slice';

import "./IntroductionSection.css";

export default function IntroductionSection() {
    const profilePicture = useSelector(selectProfilePicture);
    const body = useSelector(selectBody);

    if (!profilePicture || !body) {
        return null
    } else {
        return (
            <section className="section introduction content">
                <div className="grey-section" />
                {body && profilePicture &&
                    <>
                        <div className="profile-container">
                            <Avatar className="profile-avatar" alt={profilePicture.fields.title?.toString()} src={profilePicture.fields.file?.url?.toString()} />
                        </div>
                        <h1 className="title">{body.name}<b> {"|"} {body.jobTitle}</b></h1>
                        <div className="content is-medium">
                            <p>{body.welcomeParagraph}</p>
                        </div>
                    </>
                }
            </section>
        );
    }
};

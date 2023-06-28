import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Theme, useTheme } from '@mui/material';

import "./FooterSection.css";
export const FooterSection = () => {
    const theme = useTheme<Theme>();
    const isDark = theme.palette.mode === "dark";
    const socialColour = isDark ? "white" : "black";
    return (
        <div className={isDark ? "dark-footer-container" : "light-footer-container"}>
            <b>Follow me on my social media!</b>
            <div className="social-icons-container">
                <SocialIcon
                    url="https://www.instagram.com/knney_/"
                    bgColor={socialColour}
                />
                <SocialIcon
                    url="https://www.facebook.com/IlIlIIlll/"
                    bgColor={socialColour}
                />
                <SocialIcon
                    url="https://www.linkedin.com/in/kenny-d-nguyen/"
                    bgColor={socialColour}
                />
                <SocialIcon
                    url="https://github.com/road2paradise"
                    bgColor={socialColour}
                />
            </div>
            <p><b>Copyright © Kenny Nguyen 2023</b></p>
        </div>
    )
};
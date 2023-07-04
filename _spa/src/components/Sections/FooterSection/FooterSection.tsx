import React from 'react'
import { SocialIcon } from 'react-social-icons';

import "./FooterSection.css";
export const FooterSection = () => {
    return (
        <div className="footer light-footer-container">
            <b>Follow me on my social media!</b>
            <div className="social-icons-container">
                <SocialIcon
                    url="https://www.instagram.com/knney_/"
                    bgColor={"black"}
                />
                <SocialIcon
                    url="https://www.facebook.com/IlIlIIlll/"
                    bgColor={"black"}
                />
                <SocialIcon
                    url="https://www.linkedin.com/in/kenny-d-nguyen/"
                    bgColor={"black"}
                />
                <SocialIcon
                    url="https://github.com/road2paradise"
                    bgColor={"black"}
                />
            </div>
            <p className="copyright"><b>Copyright © Kenny Nguyen 2023</b></p>
        </div>
    )
};
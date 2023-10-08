import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import { AppDispatch } from "./store/store";
import { fetchWebsiteContent } from "./slices/content.slice";
import { useEffect } from "react";
import IntroductionSection from "./components/Sections/IntroductionSection/IntroductionSection";
import { AboutSection } from "./components/Sections/AboutSection/AboutSection";
import { FooterSection } from "./components/Sections/FooterSection/FooterSection";
import { WorkExperienceSection } from "./components/Sections/WorkExperienceSection/WorkExperienceSection";

import "./AppRoot.css";
export const AppRoot = () => {
    const dispatch = useDispatch<AppDispatch>();
    // Initial fetch
    useEffect(() => {
        dispatch(fetchWebsiteContent());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <IntroductionSection />
            <AboutSection />
            <WorkExperienceSection />
            <FooterSection />
        </>
    )
}
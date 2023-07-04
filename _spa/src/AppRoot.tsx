import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets, fetchWebsiteBodyText, fetchWorkExperience, selectContent, selectProfilePicture } from './slices/content.slice';
import { AppDispatch } from './store/store';
import IntroductionSection from './components/Sections/IntroductionSection/IntroductionSection';
import { FooterSection } from './components/Sections/FooterSection/FooterSection';
import { WorkExperienceSection } from './components/Sections/WorkExperienceSection/WorkExperienceSection';
import { ColorRing } from 'react-loader-spinner';
import "./AppRoot.css";

export const AppRoot = () => {
    const dispatch = useDispatch<AppDispatch>();

    const profilePictureAsset = useSelector(selectProfilePicture);
    const { assets, body, workExperience, loadingState } = useSelector(selectContent);

    const emptyAssets = !assets || assets.length === 0;
    const emptyBody = !body || !body.name;
    const emptyWorkExperience = !workExperience || workExperience.length === 0;


    useEffect(() => {
        if (emptyAssets) dispatch(fetchAssets());
        if (emptyBody) dispatch(fetchWebsiteBodyText());
        if (emptyWorkExperience) dispatch(fetchWorkExperience());
    }, [dispatch, emptyAssets, emptyBody, emptyWorkExperience])

    if (loadingState === "HAS_NOT_LOADED" || loadingState === "IS_LOADING") {
        return (
            <div className='loader-container'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        );
    } else {
        return (
            <>
                {!emptyBody && !emptyAssets &&
                    <IntroductionSection
                        profilePicture={profilePictureAsset}
                        name={body.name}
                        jobTitle={body.jobTitle}
                        welcomeParagraph={body.welcomeParagraph}
                    />
                }
                <WorkExperienceSection workExperience={workExperience} />
                <FooterSection />
            </>
        )
    }

}
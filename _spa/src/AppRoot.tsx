import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets, fetchWebsiteBodyText, selectCV, selectContent, selectProfilePicture } from './slices/content.slice';
import { AppDispatch } from './store/store';
import IntroductionSection from './components/Sections/IntroductionSection/IntroductionSection';
import "./AppRoot.css";
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';


export const AppRoot = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    const dispatch = useDispatch<AppDispatch>();
    const profilePictureAsset = useSelector(selectProfilePicture);
    const cv = useSelector(selectCV);
    const { assets, body } = useSelector(selectContent);
    const emptyAssets = !assets || assets.length === 0;
    const emptyBody = !body || !body.name;

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setThemeMode(newTheme);
    };
    useEffect(() => {
        if (emptyAssets) dispatch(fetchAssets());
        if (emptyBody) dispatch(fetchWebsiteBodyText());
    }, [dispatch, emptyAssets, emptyBody])

    return (
        <ThemeProvider
            theme={theme}>
            <CssBaseline />
            <DarkModeToggle
                onThemeChange={handleThemeChange}
            />
            {!emptyAssets && !emptyBody &&
                <IntroductionSection
                    profilePicture={profilePictureAsset}
                    name={body.name}
                    jobTitle={body.jobTitle}
                    cv={cv}
                    welcomeParagraph={body.welcomeParagraph}
                />
            }
        </ThemeProvider>

    )
}
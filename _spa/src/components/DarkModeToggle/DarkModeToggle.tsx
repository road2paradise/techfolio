import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import "./DarkModeToggle.css"
type DarkModeToggleProps = {
    onThemeChange: (newThemeMode: 'light' | 'dark') => void;
}

export default function DarkModeToggle({ onThemeChange }: DarkModeToggleProps) {

    const handleThemeChange = (_: React.MouseEvent<HTMLElement>, newTheme: 'light' | 'dark') => {
        if (newTheme !== null) {
            onThemeChange(newTheme);
        }
    };

    return (
        <>
            <ToggleButtonGroup
                className="dark-mode-btn"
                exclusive
                onChange={handleThemeChange}
                aria-label="theme toggle"
            >
                <ToggleButton value="light" aria-label="light theme">
                    <WbSunnyIcon />
                </ToggleButton>
                <ToggleButton value="dark" aria-label="dark theme">
                    <Brightness4Icon />
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
};
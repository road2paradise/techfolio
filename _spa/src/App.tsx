import { useRef, useEffect } from 'react';
import './App.css';
import Typed from 'typed.js';
import { Avatar, Box, Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import {
  fetchAssets,
  fetchWebsiteBodyText,
  fetchWorkExperience,
  selectCV,
  selectContent,
  selectProfilePicture
} from './slices/content.slice';
import 'react-vertical-timeline-component/style.min.css';
import { WorkExperienceSection } from './components/WorkExperienceSection/WorkExperienceSection';
import { Headings } from './components/Headings/Headings';
import githubLogo from "./assets/github.png";
import { SocialButton } from './components/SocialButton/SocialButton';

function App() {
  const el = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const cvAsset = useSelector(selectCV);
  const profilePictureAsset = useSelector(selectProfilePicture);
  const { assets, body, workExperience, loadingState } = useSelector(selectContent);

  const { greetings, welcomeParagraph, name, jobTitle } = body;

  const emptyAssets = !assets || assets.length === 0;
  const emptyBody = !body || !body.name;
  const emptyWorkExperience = !workExperience || workExperience.length === 0;

  useEffect(() => {
    if (loadingState === "HAS_NOT_LOADED") {
      if (emptyBody) {
        dispatch(fetchWebsiteBodyText());
      }
      if (emptyAssets) {
        dispatch(fetchAssets());
      }
      if (emptyWorkExperience) {
        dispatch(fetchWorkExperience());
      }
    }
  }, [loadingState, dispatch, emptyBody, emptyAssets, emptyWorkExperience]);

  useEffect(() => {
    if (loadingState === "HAS_LOADED" && !emptyBody) {
      const typed = new Typed(el.current, {
        strings: greetings,
        typeSpeed: 50,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      });
      return () => {
        typed.destroy();
      };
    }
  }, [loadingState, greetings, emptyBody]);

  const renderAvatar = () => {
    if (!emptyAssets && profilePictureAsset) {
      return (
        <Avatar className="avatar" alt={profilePictureAsset.title} src={profilePictureAsset.url} />
      );
    }
    return <Avatar>KN</Avatar>;
  };

  return (
    <div className="App">
      <Grid container columns={2} alignItems="center" height="100%" width="100%">
        <Grid xs={1} item>
          <div className="avatar-container">{renderAvatar()}</div>
          <Box textAlign="center">
            {name && <Headings headingLevel="h2">{name}</Headings>}
            {jobTitle && <Headings headingLevel="h3">{jobTitle}</Headings>}
            <Container maxWidth="xs">
              <Grid className="logo-grid" container columns={4}>
                <Grid xs={1} item>
                <SocialButton
                    href="https://www.instagram.com/knney_/"
                    src="https://www.edigitalagency.com.au/wp-content/uploads/Instagram-logo-glyph-black-white-large-png.png"
                    alt="instagram-logo"
                  />
                </Grid>
                <Grid xs={1} item>
                  <SocialButton
                    href="https://www.facebook.com/IlIlIIlll/"
                    src="https://cdn-icons-png.flaticon.com/512/59/59439.png"
                    alt="facebook-logo"
                  />
                </Grid>
                <Grid xs={1} item>
                <SocialButton
                    href="https://www.linkedin.com/in/kenny-d-nguyen/"
                    src="https://www.edigitalagency.com.au/wp-content/uploads/new-linkedin-logo-white-black-png.png"
                    alt="linkedin-logo"
                  />
                </Grid>
                <Grid xs={1} item>
                <SocialButton
                    href="https://github.com/road2paradise"
                    src={githubLogo}
                    alt="github-logo"
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid xs={1} item>
          <Box textAlign="center" padding="100px">
            <Headings ref={el} />
            {welcomeParagraph && <p>{welcomeParagraph}</p>}
            <Grid container columns={2}>
              <Grid xs={2}>
                {cvAsset && (
                  <Button title={cvAsset.title} href={cvAsset.url} className="external-link-btn">
                    Curriculum vitae
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid xs={2} item>
        <WorkExperienceSection workExperience={workExperience} />
      </Grid>
    </div>
  );
}

export default App;
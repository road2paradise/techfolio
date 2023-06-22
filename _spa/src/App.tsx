import {useRef, useEffect} from 'react';
import './App.css';
import content from './en-nz';
import Typed from 'typed.js';
import { Avatar, Box, Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchAssets, fetchGreetings, fetchWorkExperience, selectContent } from './slices/content.slice';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import WorkIcon from '@mui/icons-material/Work';
import dompurify from 'dompurify';
import 'react-vertical-timeline-component/style.min.css';
function App() {
  const el = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const { assets, greetings, workExperience, loadingState } = useSelector(selectContent);
  const emptyAssets = !assets || assets.length === 0;
  const emptyGreetings = !greetings || greetings.length === 0;
  const emptyWorkExperience = !workExperience || workExperience.length === 0;
  useEffect(() => {
    if (loadingState === "HAS_NOT_LOADED") {
      if (emptyGreetings) {
        dispatch(fetchGreetings());
      }
      if (emptyAssets) {
        dispatch(fetchAssets());
      }
      if (emptyWorkExperience) {
        dispatch(fetchWorkExperience());
      }
    } 
  }, [loadingState, greetings, assets, workExperience, dispatch]);

  useEffect(() => {
    if (loadingState === "HAS_LOADED" && !emptyGreetings) {
      const typed = new Typed(el.current, {
        strings: greetings,
        typeSpeed: 50,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      })
      return () => {
        typed.destroy();
      }
    }
  }, [loadingState, greetings]);

  const renderAvatar = () => {
    if (!emptyAssets) {
      return (
        <Avatar className="avatar" alt={assets[0].title} src={`${assets[0].url}`}/>
      )   
    }
    return null;
  }
  
  const renderVerticalTimeline = () => {
    if (!emptyWorkExperience) {
      return (
        <VerticalTimeline
          lineColor='black'>
          {workExperience.map(x => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'black', color: 'white' }}
              contentArrowStyle={{ borderRight: '7px solid  black' }}
              date="2011 - present"
              iconStyle={{ background: 'black', color: '#fff' }}
              icon={<WorkIcon />}
            >
              <h1>{ x.jobTitle }</h1>
              <h2>{ x.companyName }</h2>
              { /* Yes I know dangerouslySetInnerHtml can be spooky but we fought through covid and now have sanitizers. */}
              <p dangerouslySetInnerHTML={{ __html: dompurify.sanitize(x.description, { FORCE_BODY: true }) }}/>
              </VerticalTimelineElement>
          ))}
        </VerticalTimeline>        
      )
    }
    return null;
  }

  return (
    <div className='App'>
      <Grid container columns={2} alignItems="center" height="100%" width="100%">
        <Grid xs={1} item>
          <div className="avatar-container">
            { renderAvatar() }
          </div>
          <Box
            textAlign="center"
          >
            <h2>{content.name}</h2>
            <h3>{content.jobTitle}</h3>
            <Container maxWidth="xs">
                <Grid className='logo-grid' container columns={3}>
                  <Grid xs={1} item>
                      <Button href="https://www.facebook.com/IlIlIIlll/">
                        <img
                          src="https://www.edigitalagency.com.au/wp-content/uploads/Instagram-logo-glyph-black-white-large-png.png"
                          alt="instagram-logo" />            
                      </Button>
                  </Grid>
                  <Grid xs={1} item>
                    <Button href="https://www.instagram.com/knney_/">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/59/59439.png"
                        alt="instagram-logo" />            
                    </Button>
                  </Grid>
                  <Grid xs={1} item>
                    <Button href="https://www.linkedin.com/in/kenny-d-nguyen/">
                      <img
                        src="https://www.edigitalagency.com.au/wp-content/uploads/new-linkedin-logo-white-black-png.png"
                        alt="linkedin-logo" />            
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
        </Grid>
        <Grid xs={1} item>
          <Box
            textAlign="center"
            padding="100px"
          >
            <h1 ref={el} />
            <p>{content.subTitle}</p>
            <Grid container columns={2}>
              <Grid xs={1}>
                <Button style={{ color: "white", backgroundColor: "black", textTransform: "none" }}>
                  Resume
                </Button>
              </Grid>
              <Grid xs={1}>
                <Button style={{ color: "white", backgroundColor: "black", textTransform: "none" }}>
                  Portfolio
                </Button>
              </Grid>            
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {renderVerticalTimeline()}
    </div>
  );
}

export default App;

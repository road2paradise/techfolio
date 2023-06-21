import {useRef, useEffect} from 'react';
import './App.css';
import content from './en-nz';
import Typed from 'typed.js';
import { Avatar, Box, Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchAssets, fetchGreetings, selectContent } from './slices/content.slice';

function App() {
  const el = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const { assets, greetings, loadingState } = useSelector(selectContent);

  useEffect(() => {
    if (loadingState === "HAS_NOT_LOADED") {
      if (!greetings || greetings.length === 0) {
        dispatch(fetchGreetings());
      }
      if (!assets || assets.length === 0) {
        dispatch(fetchAssets());
      }
    } 
  }, [loadingState, greetings, assets, dispatch]);

  useEffect(() => {
    if (loadingState === "HAS_LOADED" && greetings && greetings.length > 0) {
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
    if (assets && assets.length > 0) {
      return (
        <Avatar className="avatar" alt={assets[0].title} src={`${assets[0].url}`}/>
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
    </div>
  );
}

export default App;

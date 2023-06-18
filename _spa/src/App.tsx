import {useRef, useEffect} from 'react';
import './App.css';
import content from './en-nz';
import Typed from 'typed.js';
import { Box, Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchContent, selectContent } from './slices/content.slice';

function App() {
  const el = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const contentState = useSelector(selectContent);

  useEffect(() => {
    if (contentState.loadingState === "HAS_NOT_LOADED") {
      dispatch(fetchContent());
    } 
  }, [contentState.loadingState]);

  useEffect(() => {
    if (contentState.loadingState === "HAS_LOADED" && contentState.content && contentState.content.length > 0) {
      const typed = new Typed(el.current, {
        strings: contentState.content[0].headingList,
        typeSpeed: 50,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      })
      return () => {
        typed.destroy();
      }
    }
  }, [contentState.loadingState, contentState.content]);
  
  return (
    <div className='App'>
    <Grid container columns={2} alignItems="center" height="100%" width="100%">
        <Grid xs={1} item>
          <Box
            textAlign="center"
          >
            <img
                className='img--profile-pic'
                src="https://scontent.fakl2-1.fna.fbcdn.net/v/t39.30808-6/242155231_10159807098649201_7549013000408363933_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2Cj4iGOFDAAX8VTw8E&_nc_ht=scontent.fakl2-1.fna&oh=00_AfAVwrzvQ_ny-0G-UVgnCxt-sgAZXd7NJjhL4LYY7w6AoQ&oe=644BA16A"
                alt="profile"
            />
          </Box>
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

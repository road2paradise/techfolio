// import { useRef, useEffect } from 'react';
// import './App.css';
// import Typed from 'typed.js';
// import { Avatar, Box, Button, Container, Grid } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from './store/store';
// import {
//   fetchAssets,
//   fetchWebsiteBodyText,
//   fetchWorkExperience,
//   selectCV,
//   selectContent,
//   selectProfilePicture
// } from './slices/content.slice';
// import 'react-vertical-timeline-component/style.min.css';
// import { WorkExperienceSection } from './components/WorkExperienceSection/WorkExperienceSection';
// import { Headings } from './components/Headings/Headings';
// import githubLogo from "./assets/github.png";

// function App() {
//   const el = useRef(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const cvAsset = useSelector(selectCV);
//   const profilePictureAsset = useSelector(selectProfilePicture);
//   const { assets, body, workExperience, loadingState } = useSelector(selectContent);
//   const { greetings, welcomeParagraph, name, jobTitle, quotes } = body;

//   const emptyAssets = !assets || assets.length === 0;
//   const emptyBody = !body || !body.name;
//   const emptyWorkExperience = !workExperience || workExperience.length === 0;

//   useEffect(() => {
//     if (loadingState === "HAS_NOT_LOADED") {
//       if (emptyBody) {
//         dispatch(fetchWebsiteBodyText());
//       }
//       if (emptyAssets) {
//         dispatch(fetchAssets());
//       }
//       if (emptyWorkExperience) {
//         dispatch(fetchWorkExperience());
//       }
//     }
//   }, [loadingState, dispatch, emptyBody, emptyAssets, emptyWorkExperience]);

//   useEffect(() => {
//     if (loadingState === "HAS_LOADED" && !emptyBody) {
//       const typed = new Typed(el.current, {
//         strings: greetings,
//         typeSpeed: 50,
//         backSpeed: 100,
//         backDelay: 1000,
//         loop: true,
//       });
//       return () => {
//         typed.destroy();
//       };
//     }
//   }, [loadingState, greetings, emptyBody]);

//   return (
//     <Box className="App" sx={{ flexGrow: 1 }}>
//       <Grid className="introduction" spacing={2} container alignItems="center" height="100%" width="100%">
//         <Grid xs={12} md={6} item>
//           {!emptyAssets && profilePictureAsset &&
//             <div className="avatar-container">
//               <Avatar className="avatar" alt={profilePictureAsset.title} src={profilePictureAsset.url} />
//             </div>
//           }
//           <Box textAlign="center">
//             {name && <Headings headingLevel="h2">{name}</Headings>}
//             {jobTitle && <Headings headingLevel="h3">{jobTitle}</Headings>}
//             {quotes && <span className="quotes" style={{ fontStyle: 'italic', marginBottom: '16px' }}>{quotes[Math.floor(Math.random() * quotes.length)]}</span>}
//           </Box>
//         </Grid>
//         <Grid xs={12} md={6} item>
//           <Box textAlign="center" padding="100px">
//             <Headings ref={el} />
//             {welcomeParagraph && <p>{welcomeParagraph}</p>}
//             <Grid container columns={2}>
//               <Grid xs={2}>
//                 {cvAsset && (
//                   <Button title={cvAsset.title} href={cvAsset.url} className="external-link-btn">
//                     Curriculum vitae
//                   </Button>
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//       <Grid className="work-experience" xs={12} item>
//         <WorkExperienceSection workExperience={workExperience} />
//       </Grid>
//     </Box>
//   );
// }

export default {};
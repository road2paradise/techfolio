import { WorkExperienceDto } from '../../clients/client'
import dompurify from 'dompurify';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import WorkIcon from '@mui/icons-material/Work';
import { Box } from '@mui/material';
import { Headings } from '../Headings/Headings';

type WorkExperienceSectionProps = {
    workExperience: WorkExperienceDto[];
}

export const WorkExperienceSection = ({ workExperience }: WorkExperienceSectionProps) => {
    if (!workExperience) {
        return null
    }

    return (
        <>
            <Box className="work-experience--container">
                <Headings>Work Experience</Headings>
            </Box>
            <VerticalTimeline
                className="vertical-timeline-container"
                lineColor='#65735C'>
                {workExperience.map(x => (
                    <VerticalTimelineElement                    
                        key={ x.companyName }
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'black', color: 'grey', borderRadius: "20px"  }}
                        contentArrowStyle={{ borderRight: '7px solid  black' }}
                        date="2011 - present"
                        iconStyle={{ background: 'black', color: 'white' }}
                        icon={<WorkIcon />}>
                        <h1>{ x.jobTitle }</h1>
                        <h2>{ x.companyName }</h2>
                        <p dangerouslySetInnerHTML={{ __html: dompurify.sanitize(x.description, { FORCE_BODY: true }) }}/>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>     
        </>
    )
}
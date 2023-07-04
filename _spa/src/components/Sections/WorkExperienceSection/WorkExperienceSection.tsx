import dompurify from 'dompurify';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import WorkIcon from '@mui/icons-material/Work';
import { format } from 'date-fns';
import { Theme, useTheme } from '@mui/material/styles';
import { IWorkExperienceFields } from '../../../generated/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import "./WorkExperienceSection.css";
import 'react-vertical-timeline-component/style.min.css';

type WorkExperienceSectionProps = {
    workExperience: IWorkExperienceFields[];
}

export const WorkExperienceSection = ({ workExperience }: WorkExperienceSectionProps) => {
    const theme = useTheme<Theme>();
    const isDark = theme.palette.mode === 'dark';
    if (!workExperience) {
        return null
    }
    const formatDate = (date: string) => {
        var formattedDate = format(new Date(date), 'MMM yyyy');
        if (formattedDate === "Jan 0001") {
            return "Present"
        }
        return formattedDate;
    };
    return (
        <div className="workExperience vertical-timeline-container">
            <h1 className="timeline-section-header">Work Experience</h1>
            <VerticalTimeline
                lineColor='#d1cdcd'>
                {workExperience.map(x => (
                    <VerticalTimelineElement
                        key={x.companyName}
                        className="vertical-timeline-element--work"
                        contentStyle={isDark ? { background: 'black', color: 'white', borderRadius: "15px", outline: '2px solid white' } : { background: '#d1cdcd', color: 'black', borderRadius: "15px" }}
                        contentArrowStyle={isDark ? { borderRight: '7px solid  white', color: "white" } : { borderRight: '7px solid #d1cdcd', color: "#d1cdcd" }}
                        date={`${formatDate(x.startDate)} - ${x.endDate ? formatDate(x.endDate) : "Present"}`}
                        iconStyle={isDark ? { background: 'black', color: 'white' } : { background: '#d1cdcd', color: 'black' }}
                        icon={<WorkIcon />}>
                        <h1>{x.jobTitle}</h1>
                        <h3>{x.companyName}</h3>
                        {x.description && <span dangerouslySetInnerHTML={{ __html: dompurify.sanitize(documentToHtmlString(x.description) ?? "", { FORCE_BODY: true }) }} />}
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    )
}
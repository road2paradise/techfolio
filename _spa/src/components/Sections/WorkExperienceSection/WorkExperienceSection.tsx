import dompurify from 'dompurify';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import WorkIcon from '@mui/icons-material/Work';
import { format } from 'date-fns';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import "./WorkExperienceSection.css";
import 'react-vertical-timeline-component/style.min.css';
import { useSelector } from 'react-redux';
import { selectWorkExperience } from '../../../slices/content.slice';

export const WorkExperienceSection = () => {
    const workExperience = useSelector(selectWorkExperience);
    const formatDate = (date: string) => {
        var formattedDate = format(new Date(date), 'MMM yyyy');
        if (formattedDate === "Jan 0001") {
            return "Present"
        }
        return formattedDate;
    };
    if (!workExperience) {
        return null
    } else {
        return (
            <section className="content work-experience vertical-timeline-container">
                <h1 className="title has-text-centered timeline-section-header">Work Experience</h1>
                <VerticalTimeline
                    lineColor='#d1cdcd'>
                    {workExperience.map(x => (
                        <VerticalTimelineElement
                            key={x.companyName}
                            className="vertical-timeline-element--work content"
                            contentStyle={{ background: '#d1cdcd', color: 'black', borderRadius: "15px" }}
                            contentArrowStyle={{ borderRight: '7px solid #d1cdcd', color: "#d1cdcd" }}
                            date={`${formatDate(x.startDate)} - ${x.endDate ? formatDate(x.endDate) : "Present"}`}
                            iconStyle={{ background: '#d1cdcd', color: 'black' }}
                            icon={<WorkIcon />}>
                            <h1 className="title">{x.jobTitle}</h1>
                            <h3 className="title">{x.companyName}</h3>
                            {x.description && <span dangerouslySetInnerHTML={{ __html: dompurify.sanitize(documentToHtmlString(x.description) ?? "", { FORCE_BODY: true }) }} />}
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </section>
        )
    }
}
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectAboutSection } from '../../../slices/content.slice';
import { WithFadeAnimation } from '../../Animated/WithFadeAnimation';
import FlipAnimationImage, { FlipAnimationImageProps } from '../../Animated/FlipAnimationImage';
import dompurify from "dompurify";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import "./AboutSection.css";
export const AboutSection = () => {
    const section = useSelector(selectAboutSection);
    const [images, setImages] = useState<FlipAnimationImageProps[]>([])

    useEffect(() => {
        if (section && section.assets) {
            setImages(section.assets.map((a) => {
                return {
                    images: {
                        firstImage: {
                            src: a.fields.file?.url
                        },
                        flippedImage: {
                            children: <p className="content"><i>{typeof (a.fields.description) === "string" ? a.fields.description : null}</i></p>
                        }
                    },
                    containerClassName: "container is-child"
                } as FlipAnimationImageProps
            }))
        }
    }, [section, section?.assets])

    if (images.length === 0 || !section) {
        return null
    } else {
        return (
            <section className="section is-medium about-me tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile is-child content">
                        <p className="title">About me</p>
                        <p dangerouslySetInnerHTML={{ __html: dompurify.sanitize(documentToHtmlString(section.content) ?? "", { FORCE_BODY: true }) }}></p>
                    </div>
                </div>
                <div className="tile is-3 is-vertical">
                    <img src={images[0].images.firstImage.src} />
                    <img src={images[1].images.firstImage.src} />
                </div>
                <div className="tile is-3 is-vertical" >
                    <img src={images[2].images.firstImage.src} />
                </div>
            </section >
        )
    }
}

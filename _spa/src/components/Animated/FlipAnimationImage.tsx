import { a, useSpring } from '@react-spring/web';
import React, { useState } from 'react'
import "./FlipAnimationImage.css"

export type ImageProps = {
  src?: string,
  className?: string,
  children?: string | JSX.Element | JSX.Element[],
}
export type FlippedImageProps = {
  className?: string,
  children?: string | JSX.Element | JSX.Element[],
}


export type FlipAnimationImageProps = {
  images: {
    firstImage: ImageProps,
    flippedImage: FlippedImageProps,
  }
  containerClassName?: string,
}

const FlipAnimationImage = ({ images, containerClassName }: FlipAnimationImageProps) => {
  const { firstImage, flippedImage } = images;
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <div className={`container ${containerClassName}`} onMouseEnter={() => { setFlipped(true) }} onMouseLeave={() => { setFlipped(false) }}>
      <a.img
        src={firstImage.src}
        className={`image ${firstImage.className}`}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform
        }}
      >
        {firstImage.children}
      </a.img>
      <a.div
        className={`flipped-image ${flippedImage.className}`}
        style={{
          opacity,
          transform,
          rotateX: "180deg"
        }}
      >
        {flippedImage.children}
      </a.div>
    </div>
  )
}


export default FlipAnimationImage
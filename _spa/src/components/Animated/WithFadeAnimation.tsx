import { a, useInView, useSpring } from '@react-spring/web';
import React, { CSSProperties } from 'react'

export type WithFadeAnimationProps = {
  delay?: number
  duration?: number;
  reverse?: boolean;
  direction: "horizontal" | "vertical";
  style?: CSSProperties;
  children: React.ReactNode
};

type DirectionStyle = {
  x?: {
    from: string
    to: string
  },
  y?: {
    from: string,
    to: string
  }
}

export const WithFadeAnimation = ({ duration, direction, reverse, delay, children }: WithFadeAnimationProps) => {
  const [ref, inView] = useInView()
  const pixelDirection = reverse ? "100px" : "-100px"
  const movement: DirectionStyle = direction === "horizontal" ?
    {
      x: {
        from: inView ? pixelDirection : "0px",
        to: inView ? "0px" : pixelDirection
      }
    } :
    {
      y: {
        from: inView ? pixelDirection : "0px",
        to: inView ? "0px" : pixelDirection
      }
    }

  const animationStyle = useSpring({
    delay,
    config: { duration },
    from: { opacity: 0, x: movement.x?.from, y: movement.y?.from },
    to: {
      opacity: inView ? 1 : 0,
      x: movement.x?.to, y: movement.y?.to
    }
  });
  return (
    <a.div
      ref={ref}
      style={{
        ...animationStyle
      }}>
      {children}
    </a.div>
  )
}
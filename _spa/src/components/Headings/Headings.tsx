import React, { forwardRef } from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    headingLevel?: React.ElementType,
}


export const Headings = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ headingLevel, children, className }: HeadingProps, ref) => {
      const Heading = headingLevel ?? "h1";
    
      return <Heading ref={ref} className={className}>{children}</Heading>;
    }
  );
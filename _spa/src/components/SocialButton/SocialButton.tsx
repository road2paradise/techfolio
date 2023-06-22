import { Button } from '@mui/material'
import React from 'react'
type SocialButtonProps = {
    className?: string,
    href: string,
    src: string,
    alt: string,
}

export const SocialButton = ({ href, src, alt, className}: SocialButtonProps) => {
  return (
    <Button className={className} href={href}>
      <img src={src} alt={alt} />
    </Button>
  )
}

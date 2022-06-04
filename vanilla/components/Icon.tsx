import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import NextImage from 'next/image'

interface Props {
  name: string
  circle?: boolean
  golden?: boolean
  className?: string
}

const NOT_FOUND_ICON = 'inv_misc_questionmark'

const makeUrl = (name: string, useFallback = false): string => {
  if (useFallback) {
    return `https://wow.zamimg.com/images/wow/icons/large/${name}.jpg`
  }
  return `/images/icons/large/${name}.jpg`
}

export function Icon({ golden, className, name, circle, ...rest }: Props) {
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    setUrl(makeUrl(name, false))
  }, [name])

  const cn = classNames('icon', `icon--medium`, className, {
    'icon--golden': golden,
    'icon--loaded': !!url,
    'icon--circle': circle,
  })

  return (
    <div className={cn} {...rest}>
      {url && (
        <NextImage
          src={url}
          height={40}
          width={40}
          alt={name}
          onError={() => setUrl(makeUrl(name, true))}
        />
      )}
    </div>
  )
}

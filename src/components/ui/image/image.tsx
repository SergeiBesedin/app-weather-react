interface ImageProps {
    src: string
    alt: string
    classes: string[]
}

export function Image({ src, alt, classes }: ImageProps) {
    const classNames = [...classes].join(' ')

    return <img className={classNames} src={src} alt={alt} />
}

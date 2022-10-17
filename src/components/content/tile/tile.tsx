interface TileProps {
    title?: string
}

export function Tile({ title }: TileProps) {
    return (
        <div>
            {title && <h3>{title}</h3>}
            <div></div>
        </div>
    )
}

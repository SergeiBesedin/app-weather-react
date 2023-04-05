import { useState } from 'react'

export function useCarouselScrolling() {
    const [leftBtn, setLeftBtn] = useState(true)
    const [rightBtn, setRightBtn] = useState(false)

    const buttonClickHandler = (
        wrapperRef: HTMLElement | null,
        listItemsRef: HTMLElement | null,
        itemWidth: number,
        toLeft: boolean,
    ) => {
        if (!wrapperRef || !listItemsRef) return

        const containerWidth = wrapperRef.getBoundingClientRect().width

        const shift = (toLeft ? -1 : 1) * (containerWidth - itemWidth)
        listItemsRef.scrollBy({
            left: shift,
            behavior: 'smooth',
        })
    }

    const showOrHideButtons = (listItemsRef: HTMLElement | null) => {
        if (!listItemsRef) return

        const listItemsWidth = Math.round(listItemsRef.getBoundingClientRect().width)

        const { scrollLeft, scrollWidth } = listItemsRef

        const rightDelta = scrollLeft + listItemsWidth === scrollWidth
        setLeftBtn(scrollLeft === 0)

        setRightBtn(rightDelta)
    }

    return { leftBtn, rightBtn, buttonClickHandler, showOrHideButtons }
}

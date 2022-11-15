import { useState } from 'react'

const ITEM_WIDTH = 60

export function useCarouselScrolling() {
    const [leftBtn, setLeftBtn] = useState<boolean>(true)
    const [rightBtn, setRightBtn] = useState<boolean>(false)

    const buttonClickHandler = (
        wrapperRef: HTMLElement | null,
        listItemsRef: HTMLElement | null,
        toLeft: boolean,
    ) => {
        if (!wrapperRef || !listItemsRef) return
        const containerWidth = wrapperRef.getBoundingClientRect().width
        const shift = (toLeft ? -1 : 1) * (containerWidth - ITEM_WIDTH)
        listItemsRef.scrollBy({
            left: shift,
            behavior: 'smooth',
        })
    }

    const showOrHideButtons = (listItemsRef: HTMLElement | null) => {
        // TODO сделать через debounce
        if (!listItemsRef) return
        const listItemsWidth = Math.round(listItemsRef.getBoundingClientRect().width)
        const scrollLeft = listItemsRef.scrollLeft
        const rightDelta = scrollLeft + listItemsWidth === listItemsRef.scrollWidth
        setLeftBtn(scrollLeft === 0)
        setRightBtn(rightDelta)
    }

    return { leftBtn, rightBtn, buttonClickHandler, showOrHideButtons }
}

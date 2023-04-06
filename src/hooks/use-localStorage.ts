import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
    initialValue: T,
    key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const getValue = (): T => {
        const storage = localStorage.getItem(key)

        if (storage) {
            return JSON.parse(storage)
        }

        return initialValue
    }

    const [value, setValue] = useState<T>(getValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}

type StorageData<T> = {
    expired: number
    data: T
}

// Методы для работы с хранилищем
export function useDataStorage<T>(key: string, expiredLimit: number) {
    const checkStorage = (): T | null => {
        const data = getDataFromStorage()

        if (!data || data.expired < Date.now() - expiredLimit) {
            return null
        }

        return data.data
    }

    const getDataFromStorage = (): StorageData<T> | null => {
        const data = localStorage.getItem(key)

        return data ? JSON.parse(data) : null
    }

    const saveDataToStorage = (data: T): void => {
        localStorage.setItem(
            key,
            JSON.stringify({
                expired: Date.now() + expiredLimit,
                data,
            }),
        )
    }

    const clearStorage = (): void => {
        localStorage.removeItem(key)
    }

    return { checkStorage, saveDataToStorage, clearStorage }
}

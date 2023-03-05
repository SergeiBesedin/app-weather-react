type StorageData<T> = {
    data: T
    expired?: number
}

// Методы для работы с хранилищем
export function useDataStorage<T>(key: string, expiredLimit?: number) {
    const checkStorage = (): T | null => {
        const data = getDataFromStorage()

        if (!data) {
            return null
        }

        if (expiredLimit && data.expired && data.expired < Date.now() - expiredLimit) {
            return null
        }

        return data.data
    }

    const getDataFromStorage = (): StorageData<T> | null => {
        const data = localStorage.getItem(key)

        return data ? JSON.parse(data) : null
    }

    const saveDataToStorage = (data: T): void => {
        const storageData: StorageData<T> = { data: data }

        if (expiredLimit) {
            storageData.expired = Date.now() + expiredLimit
        }

        localStorage.setItem(key, JSON.stringify(storageData))
    }

    const clearStorage = (): void => {
        localStorage.removeItem(key)
    }

    return { checkStorage, saveDataToStorage, clearStorage }
}

import { useDataStorage } from '../hooks/use-data-storage'

const SEARCH_HISTORY_KEY = 'search_history'

const MAX_RECORDS = 4 // максимальное количество записей в историю

export function useSearchHistory() {
    const { checkStorage, saveDataToStorage, clearStorage } =
        useDataStorage<Array<string>>(SEARCH_HISTORY_KEY)

    const getHistory = (): Array<string> => {
        const storage = checkStorage()

        return storage ?? []
    }

    const saveToHistory = (location: string): void => {
        const history = getHistory()

        const city = location.toLowerCase()

        if (history.includes(city)) {
            return
        }

        if (history.length === MAX_RECORDS) {
            history.pop()
        }

        saveDataToStorage([city, ...history])
    }

    const clearHistory = (): void => clearStorage()

    return { getHistory, saveToHistory, clearHistory }
}

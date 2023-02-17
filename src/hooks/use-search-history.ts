const SEARCH_HISTORY_KEY = 'search_history'

const MAX_RECORDS = 4 // максимальное количество записей в историю

export function useSearchHistory() {
    const getHistory = (): Array<string> => {
        const storage = localStorage.getItem(SEARCH_HISTORY_KEY)

        if (storage) {
            return JSON.parse(storage)
        }

        return []
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

        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([city, ...history]))
    }

    const clearHistory = (): void => {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([]))
    }

    return { getHistory, saveToHistory, clearHistory }
}

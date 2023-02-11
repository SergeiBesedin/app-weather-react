const SEARCH_HISTORY_KEY = 'search_history'

const MAX_RECORDS = 4 // Максимальное количество записей в историю

// изначально задумывал функцию как кастомный хук, но в итоге выяснилось,
// что useState здесь не нужен
export function useSearchHistory() {
    const getHistory = (): Array<string> => {
        const storage = localStorage.getItem(SEARCH_HISTORY_KEY)

        if (storage) {
            return JSON.parse(storage)
        }

        return []
    }

    const saveToHistory = (location: string) => {
        const history = getHistory()

        if (history.includes(location)) {
            return
        }

        if (history.length === MAX_RECORDS) {
            history.pop()
        }

        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([location, ...history]))
    }

    const clearHistory = () => {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([]))
    }

    return { getHistory, saveToHistory, clearHistory }
}

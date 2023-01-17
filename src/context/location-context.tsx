import { createContext, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosDaData } from '../axios/axios'

interface ILocationContext {
    location: string
    changeLocation: (payload: string) => void
}

const API_DADATA_KEY = process.env.REACT_APP_DD_API_KEY // ключ для сервиса DaData

const USER_LOCATION_KEY = 'user_location'

const initialState = 'Москва'

export const LocationContext = createContext<ILocationContext>({
    location: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeLocation: () => {},
})

export const LocationState = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<string>(initialState)

    const changeLocation = (payload: string) => {
        setLocation(payload)
    }

    const getUserLocation = (): void => {
        const location = checkLocationInStorage()
        if (location) {
            setLocation(location)
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                // выполняется, если пользователей дает доступ к местоположению
                const city = await getCityName(position.coords.latitude, position.coords.longitude)
                localStorage.setItem(USER_LOCATION_KEY, city)
                setLocation(city)
            })
        }
    }

    const checkLocationInStorage = (): string | null => {
        return localStorage.getItem(USER_LOCATION_KEY)
    }

    const getCityName = async (lat: number, lon: number): Promise<string> => {
        // обратное геокодирование. Передаем сервису широту и долготу, чтобы получить местоположение (название города) пользователя
        try {
            const url = 'suggestions/api/4_1/rs/geolocate/address'
            const coords = { lat, lon }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${API_DADATA_KEY}`,
                },
            }
            const response = await axiosDaData.post(url, coords, options)
            return response.data.suggestions[0].data.city
        } catch (e: unknown) {
            const error = e as AxiosError
            console.error(error)
            return 'Москва'
        }
    }

    // При первом рендере пытаемся узнать местоположение пользователя
    useEffect(() => {
        getUserLocation()
    }, [])

    return (
        <LocationContext.Provider value={{ location, changeLocation }}>
            {children}
        </LocationContext.Provider>
    )
}

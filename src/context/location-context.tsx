import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosDaData } from '../axios/axios'
import constate from 'constate'

const USER_LOCATION_KEY = 'user_location'

const useLocationState = () => {
    const [location, setLocation] = useState('Москва')

    const changeLocation = (value: string) => {
        if (location.toLowerCase() === value.toLowerCase()) return

        setLocation(value)
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

            const response = await axiosDaData.post(url, coords)

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

    return { location, changeLocation }
}

export const [LocationProvider, useLocationProvider] = constate(useLocationState)

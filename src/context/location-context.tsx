import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosDaData } from '../axios/axios'
import constate from 'constate'
import { useDataStorage } from '../hooks/use-data-storage'

const USER_LOCATION_KEY = 'user_location'
const EXPIRED_LIMIT = 604800 * 1000 // обновление местоположения раз в неделю

const useLocationState = () => {
    const [location, setLocation] = useState('Москва')

    const { checkStorage, saveDataToStorage } = useDataStorage<string>(
        USER_LOCATION_KEY,
        EXPIRED_LIMIT,
    )

    const changeLocation = (value: string) => {
        if (location.toLowerCase() === value.toLowerCase()) return

        setLocation(value)
    }

    const getUserLocation = (): void => {
        const location = checkStorage()

        if (location) {
            setLocation(location)
            return
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            // выполняется, если пользователей дает доступ к местоположению
            const city = await getCityName(position.coords.latitude, position.coords.longitude)

            saveDataToStorage(city)

            setLocation(city)
        })
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

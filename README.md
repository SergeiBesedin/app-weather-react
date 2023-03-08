# Weather App

-   Приложение позволяет смотреть текущую погоду, почасовой прогноз и прогноз на 5 дней.
-   Реализован поиск с подсказками при вводе и историей поиска.
-   При использовании десктопной версии реализована возможность получить текущее местоположение пользователя (если пользователь дает доступ).
-   Реализована поддержка разных единиц измерений (градусы Цельсия, градусы Фаренгейта, м/с, км/ч, гПа, мм.рт.ст.)
-   Верстка адаптирована под любые разрешения.
-   Для получения данных погоды был использован бесплатный ключ, поэтому есть ограничение на количество вызово API - **не более 60 вызовов в минуту**.

_Посмотреть приложение можно по [ссылке](https://outside-weather.netlify.app/)._

## Технологии

-   React
-   TypeScript
-   SCSS
-   [Netlify](https://app.netlify.com/)

## Используемые API

-   [OpenWeather API](https://openweathermap.org/api) - для получения данных о погоде
-   [DaData API](https://dadata.ru/api/) - для получения поисковых подсказок

## Локальная установка

1. Клонировать репозиторий
2. `npm install`
3. `npm start`
4. Открыть [http://localhost:3000](http://localhost:3000) в браузере.

_Примечание:_ для локальной работы API необходимо получить ключи. Получить их можно по следующим ссылкам:

1. [OpenWeather](https://home.openweathermap.org/api_keys)
2. [DaData](https://dadata.ru/profile/#info)

После чего нужно создать в корне проекта файл `.env.local` и присвоить полученные ключи следующим переменным:

-   REACT_APP_OW_API_KEY=**ключ от DaData API**
-   REACT_APP_DD_API_KEY=**ключ от OpenWeather API**

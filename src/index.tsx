import ReactDOM from 'react-dom/client'
import App from './app/App'
import { SettingsProvider } from './context/settings-context'
import { LocationProvider } from './context/location-context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <LocationProvider>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </LocationProvider>,
)

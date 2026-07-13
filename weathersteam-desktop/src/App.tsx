import './App.css';
import { WeatherSteamContextProvider } from './context/WeatherSteamContextProvider';
import WeatherSteamRoutes from './routes/WeaterSteamRoutes';

function App() {
  return (
    <WeatherSteamContextProvider>
      <WeatherSteamRoutes />
    </WeatherSteamContextProvider>
  );
}

export default App;

import { HashRouter, Routes, Route } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';
import LibraryPage from '../pages/LibraryPage';
import ProfilePage from '../pages/ProfilePage';
import RandomChoicePage from '../pages/RandomChoicePage';
import SettingsPage from '../pages/SettingsPage';
import SignInPage from '../pages/SignInPage';
import WeatherChoicePage from '../pages/WeatherChoicePage';

export default function WeatherSteamRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<BlankLayout />}>
          <Route path="/" Component={SignInPage} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/library" Component={LibraryPage} />
          <Route path="/weather" Component={WeatherChoicePage} />
          <Route path="/random" Component={RandomChoicePage} />
          <Route path="/settings" Component={SettingsPage} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

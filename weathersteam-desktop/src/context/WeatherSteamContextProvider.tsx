import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import {
  LocationResponse,
  SteamProfile,
  SteamUserLibrary,
  WeatherResponse
} from '../../common/types';

type State = {
  profile: SteamProfile;
  library: SteamUserLibrary;
  location: LocationResponse;
  weather: WeatherResponse;
};

const initialState: State = {
  profile: {
    steamid: '',
    personaname: '',
    profileurl: '',
    avatar: '',
    avatarmedium: '',
    avatarfull: '',
    personastate: 0,
    communityvisibilitystate: 0
  },
  library: {
    game_count: 0,
    games: []
  },
  location: {
    status: 'fail',
  },
  weather: {
    temperature_2m: 0,
    is_day: false,
    rain: 0,
    wind_speed_10m: 0,
    snowfall: 0,
    cloud_cover: 0
  }
};

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const ActionTypes = {
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_LIBRARY: 'UPDATE_LIBRARY',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  UPDATE_WEATHER: 'UPDATE_WEATHER',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  TOGGLE_EXCLUDED: 'TOGGLE_EXCLUDED',
  CLEAR: 'CLEAR'
} as const;

export const updateProfileAction = (payload: SteamProfile) => ({
  payload,
  type: ActionTypes.UPDATE_PROFILE
});

export const updateLibraryAction = (payload: SteamUserLibrary) => ({
  payload,
  type: ActionTypes.UPDATE_LIBRARY
});

export const updateLocationAction = (payload: LocationResponse) => ({
  payload,
  type: ActionTypes.UPDATE_LOCATION
});

export const updateWeatherAction = (payload: WeatherResponse) => ({
  payload,
  type: ActionTypes.UPDATE_WEATHER
});

export const clearAction = () => ({
  type: ActionTypes.CLEAR
});

export type WeatherSteamAction =
  | ReturnType<typeof updateProfileAction>
  | ReturnType<typeof updateLibraryAction>
  | ReturnType<typeof updateLocationAction>
  | ReturnType<typeof updateWeatherAction>
  | ReturnType<typeof clearAction>;

export const weatherSteamReducer = (
  state: State,
  action: WeatherSteamAction
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LIBRARY: {
      return {
        ...state,
        library: action.payload
      };
    }
    case ActionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case ActionTypes.UPDATE_LOCATION: {
      return {
        ...state,
        location: action.payload
      };
    }
    case ActionTypes.UPDATE_WEATHER: {
      return {
        ...state,
        weather: action.payload
      };
    }
    case ActionTypes.CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
};

const WeatherSteamStateContext = createContext<State>(initialState);
const WeatherSteamActionContext = createContext<Dispatch<WeatherSteamAction>>(
  () => null
);

type Props = {
  children: React.ReactNode;
};

export const useWeatherSteamStateContext = () => {
  return useContext(WeatherSteamStateContext);
};

export const useWeatherSteamActionContext = () => {
  const dispatch = useContext(WeatherSteamActionContext);

  return useMemo(
    () => ({
      updateProfileAction: (profile: SteamProfile) =>
        dispatch(updateProfileAction(profile)),
      updateLibraryAction: (library: SteamUserLibrary) =>
        dispatch(updateLibraryAction(library)),
      updateLocationAction: (location: LocationResponse) =>
        dispatch(updateLocationAction(location)),
      updateWeatherAction: (weather: WeatherResponse) =>
        dispatch(updateWeatherAction(weather)),
      clearAction: () => dispatch(clearAction())
    }),
    [dispatch]
  );
};

export function WeatherSteamContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    weatherSteamReducer,
    initialState,
    (base) => ({
      profile: readLS('userProfile', base.profile),
      library: readLS('userLibrary', base.library),
      location: readLS('currentLocation', base.location),
      weather: readLS('currentWeather', base.weather)
    })
  );

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(state.profile));
    localStorage.setItem('userLibrary', JSON.stringify(state.library));
  }, [state.profile, state.library]);

  return (
    <WeatherSteamStateContext.Provider value={state}>
      <WeatherSteamActionContext.Provider value={dispatch}>
        {children}
      </WeatherSteamActionContext.Provider>
    </WeatherSteamStateContext.Provider>
  );
}

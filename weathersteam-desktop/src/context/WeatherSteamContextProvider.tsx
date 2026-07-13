import {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer
} from 'react';
import { SteamProfile, SteamUserLibrary } from '../../common/types';

type State = {
  profile: SteamProfile;
  library: SteamUserLibrary;
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
  }
};

export const ActionTypes = {
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_LIBRARY: 'UPDATE_LIBRARY',
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

export const clearAction = () => ({
  type: ActionTypes.CLEAR
});

export type WeatherSteamAction =
  | ReturnType<typeof updateProfileAction>
  | ReturnType<typeof updateLibraryAction>
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
    case ActionTypes.CLEAR: {
      return initialState;
    }
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
      clearAction: () => dispatch(clearAction())
    }),
    [dispatch]
  );
};

export function WeatherSteamContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(weatherSteamReducer, initialState);

  return (
    <WeatherSteamStateContext.Provider value={state}>
      <WeatherSteamActionContext.Provider value={dispatch}>
        {children}
      </WeatherSteamActionContext.Provider>
    </WeatherSteamStateContext.Provider>
  );
}

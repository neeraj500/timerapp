import React, {createContext, useReducer, useEffect} from 'react';
import {loadTimersFromStorage, saveTimersToStorage} from '../utils/storage';

const TimerContext = createContext();

const initialState = {
  timers: [],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TIMERS':
      return {...state, timers: action.payload};
    case 'ADD_TIMER':
      return {...state, timers: [...state.timers, action.payload]};
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer,
        ),
      };
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };
    default:
      return state;
  }
};

export const TimerProvider = ({children}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    async function fetchTimers() {
      const storedTimers = await loadTimersFromStorage();
      if (storedTimers) {
        dispatch({type: 'LOAD_TIMERS', payload: storedTimers});
      }
    }
    fetchTimers();
  }, []);

  useEffect(() => {
    saveTimersToStorage(state.timers);
  }, [state.timers]);

  return (
    <TimerContext.Provider value={{state, dispatch}}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;

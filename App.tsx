import React from 'react';
import {TimerProvider} from './src/context/TimerContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <TimerProvider>
      <AppNavigator />
    </TimerProvider>
  );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import ServiceContext from "./services/ServiceContext";
import RecipeService from "./services/RecipeService";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ServiceContext.Provider value={{recipeService: new RecipeService()}}>
        <Navigation colorScheme={colorScheme} />
      </ServiceContext.Provider>
      <StatusBar />
    </SafeAreaProvider>
  );
}

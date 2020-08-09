import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios, {AxiosResponse} from 'axios';
import {EMAIL, PASSWORD} from "@env";

/**
 * Describes the login response from the API
 */
interface LoginServerResponse {
  access_token: string;
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        await axios.post<LoginServerResponse>('http://64.227.43.81/api/auth/login', {
          email: EMAIL,
          password: PASSWORD
        }).then(async (response: AxiosResponse<LoginServerResponse>): Promise<void> => {
          await AsyncStorage.setItem('token', response.data.access_token);
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

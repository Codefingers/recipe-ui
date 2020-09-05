import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios, {AxiosResponse} from 'axios';
import Constants from 'expo-constants';

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

          await axios.post<LoginServerResponse>(Constants.manifest.extra.baseApiUrl + '/auth/login', {
          email: Constants.manifest.extra.testEmail,
          password: Constants.manifest.extra.testPassword
        }).then(async (response: AxiosResponse<LoginServerResponse>): Promise<void> => {
          await AsyncStorage.setItem('token', response.data.access_token);
        });
      } catch (e) {
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

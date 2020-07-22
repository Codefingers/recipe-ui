import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import {MonoText} from "../components/StyledText";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Explore</MonoText>
      <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

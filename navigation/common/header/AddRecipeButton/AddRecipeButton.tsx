import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

/**
 * Component for an add recipe button
 */
export default () => {
    const navigation = useNavigation();

    return (
        <Ionicons name="md-add" size={32} color='white' style={styles.icon} onPress={() => navigation.navigate('CreateRecipe')} />
    );
}

const styles = StyleSheet.create({
   icon: {
       marginRight: 16
   }
});

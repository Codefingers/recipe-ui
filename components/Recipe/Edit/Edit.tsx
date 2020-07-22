import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Recipe} from "../../../services/types";
import {Input} from 'react-native-elements';
import {MaterialCommunityIcons} from "@expo/vector-icons";

/** Describes this components props */
interface Props {
    recipe: Recipe
}

/**
 * Component for editing recipes
 *
 * @param recipe {Recipe} Recipe that is being edited
 *
 * @returns {React.ReactElement}
 */
export default ({recipe}: Props): React.ReactElement => (
    <View style={styles.container}>
        <Input
            inputStyle={styles.input}
            label='Name'
            value={recipe.name}
            labelStyle={styles.inputLabel}
            rightIconContainerStyle={styles.iconContainer}
            rightIcon={<MaterialCommunityIcons name="clock" color='white' size={24} />}
        />
        <Input
            inputStyle={styles.input}
            label='Duration (minutes)'
            value={recipe.duration.toString()}
            labelStyle={styles.inputLabel}
            rightIconContainerStyle={styles.iconContainer}
            rightIcon={<MaterialCommunityIcons name="clock" color='white' size={24} />}
        />
        <Input
            inputStyle={styles.input}
            label='Difficulty'
            value={recipe.difficulty.toString()}
            labelStyle={styles.inputLabel}
            rightIcon={getChefHats(recipe.difficulty)}
        />
    </View>
);

/**
 * Renders a chef hat element for the number equal to the difficulty level
 *
 * @param difficultyLevel {number} the difficulty level of the recipe to render chef hats for
 *
 * @returns {React.ReactElement}
 */
function getChefHats(difficultyLevel: number): React.ReactElement{
    let starElements: React.ReactElement[] = [];

    for (let i = 0; i < difficultyLevel; i++) {
        starElements.push(
            <MaterialCommunityIcons key={i} name="chef-hat" color='white' size={24} />
        )
    }

    return <View style={styles.iconContainer}>{starElements}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 40
    },
    input: {
        backgroundColor: '#88B7B5',
        color: 'white',
        fontFamily: 'space-mono'
    },
    inputLabel: {
        color: 'black',
    },
    iconContainer: {
        display: "flex",
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#88B7B5',
    }
});
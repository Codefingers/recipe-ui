import * as React from "react";
import {Recipe} from "../../../services/types";
import {MonoText} from "../../StyledText";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";

/** Describes props for this component */
interface Props {
    recipe: Recipe
}

/**
 * Responsible for rendering a recipe
 *
 * @param recipe {Recipe} Recipe to render
 *
 * @returns {React.ReactElement}
 */
export default ({recipe}: Props): React.ReactElement => (
    <View style={styles.container}>
        <MonoText style={styles.recipeName}>
            {recipe.name}
        </MonoText>
        <View style={styles.iconContainer}>
            <View style={styles.durationContainer}>
                <MaterialCommunityIcons name="clock" color='white' size={24} style={styles.durationIcon}/>
                <MonoText> {recipe.duration} </MonoText>
            </View>
            {getChefHats(recipe.difficulty)}
        </View>
    </View>
);

/**
 * Renders a chef hat element for the number equal to the difficulty level
 *
 * @param difficultyLevel {number} the difficulty level of the recipe to render chef hats for
 *
 * @returns {React.ReactElement[]}
 */
function getChefHats(difficultyLevel: number): React.ReactElement[] {
    let starElements: React.ReactElement[] = [];

    for (let i = 0; i < difficultyLevel; i++) {
        starElements.push(
            <MaterialCommunityIcons key={i} name="chef-hat" color='white' size={24} />
        )
    }

    return starElements;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
    },
    iconContainer: {
        display: "flex",
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: "row",
    },
    durationContainer: {
        padding: 0,
        margin: 0,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    durationIcon: {
      marginRight: -8,
    },
    recipeName: {
        display: "flex",
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "row",
    }
})
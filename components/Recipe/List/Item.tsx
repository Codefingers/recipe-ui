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
        <MonoText>
            {recipe.name}
        </MonoText>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="clock" color='white' size={24} /><MonoText> {recipe.duration} </MonoText>
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
        alignItems: "center"
    },
    iconContainer: {
        display: "flex",
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: "row",
    }
})
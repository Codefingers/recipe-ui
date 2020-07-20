import * as React from "react";
import {Recipe} from "../../../services/types";
import {Text} from "../../Themed";

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
export default ({recipe}: Props): React.ReactElement =>
    <Text>
        {recipe.name}
    </Text>


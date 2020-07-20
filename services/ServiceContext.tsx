import * as React from "react";
import RecipeService from "./RecipeService";

/** Describes the data going into the service context */
export interface ServiceContextData {
    recipeService: RecipeService
}

export default React.createContext({ recipeService: new RecipeService()});
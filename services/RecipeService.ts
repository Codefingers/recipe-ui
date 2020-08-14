import {Recipe} from "./types";
import Http from "./Http";
import {AxiosResponse} from "axios";

/**
 * Service for handling service requests
 */
export default class RecipeService {
    /**
     * Returns all recipes
     *
     * @returns {Recipe[]} Recipes
     */
    public async getRecipes(): Promise<Recipe[]> {
        let recipes: Recipe[] = [];

        await Http.get<Recipe[]>('/recipe').then((response: AxiosResponse<Recipe[]>) => {
            recipes = response.data;
        }).catch((reason) => {
            console.warn(reason);
        });

        return recipes;
    }

    public async createRecipe(recipe: Recipe): Promise<Recipe> {
        await Http.post<Recipe>('/recipe', {
            recipe
        });

        return recipe;
    }
}
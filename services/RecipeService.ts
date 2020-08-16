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
        }).catch((reason: any) => {
            console.warn(reason);
        });

        return recipes;
    }

    /**
     * Creates a recipe
     *
     * @param recipe {Recipe} Recipe to create
     *
     * @returns {Promise<Recipe>} Created recipe
     */
    public async createRecipe(recipe: Recipe): Promise<Recipe> {
        let newRecipe: Recipe = recipe;

        await Http.post<Recipe>('/recipe', {
            ...recipe
        }).then((response: AxiosResponse<Recipe>) => {
            newRecipe = response.data;
        }).catch((reason: any) => {
            console.warn(reason);
        });

        return newRecipe;
    }

    /**
     * Updates a recipe
     *
     * @param recipe {Recipe} Recipe to update
     *
     * @returns {Promise<Recipe>} Updated recipe
     */
    public async updateRecipe(recipe: Recipe): Promise<Recipe> {
        let updatedRecipe: Recipe = recipe;

        await Http.put<Recipe>(`/recipe/${recipe.id}`, {
            ...recipe
        }).then((response: AxiosResponse<Recipe>) => {
            updatedRecipe = response.data;
        }).catch((reason: any) => {
            console.warn(reason);
        });

        return updatedRecipe;
    }

    /**
     * Deletes a recipe
     *
     * @param recipe {Recipe} Recipe to delete
     *
     * @returns {Promise<void>}
     */
    public async deleteRecipe(recipe: Recipe): Promise<void> {
        return Http.delete(`/recipe/${recipe.id}`);
    }
}

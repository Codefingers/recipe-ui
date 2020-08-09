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
        }).catch(() => {
            recipes = [
                {
                    id: 1,
                    name: 'Cepelinai',
                    difficulty: 5,
                    duration: 240,
                },
                {
                    id: 2,
                    name: 'Wet Burger',
                    difficulty: 3,
                    duration: 60
                },
                {
                    id: 3,
                    name: 'Pizza',
                    difficulty: 3,
                    duration: 180
                },
                {
                    id: 4,
                    name: 'Katsu Curry',
                    duration: 80,
                    difficulty: 4,
                },
                {
                    id: 5,
                    name: 'Lasagne',
                    duration: 60,
                    difficulty: 2
                },
                {
                    id: 6,
                    name: 'Bolognese',
                    duration: 60,
                    difficulty: 2
                }
            ];
        });

        return recipes;
    }
}
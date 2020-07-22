import {Recipe} from "./types";

/**
 * Service for handling service requests
 */
export default class RecipeService {
    /**
     * Returns all recipes
     *
     * @returns {Recipe[]} Recipes
     */
    public getRecipes(): Recipe[]
    {
        return [
            {
                id: 'recipe-id-1',
                name: 'Cepelinai',
                difficulty: 5,
                duration: 240,
            },
            {
                id: 'recipe-id-2',
                name: 'Wet Burger',
                difficulty: 3,
                duration: 60
            },
            {
                id: 'recipe-id-3',
                name: 'Pizza',
                difficulty: 3,
                duration: 180
            },
            {
                id: 'recipe-id-4',
                name: 'Katsu Curry',
                duration: 80,
                difficulty: 4,
            },
            {
                id: 'recipe-id-5',
                name: 'Lasagne',
                duration: 60,
                difficulty: 2
            },
            {
                id: 'recipe-id-6',
                name: 'Bolognese',
                duration: 60,
                difficulty: 2
            }
        ]
    }
}
/**
 * Service for handling service requests
 */
import {Recipe} from "./types";

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
                'id': 'recipe-id-1',
                'name': 'Cepelinai'
            },
            {
                'id': 'recipe-id-2',
                'name': 'Wet Burger'
            },
            {
                'id': 'recipe-id-3',
                'name': 'Pizza'
            },
            {
                'id': 'recipe-id-4',
                'name': 'Katsu Curry'
            },
            {
                'id': 'recipe-id-5',
                'name': 'Lasagne'
            },
            {
                'id': 'recipe-id-6',
                'name': 'Bolognese'
            }
        ]
    }
}
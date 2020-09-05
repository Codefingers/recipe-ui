import RecipeService from "../RecipeService";
import {Recipe} from "../types";
import * as moxios from 'moxios';
import Http from "../Http";

const pizzaRecipe: Recipe = {
    id: 1,
    name: 'pizza',
    duration: 120,
    difficulty: 5
};

describe('Recipe service functions as expected', (): void => {
    beforeEach((): void => {
        // tslint:disable-next-line:no-any
        moxios.install(Http as any);
    });

    afterEach((): void => {
        // tslint:disable-next-line:no-any
        moxios.uninstall(Http as any);
    });


    it('getRecipes returns recipes as expected', async (): Promise<void> => {
        const expectedRecipes: Recipe[] = [
            pizzaRecipe
        ];

        moxios.stubRequest(new RegExp('.*recipe'), {
            status: 200,
            response: expectedRecipes,
        });

        const service: RecipeService = new RecipeService();
        const recipes: Recipe[] = await service.getRecipes();

        expect(recipes).toEqual(expectedRecipes);
    });

    it('createRecipe returns the new recipe as expected', async (): Promise<void> => {
        moxios.stubRequest(new RegExp('.*recipe'), {
            status: 200,
            response: pizzaRecipe,
        });

        const service: RecipeService = new RecipeService();
        const recipe: Recipe = await service.createRecipe(pizzaRecipe);

        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(pizzaRecipe);
        expect(recipe).toEqual(pizzaRecipe);
    });

    it('updateRecipe returns the updated recipe as expected', async (): Promise<void> => {
        moxios.stubRequest(new RegExp('.*recipe/1'), {
            status: 200,
            response: pizzaRecipe,
        });

        const service: RecipeService = new RecipeService();
        const recipe: Recipe = await service.updateRecipe(pizzaRecipe);

        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(pizzaRecipe);
        expect(recipe).toEqual(pizzaRecipe);
    });

    it('deleteRecipe is passed the correct id', async (): Promise<void> => {
        moxios.stubRequest(new RegExp('.*recipe/1'), {
            status: 200,
            response: {},
        });

        const service: RecipeService = new RecipeService();
        await service.deleteRecipe(pizzaRecipe);
        expect(moxios.requests.mostRecent().url).toEqual('/recipe/1');
    });
});

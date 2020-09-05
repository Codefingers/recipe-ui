import RecipeService from "../RecipeService";
import {Recipe} from "../types";
import * as moxios from 'moxios';
import Http from "../Http";

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
           {
               id: 1,
               name: 'pizza',
               duration: 120,
               difficulty: 5
           }
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
        const expectedRecipes: Recipe[] = [
            {
                id: 1,
                name: 'pizza',
                duration: 120,
                difficulty: 5
            }
        ];

        moxios.stubRequest(new RegExp('.*recipe'), {
            status: 200,
            response: expectedRecipes,
        });

        const service: RecipeService = new RecipeService();
        const recipes: Recipe[] = await service.getRecipes();

        expect(recipes).toEqual(expectedRecipes);
    });
});
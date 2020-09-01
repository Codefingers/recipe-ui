import {Mock} from "ts-mockery";
import {StackNavigationProp} from "@react-navigation/stack";
import RecipeService from "../../../../services/RecipeService";
import {Recipe} from "../../../../services/types";
import renderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import React from "react";
import List from "../List";
import FlushPromises from "../../../../helpers/FlushPromises";

const recipePadThai: Recipe = {
    id: 1,
    name: 'Pad Thai',
    difficulty: 2,
    duration: 20
}

const recipeLasagne: Recipe = {
    id: 2,
    name: 'Lasagne',
    difficulty: 3,
    duration: 120
}

const mockNavigation = Mock.of<StackNavigationProp<any>>({
    navigate: jest.fn()
});

const mockService: RecipeService = Mock.of<RecipeService>({
    createRecipe: jest.fn((recipe: Recipe): Promise<Recipe> => Promise.resolve(recipe)),
    getRecipes: jest.fn((): Promise<Recipe[]> => Promise.resolve([recipeLasagne, recipePadThai])),
    updateRecipe: jest.fn((recipe: Recipe): Promise<Recipe> => Promise.resolve(recipe)),
    deleteRecipe: jest.fn(),
});

const testRenderer: ReactTestRenderer = renderer.create(<List navigation={mockNavigation} service={mockService}/>);
const tree: ReactTestInstance = testRenderer.root;

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
    jest.clearAllMocks();
    tree.instance.props = {
        navigation: mockNavigation,
        service: mockService,
        recipe: undefined
    };
});

describe('<List />', (): void => {
   it('gives the flatlist component as many recipes as retrieved from the service', async (): Promise<void> => {
       jest.mock('@react-native-community/async-storage');
       const recipeList: ReactTestInstance = tree.findByProps({"data-qa": "recipe-list"});

       // Ensure async functions have been completed
       await FlushPromises();
       expect(recipeList.props.data).toEqual(tree.instance.state.recipes);
   });
});

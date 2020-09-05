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
    createRecipe: jest.fn(),
    getRecipes: jest.fn((): Promise<Recipe[]> => Promise.resolve([recipeLasagne, recipePadThai])),
    updateRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
});

const testRenderer: ReactTestRenderer = renderer.create(<List navigation={mockNavigation} service={mockService}/>);
const tree: ReactTestInstance = testRenderer.root;

beforeAll(async (): Promise<void> => {
    jest.mock('@react-native-community/async-storage');
    jest.clearAllMocks();
    tree.instance.props = {
        navigation: mockNavigation,
        service: mockService,
        recipe: undefined
    };

    // Ensure async functions have been completed
    await FlushPromises();
});

describe('<List />', (): void => {
   it('gives the Flatlist component as many recipes as retrieved from the service', (): void => {
       const recipeList: ReactTestInstance = tree.findByProps({"data-qa": "recipe-list"});
       expect(recipeList.props.data).toEqual(tree.instance.state.recipes);
   });

   it('should pass the correct recipe to the next screen on edit', (): void => {
        const editButtons: ReactTestInstance[] = tree.findAllByProps({"data-qa": "edit-recipe-button"});
        editButtons[0].props.onPress();

        expect(mockNavigation.navigate).toBeCalledWith("EditRecipe", {recipe: recipeLasagne});
   });

    it('should pass the correct recipe to the next screen on edit', async (): Promise<void> => {
        const deleteButtons: ReactTestInstance[] = tree.findAllByProps({"data-qa": "delete-recipe-button"});
        deleteButtons[0].props.onPress();

        expect(mockService.deleteRecipe).toBeCalledWith(recipeLasagne);
        await FlushPromises();
        expect(tree.instance.state.recipes).not.toContain(recipeLasagne);
    });

    it('should retrieve a fresh set of recipes on refresh', async (): Promise<void> => {
        const recipeList: ReactTestInstance = tree.findByProps({"data-qa": "recipe-list"});
        const refreshControl: React.ReactElement = recipeList.props.refreshControl;

        await refreshControl.props.onRefresh();
        expect(mockService.getRecipes).toBeCalled();
    });

    it('should correctly add a new recipe to the recipes state if it has been passed down as a prop', (): void => {
        const pizza: Recipe = {
            id: 3,
            difficulty: 1,
            duration: 120,
            name: 'pizza'
        };

        renderer.act(() => {
            testRenderer.update(<List navigation={mockNavigation} service={mockService} newOrUpdatedRecipe={pizza}/>);
        });

        const recipeList: ReactTestInstance = tree.findByProps({"data-qa": "recipe-list"});
        expect(recipeList.props.data).toEqual(tree.instance.state.recipes);
    });

    it('should correctly update an existing recipe in the recipes state if it has been passed down as a prop and the id already exists', (): void => {
        const updatedLasagneRecipe: Recipe = {
            ...recipeLasagne,
            duration: 20,
        };

        renderer.act(() => {
                testRenderer.update(<List navigation={mockNavigation} service={mockService} newOrUpdatedRecipe={recipeLasagne}/>);
        });

        const recipeList: ReactTestInstance = tree.findByProps({"data-qa": "recipe-list"});
        expect(recipeList.props.data).toEqual(tree.instance.state.recipes);
    });
});

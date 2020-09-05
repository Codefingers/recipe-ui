import React from 'react';
import renderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import Form from "../Form";
import RecipeService from "../../../../services/RecipeService";
import {Mock} from "ts-mockery";
import {StackNavigationProp} from "@react-navigation/stack";
import {Recipe} from "../../../../services/types";

const mockNavigation = Mock.of<StackNavigationProp<any>>({
    navigate: jest.fn()
});

const mockService: RecipeService = Mock.of<RecipeService>({
        createRecipe: jest.fn((recipe: Recipe): Promise<Recipe> => Promise.resolve(recipe)),
        getRecipes: jest.fn(),
        updateRecipe: jest.fn((recipe: Recipe): Promise<Recipe> => Promise.resolve(recipe)),
        deleteRecipe: jest.fn(),
    });

const testRenderer: ReactTestRenderer = renderer.create(<Form navigation={mockNavigation} service={mockService}/>);
const tree: ReactTestInstance = testRenderer.root;

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
    jest.clearAllMocks();
    tree.instance.props = {
        navigation: mockNavigation,
        service: mockService,
        recipe: undefined
    };
    tree.instance.setState({
        difficulty: 1,
        duration: 60,
        name: ''
    });
});

describe('<Form />', (): void => {
    it('can update the recipe name as expected', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-name-input"});
        input.props.onChangeText('test');

        expect(tree.instance.state.recipe.name).toEqual('test');
    });

    it('can update the recipe difficulty as expected', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-difficulty-input"});
        input.props.onChangeText('1');

        expect(tree.instance.state.recipe.difficulty).toEqual(1);
    });

    it('can update the recipe duration as expected', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-duration-input"});
        input.props.onChangeText('120');

        expect(tree.instance.state.recipe.duration).toEqual(120);
    });

    it('can update the recipe duration to the max value if given input has been exceeded the max duration', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-duration-input"});
        input.props.onChangeText('4801');

        expect(tree.instance.state.recipe.duration).toEqual(4800);
    });

    it('can update the recipe duration to the min value if given input is below the min duration', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-duration-input"});
        input.props.onChangeText('-1');

        expect(tree.instance.state.recipe.duration).toEqual(0);
    });

    it('can update the recipe duration to the min value if given input is NaN', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-duration-input"});
        input.props.onChangeText('-');

        expect(tree.instance.state.recipe.duration).toEqual(0);
    });

    it('can update the recipe difficulty to the max value if given input has been exceeded the max difficulty', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-difficulty-input"});
        input.props.onChangeText('6');

        expect(tree.instance.state.recipe.difficulty).toEqual(5);
    });

    it('can update the recipe difficulty to the min value if given input is below the min difficulty', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-difficulty-input"});
        input.props.onChangeText('-1');

        expect(tree.instance.state.recipe.difficulty).toEqual(0);
    });

    it('can update the recipe difficulty to the min value if given input is NaN', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-difficulty-input"});
        input.props.onChangeText('-');

        expect(tree.instance.state.recipe.difficulty).toEqual(0);
    });

    it('onCreatePress calls the expected props', async (): Promise<void> => {
        const button: ReactTestInstance = tree.findByProps({"data-qa": "create-recipe-button"});
        await button.props.onPress();
        expect(mockService.createRecipe).toBeCalledWith(tree.instance.state.recipe);
        expect(mockNavigation.navigate).toBeCalledWith('RecipeListScreen', {recipe: tree.instance.state.recipe});
    });

    it('onSavePress calls the expected props', async (): Promise<void> => {
        const recipe: Recipe = {
            difficulty: 3,
            duration: 160,
            name: 'Mock recipe'
        };
        const treeWithRecipe: ReactTestInstance = renderer.create(<Form navigation={mockNavigation} service={mockService} recipe={recipe}/>).root;

        const button: ReactTestInstance = treeWithRecipe.findByProps({"data-qa": "save-recipe-button"});
        await button.props.onPress();
        expect(mockService.updateRecipe).toBeCalledWith(treeWithRecipe.instance.state.recipe);
        expect(mockNavigation.navigate).toBeCalledWith('RecipeListScreen', {recipe: treeWithRecipe.instance.state.recipe});
    })

    it('renders as many chefHats as the number set in the difficulty', (): void => {
        const input: ReactTestInstance = tree.findByProps({"data-qa": "recipe-difficulty-input"});
        input.props.onChangeText('4');
        expect(tree.findAllByProps({"data-qa": "chef-hat"}).length).toEqual(4);
    });
});

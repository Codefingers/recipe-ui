import * as React from "react";
import {FlatList, RefreshControl} from "react-native";
import Item from "./Item";
import RecipeService from "../../../services/RecipeService";
import {Recipe} from "../../../services/types";
import ItemWrapper from "./ItemWrapper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScrollView} from "../../Themed";

/** This components props */
interface Props {
    service: RecipeService,
    navigation: StackNavigationProp<any>,
    newOrUpdatedRecipe?: Recipe,
}

/** This components state */
interface State {
    selectedItem?: Recipe,
    recipes: Recipe[],
    refreshing: boolean,
}

/** Row current being handled */
let row: Array<any> = [];

/** Previously opened row if applicable */
let prevOpenedRow: any;

/**
 * Representation of a recipe list
 */
export default class List extends React.PureComponent<Props, State> {
    /**
     * @inheritDoc
     */
    public constructor(props: Props) {
        super(props);

        this.state = {
            selectedItem: undefined,
            recipes: [],
            refreshing: false,
        };
    }

    /**
     * @inheritDoc
     */
    componentDidMount = async (): Promise<void> =>
        this.setState({
            recipes: await this.props.service.getRecipes()
        });

    /**
     * @inheritDoc
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const recipes = [...this.state.recipes];
        const recipeIndex: number = recipes.findIndex((recipe: Recipe): boolean => recipe.id === this.props.newOrUpdatedRecipe?.id);

        if (this.props.newOrUpdatedRecipe !== prevProps.newOrUpdatedRecipe && this.props.newOrUpdatedRecipe) {
            // if our recipe is a new one, add it to the list
            if (recipeIndex === -1) {
                this.setState({
                    recipes: [
                        ...recipes,
                        this.props.newOrUpdatedRecipe
                    ]
                });

                return;
            }

            // otherwise replace the old copy of the recipe that has been updated
            recipes.splice(recipeIndex, 1, this.props.newOrUpdatedRecipe);
            this.setState({
                recipes,
            })
        }
    }

    /**
     * @inheritDoc
     */
    public render = (): React.ReactElement =>
        <FlatList<Recipe>
            data-qa="recipe-list"
            refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
            }
            data={this.state.recipes}
            renderItem={this.renderItem}
            keyExtractor={recipe => recipe.name}
            style={{backgroundColor: '#F4ECD6', paddingTop: 4}}
        />

    /**
     * Renders a list item
     *
     * @param item  {Recipe} Item to render
     * @param index {number} Current index of the item being rendered
     *
     * @returns {React.ReactElement}
     */
    private renderItem = ({item, index}: { item: Recipe, index: number }): React.ReactElement => (
        <Swipeable
            renderRightActions={this.renderRightActions(item)}
            onSwipeableOpen={this.closeRow(index)}
            ref={ref => row[index] = ref}
        >
            <ItemWrapper>
                <Item data-qa="recipe-item" recipe={item}/>
            </ItemWrapper>
        </Swipeable>
    );

    /**
     * Responsible for rendering actions on the right of the item
     *
     * @returns {React.ReactElement}
     */
    private renderRightActions = (item: Recipe): () => React.ReactElement => () => (
        <>
            <ActionButton error={true} data-qa="delete-recipe-button" onPress={this.onDeletePress(item)}>
                <MaterialCommunityIcons name="trash-can" color='white' size={24} />
            </ActionButton>
            <ActionButton data-qa="edit-recipe-button" onPress={this.onEditPress(item)}>
                <MaterialCommunityIcons name="pencil" color='white' size={24} />
            </ActionButton>
        </>
    );

    /**
     * Closes a row
     *
     * @param index {number} Row to close
     *
     * @returns {() => void}
     */
    private closeRow(index: number) {
        return () => {
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        }
    }

    /**
     * Handler for when edit was pressed
     *
     * @param item {Recipe} Recipe that is being edited
     *
     * @returns {() => void}
     */
    private onEditPress = (item: Recipe) => async (): Promise<void> => {
        row = [];
        this.props.navigation.navigate('EditRecipe', {recipe: item});
    }

    /**
     * Handler for when delete was pressed
     *
     * @param item {Recipe} Recipe that is being deleted
     *
     * @returns {() => void}
     */
    private onDeletePress = (item: Recipe) => async (): Promise<void> => {
        await this.props.service.deleteRecipe(item);

        this.setState({
            recipes: this.state.recipes.filter((recipe: Recipe) => recipe.name !== item.name)
        });
    }

    /**
     * Handler for when refresh is triggered
     *
     * @return {Promise<void>}
     */
    private onRefresh = async (): Promise<void> => {
        row = [];
        this.setState({
            refreshing: true,
        });

        const recipes: Recipe[] = await this.props.service.getRecipes();
        this.setState({
            recipes,
            refreshing: false,
        });
    }
}

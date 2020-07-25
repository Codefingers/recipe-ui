import * as React from "react";
import {FlatList} from "react-native";
import Item from "./Item";
import RecipeService from "../../../services/RecipeService";
import {Recipe} from "../../../services/types";
import ItemWrapper from "./ItemWrapper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import {StackNavigationProp} from "@react-navigation/stack";

/** This components props */
interface Props {
    service: RecipeService,
    navigation: StackNavigationProp<any>,
    newRecipe?: Recipe,
}

/** This components state */
interface State {
    selectedItem?: Recipe
    recipes: Recipe[],
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
        };
    }

    /**
     * @inheritDoc
     */
    componentDidMount = () =>
        this.setState({
            recipes: this.props.service.getRecipes()
        })

    /**
     * @inheritDoc
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const isNewRecipe: boolean = !this.state.recipes.find((recipe: Recipe): boolean => recipe.name === this.props.newRecipe?.name)

        if (this.props.newRecipe !== prevProps.newRecipe && this.props.newRecipe && isNewRecipe) {
            this.setState({
                recipes: [
                    ...this.state.recipes,
                    this.props.newRecipe
                ]
            })
        }
    }

    /**
     * @inheritDoc
     */
    public render = (): React.ReactElement => (
        <FlatList<Recipe>
            data={this.state.recipes}
            renderItem={this.renderItem}
            keyExtractor={recipe => recipe.name}
            style={{backgroundColor: '#F4ECD6', paddingTop: 4}}
        />
    );

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
                <Item recipe={item}/>
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
            <ActionButton error={true} onPress={this.onDeletePress(item)}>
                <MaterialCommunityIcons name="trash-can" color='white' size={24} />
            </ActionButton>
            <ActionButton onPress={this.onEditPress(item)}>
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
    private onEditPress = (item: Recipe) => () =>
        this.props.navigation.navigate('EditRecipe', {recipe: item});

    /**
     * Handler for when delete was pressed
     *
     * @param item {Recipe} Recipe that is being deleted
     *
     * @returns {() => void}
     */
    private onDeletePress = (item: Recipe) => () => {
        this.setState({
            recipes: this.state.recipes.filter((recipe: Recipe) => recipe.name !== item.name)
        })
    }
}

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
    navigation: StackNavigationProp<any>
}

/** This components state */
interface State {
    selectedItem?: Recipe
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
            selectedItem: undefined
        };
    }

    /**
     * @inheritDoc
     */
    public render = (): React.ReactElement => (
        <FlatList<Recipe>
            data={this.props.service.getRecipes()}
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
            <ActionButton error={true} onPress={this.onDeletePress}>
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
     * @returns void
     */
    private onEditPress = (item: Recipe) => (pointerInside: boolean) =>
        this.props.navigation.navigate('EditRecipe', {recipe: item});

    /**
     * Handler for when delete was pressed
     *
     * @param pointerInside {boolean}
     */
    private onDeletePress = (pointerInside: boolean) => {
        this.props.navigation.navigate('NotFound');
    }
}

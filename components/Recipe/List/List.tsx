import * as React from "react";
import {FlatList} from "react-native";
import Item from "./Item";
import RecipeService from "../../../services/RecipeService";
import {Recipe} from "../../../services/types";
import ItemWrapper from "./ItemWrapper";

/** This components props */
interface Props {
    service: RecipeService
}

export default class List extends React.PureComponent<Props> {
    /**
     * @inheritDoc
     */
    public constructor(props: Props) {
        super(props);
    }

    public render = (): React.ReactElement => (
        <FlatList<Recipe>
            data={this.props.service.getRecipes()}
            renderItem={this.renderItem}
            keyExtractor={recipe => recipe.name}
        />
    );

    private renderItem = ({item}: { item: Recipe }): React.ReactElement => {
        return <ItemWrapper>
            <Item recipe={item} />
        </ItemWrapper>
    }
}
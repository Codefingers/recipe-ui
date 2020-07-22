import * as React from 'react';
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import List from "../components/Recipe/List";
import {View} from "../components/Themed";

/**
 * The recipe list screen for displaying recipes
 */
export default function RecipeListScreen({ navigation }) {
    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData ): React.ReactElement => (
                <View>
                    <List service={serviceContextData.recipeService} navigation={navigation} />
                </View>
            )}
        </ServiceContext.Consumer>
    );
}
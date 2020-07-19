import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import List from "../components/Recipe/List";
import RecipeService from "../services/RecipeService";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Cepelinai',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Wet Burger',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Pizza',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d33',
        title: 'Katsu Curry',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e2944',
        title: 'Lasagne',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e2955',
        title: 'Bolognese',
    },
];

const Item = ({title}: { title: string }) => (
    <View>
        <Text>{title}</Text>
    </View>
);

const renderItem = ({item}: { item: { title: string } }) => (
    <Item title={item.title}/>
);

export default function RecipeListScreen() {
    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData ): React.ReactElement => (
                <View style={styles.container}>
                    <List service={serviceContextData.recipeService} />
                </View>
            )}
        </ServiceContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        color: '#000',
    },
});
import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          RecipeListTab: {
            screens: {
              RecipeListScreen: 'one',
            },
          },
          ExploreTab: {
            screens: {
              RecipeListScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

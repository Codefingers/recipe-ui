import {Recipe} from "./services/types";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  CreateRecipe: undefined;
  EditRecipe: { recipe: Recipe };
};

export type BottomTabParamList = {
  RecipeListTab: { newRecipe: undefined };
  ExploreTab: undefined;
};

export type RecipeListTabParamList = {
  RecipeListScreen: { newRecipe: undefined };
};

export type EditRecipeParamList = {
  EditRecipeScreen: undefined;
};

export type ExploreTabParamList = {
  RecipeExploreScreen: undefined;
};

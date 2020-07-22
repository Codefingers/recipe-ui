import {Recipe} from "./services/types";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  EditRecipe: { recipe: Recipe };
};

export type BottomTabParamList = {
  RecipeListTab: undefined;
  ExploreTab: undefined;
};

export type RecipeListTabParamList = {
  RecipeListScreen: undefined;
};

export type ExploreTabParamList = {
  RecipeExploreScreen: undefined;
};
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Recipe} from "../../../services/types";
import {Button, Input} from 'react-native-elements';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import RecipeService from "../../../services/RecipeService";
import {StackNavigationProp} from "@react-navigation/stack";

/** Describes this components props */
interface Props {
    service: RecipeService,
    navigation: StackNavigationProp<any>,
    recipe?: Recipe,
}

/** Describes this components state */
interface State {
    recipe: Recipe
}

/** Max difficulty a recipe can have */
const MAX_DIFFICULTY: number = 5;

/** Min difficulty a recipe can have */
const MIN_DIFFICULTY: number = 0;

/** Max duration a recipe can have */
const MAX_DURATION: number = 4800;

/** Min duration a recipe can have */
const MIN_DURATION: number = 0;

/**
 * Component for creating and editing recipes
 *
 * @param recipe {Recipe} Recipe that is being edited
 *
 * @returns {React.ReactElement}
 */
export default class Form extends React.PureComponent<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            recipe: this.props.recipe || {
                difficulty: 1,
                duration: 60,
                name: ''
            }
        }
    }

    /**
     * Handler for when the recipe name changes
     *
     * @param name {string} New name to set against the recipe
     *
     * @returns {void}
     */
    private nameChangeHandler = (name: string): void =>
        this.setState({
            recipe: {
                ...this.state.recipe,
                name
            }
        });

    /**
     * Handler for when the recipe duration changes
     *
     * @param duration {string} New duration to set against the recipe
     *
     * @returns {void}
     */
    private durationChangeHandler = (duration: string): void => {
        let durationNumeric: number = Number(duration);
        if (isNaN(durationNumeric)) {
            durationNumeric = MIN_DURATION;
        }

        if (durationNumeric > MAX_DURATION) {
            durationNumeric = MAX_DURATION;
        }

        if (durationNumeric < MIN_DURATION) {
            durationNumeric = MIN_DURATION;
        }

        this.setState({
            recipe: {
                ...this.state.recipe,
                duration: durationNumeric
            }
        });
    }

    /**
     * Handler for when the recipe difficulty changes
     *
     * @param difficulty {string} New difficulty to set against the recipe
     *
     * @returns {void}
     */
    private difficultyChangeHandler = (difficulty: string): void => {
        let difficultyNumeric: number = Number(difficulty);
        if (isNaN(difficultyNumeric)) {
            difficultyNumeric = MIN_DIFFICULTY;
        }

        if (difficultyNumeric > MAX_DIFFICULTY) {
            difficultyNumeric = MAX_DIFFICULTY;
        }

        if (difficultyNumeric < MIN_DIFFICULTY) {
            difficultyNumeric = MIN_DIFFICULTY;
        }

        this.setState({
            recipe: {
                ...this.state.recipe,
                difficulty: difficultyNumeric
            }
        });
    }

    /**
     * Renders form buttons
     *
     * @returns {React.ReactElement}
     */
    private renderFooterActions = (): React.ReactElement => {
        if (!this.props.recipe) {
            return (
                <Button
                    title={'Create'}
                    icon={
                        <MaterialCommunityIcons name="check" color='white' size={42}/>
                    }
                    iconRight={true}
                    titleStyle={styles.buttonLabel}
                    buttonStyle={styles.saveButton}
                    onPress={this.onCreatePress}
                    data-qa="create-recipe-button"
                >
                </Button>
            );
        }

        return (
            <Button
                title={'Save'}
                icon={
                    <MaterialCommunityIcons name="check" color='white' size={42}/>
                }
                iconRight={true}
                titleStyle={styles.buttonLabel}
                buttonStyle={styles.saveButton}
                onPress={this.onSavePress}
                data-qa="save-recipe-button"
            >
            </Button>
        );
    }

    /**
     * @inheritDoc
     */
    public render = (): React.ReactElement => (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Input
                    inputStyle={styles.input}
                    label='Name'
                    value={this.state.recipe.name}
                    labelStyle={styles.inputLabel}
                    rightIconContainerStyle={styles.iconContainer}
                    onChangeText={this.nameChangeHandler}
                    data-qa="recipe-name-input"
                />
                <Input
                    inputStyle={styles.input}
                    label='Duration (minutes)'
                    value={this.state.recipe.duration.toString()}
                    labelStyle={styles.inputLabel}
                    rightIconContainerStyle={styles.iconContainer}
                    rightIcon={<MaterialCommunityIcons name="clock" color='white' size={24}/>}
                    keyboardType={"numeric"}
                    onChangeText={this.durationChangeHandler}
                    data-qa="recipe-duration-input"
                />
                <Input
                    inputStyle={styles.input}
                    label='Difficulty'
                    value={this.state.recipe.difficulty.toString()}
                    labelStyle={styles.inputLabel}
                    rightIcon={this.getChefHats(this.state.recipe.difficulty)}
                    keyboardType={"numeric"}
                    onChangeText={this.difficultyChangeHandler}
                    data-qa="recipe-difficulty-input"
                />
            </View>
            {this.renderFooterActions()}
        </View>

    );

    /**
     * Handler for when create is pressed
     *
     * @returns {Promise<void>}
     */
    private onCreatePress = async (): Promise<void> => {
        const createdRecipe: Recipe = await this.props.service.createRecipe(this.state.recipe);
        this.props.navigation.navigate('RecipeListScreen', {recipe: createdRecipe})
    }

    /**
     * Handler for when save is pressed
     *
     * @return {async () => {Promise<void>}}
     */
    private onSavePress = async (): Promise<void> => {
        const updatedRecipe: Recipe = await this.props.service.updateRecipe(this.state.recipe);
        this.props.navigation.navigate('RecipeListScreen', {recipe: updatedRecipe})
    }

    /**
     * Renders a chef hat element for the number equal to the difficulty level
     *
     * @param difficultyLevel {number} the difficulty level of the recipe to render chef hats for
     *
     * @returns {React.ReactElement}
     */
    private getChefHats = (difficultyLevel: number): React.ReactElement => {
        let starElements: React.ReactElement[] = [];

        for (let i = 0; i < difficultyLevel; i++) {
            starElements.push(
                <MaterialCommunityIcons data-qa="chef-hat" key={i} name="chef-hat" color='white' size={24}/>
            )
        }

        return <View style={styles.iconContainer}>{starElements}</View>;
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: "flex",
    },
    formContainer: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 40,
        display: "flex",
    },
    input: {
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'space-mono',
        width: '100%',
    },
    inputLabel: {
        color: 'black',
    },
    iconContainer: {
        display: "flex",
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'black',
    },
    saveButton: {
        width: '100%',
        height: 60,
        backgroundColor: '#A7CAB1',
        display: "flex",
    },
    buttonLabel: {
        marginRight: 8,
        fontSize: 24,
    }
});

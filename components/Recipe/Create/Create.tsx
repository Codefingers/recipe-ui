import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Recipe} from "../../../services/types";
import {Button, Input} from 'react-native-elements';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import RecipeService from "../../../services/RecipeService";
import {StackNavigationProp} from "@react-navigation/stack";

/** Describes this components props */
interface Props {
    service: RecipeService,
    navigation: StackNavigationProp<any>
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
 * Component for editing recipes
 *
 * @param recipe {Recipe} Recipe that is being edited
 *
 * @returns {React.ReactElement}
 */
export default class Create extends React.PureComponent<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            recipe: {
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
                    />
                    <Input
                        inputStyle={styles.input}
                        label='Difficulty'
                        value={this.state.recipe.difficulty.toString()}
                        labelStyle={styles.inputLabel}
                        rightIcon={this.getChefHats(this.state.recipe.difficulty)}
                        keyboardType={"numeric"}
                        onChangeText={this.difficultyChangeHandler}
                    />
                </View>
                <Button
                    title={'Create'}
                    icon={
                        <MaterialCommunityIcons name="check" color='white' size={42}/>
                    }
                    iconRight={true}
                    titleStyle={styles.buttonLabel}
                    buttonStyle={styles.saveButton}
                    onPress={this.onPress}
                >
                </Button>
            </View>
        );

    private onPress = (): void => {
        this.props.navigation.navigate('RecipeListScreen', {newRecipe: this.state.recipe})
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
                <MaterialCommunityIcons key={i} name="chef-hat" color='white' size={24}/>
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

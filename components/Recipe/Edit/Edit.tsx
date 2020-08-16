import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Recipe} from "../../../services/types";
import {Button, Input} from 'react-native-elements';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import RecipeService from "../../../services/RecipeService";
import {StackNavigationProp} from "@react-navigation/stack";

/** Describes this components props */
interface Props {
    recipe: Recipe,
    service: RecipeService,
    navigation: StackNavigationProp<any>
}

/** Describes this components state */
interface State {
    editedRecipe: Recipe
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
export default class Edit extends React.PureComponent<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            editedRecipe: {...this.props.recipe}
        }
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.setState({
            editedRecipe: {...this.props.recipe}
        })
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
            editedRecipe: {
                ...this.state.editedRecipe,
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
            editedRecipe: {
                ...this.state.editedRecipe,
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
            editedRecipe: {
                ...this.state.editedRecipe,
                difficulty: difficultyNumeric
            }
        });
    }

    /**
     * @inheritDoc
     */
    public render = (): React.ReactElement | null => {
        if (!this.props.recipe) {
            return null;
        }

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Input
                        inputStyle={styles.input}
                        label='Name'
                        value={this.state.editedRecipe.name}
                        labelStyle={styles.inputLabel}
                        rightIconContainerStyle={styles.iconContainer}
                        onChangeText={this.nameChangeHandler}
                    />
                    <Input
                        inputStyle={styles.input}
                        label='Duration (minutes)'
                        value={this.state.editedRecipe.duration.toString()}
                        labelStyle={styles.inputLabel}
                        rightIconContainerStyle={styles.iconContainer}
                        rightIcon={<MaterialCommunityIcons name="clock" color='white' size={24}/>}
                        keyboardType={"numeric"}
                        onChangeText={this.durationChangeHandler}
                    />
                    <Input
                        inputStyle={styles.input}
                        label='Difficulty'
                        value={this.state.editedRecipe.difficulty.toString()}
                        labelStyle={styles.inputLabel}
                        rightIcon={getChefHats(this.state.editedRecipe.difficulty)}
                        keyboardType={"numeric"}
                        onChangeText={this.difficultyChangeHandler}
                    />
                </View>
                <Button
                    title={'Save'}
                    icon={
                        <MaterialCommunityIcons name="check" color='white' size={42}/>
                    }
                    iconRight={true}
                    titleStyle={styles.buttonLabel}
                    buttonStyle={styles.saveButton}
                    onPress={this.onSave}
                >
                </Button>
            </View>
        );
    }

    /**
     * Handler for when save is pressed
     *
     * @return {async () => {Promise<void>}}
     */
    private onSave = async (): Promise<void> => {
        const updatedRecipe: Recipe = await this.props.service.updateRecipe(this.state.editedRecipe);
        this.props.navigation.navigate('RecipeListScreen', {recipe: updatedRecipe})
    }
}

/**
 * Renders a chef hat element for the number equal to the difficulty level
 *
 * @param difficultyLevel {number} the difficulty level of the recipe to render chef hats for
 *
 * @returns {React.ReactElement}
 */
function getChefHats(difficultyLevel: number): React.ReactElement {
    let starElements: React.ReactElement[] = [];

    for (let i = 0; i < difficultyLevel; i++) {
        starElements.push(
            <MaterialCommunityIcons key={i} name="chef-hat" color='white' size={24}/>
        )
    }

    return <View style={styles.iconContainer}>{starElements}</View>;
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

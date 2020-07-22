import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Recipe} from "../../../services/types";
import {Input} from 'react-native-elements';
import {MaterialCommunityIcons} from "@expo/vector-icons";

/** Describes this components props */
interface Props {
    recipe: Recipe
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
    public render = (): React.ReactElement => (
        <View style={styles.container}>
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
    );
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
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 40,
    },
    input: {
        backgroundColor: '#88B7B5',
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
        backgroundColor: '#88B7B5',
    }
});
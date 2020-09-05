import renderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import React from "react";
import ActionButton from "../ActionButton";
import {BorderlessButton} from "react-native-gesture-handler";

const testRenderer: ReactTestRenderer = renderer.create(<ActionButton error={false} children={<div/>} onPress={jest.fn()} />);
const tree: ReactTestInstance = testRenderer.root;

describe('<ActionButton />', (): void => {
    it('correctly sets the onPress button', (): void => {
        tree.findByType(BorderlessButton).props.onPress(true);

        expect(tree.props.onPress).toBeCalledWith(true);
    });
});
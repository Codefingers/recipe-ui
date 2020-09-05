import {BorderlessButton} from "react-native-gesture-handler";
import * as React from "react";

/** Properties of the component */
interface Props {
    children: React.ReactElement | React.ReactElement[];
    error?: boolean;
    onPress?: (pointerInside: boolean) => void;
}

export default ({children, error, onPress}: Props) =>
    <BorderlessButton
        onPress={onPress}
        style={{
            backgroundColor: error === true ? '#e5989b' : '#A7CAB1',
            marginBottom: 4,
            borderRadius: 4,
            width: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        {children}
    </BorderlessButton>
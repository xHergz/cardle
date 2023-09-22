import React from "react";
import { CardValue } from "../lib/card";
import Key from "./Key";

export type ValueKeyProps = React.PropsWithChildren<{
    value: CardValue;
    onClick: (value: CardValue) => void;
}>;

const ValueKey: React.FunctionComponent<ValueKeyProps> = (
    props: ValueKeyProps
): JSX.Element => {
    const clickHandler = (): void => {
        props.onClick(props.value);
    };

    const getLabel = (): string => {
        switch (props.value) {
            case "ace":
            case "king":
            case "queen":
            case "jack":
                return props.value[0].toUpperCase();
            default:
                return props.value;
        }
    };

    return (
        <Key onClick={clickHandler} double={false}>
            {getLabel()}
        </Key>
    );
};

export default ValueKey;

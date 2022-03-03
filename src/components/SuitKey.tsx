import React from "react";
import { CardSuit } from "../lib/card";
import Key from "./Key";
import { getSuitEmoji } from "../util/card.utils";

export type SuitKeyProps = React.PropsWithChildren<{
    suit: CardSuit;
    onClick: (suit: CardSuit) => void;
}>;

const SuitKey: React.FunctionComponent<SuitKeyProps> = (
    props: SuitKeyProps
): JSX.Element => {
    const clickHandler = (): void => {
        props.onClick(props.suit);
    };

    return (
        <Key onClick={clickHandler} double={false}>
            {getSuitEmoji(props.suit)}
        </Key>
    );
};

export default SuitKey;

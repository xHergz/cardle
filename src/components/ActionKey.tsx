import React from "react";
import Key from "./Key";

export type ActionKeyProps = React.PropsWithChildren<{
    label: string;
    onClick: () => void;
}>;

const ActionKey: React.FunctionComponent<ActionKeyProps> = (
    props: ActionKeyProps
): JSX.Element => {
    return (
        <Key onClick={props.onClick} double>
            {props.label}
        </Key>
    );
};

export default ActionKey;

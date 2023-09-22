import { useCallback, useState } from "react";

export function useVisibility(
  initiallyVisible: boolean,
  prepare?: () => void
): [boolean, () => void, () => void] {
  const [visible, setVisible] = useState<boolean>(initiallyVisible);

  const show = useCallback((): void => {
    if (prepare) {
      prepare();
    }
    return setVisible(true);
  }, [prepare, setVisible]);

  const hide = useCallback((): void => {
    return setVisible(false);
  }, [setVisible]);

  return [visible, show, hide];
}

export function useToggle(initialState: boolean): [boolean, () => void] {
  const [toggle, setToggle] = useState<boolean>(initialState);

  const changeToggle = useCallback((): void => {
    return setToggle(!toggle);
  }, [toggle, setToggle]);

  return [toggle, changeToggle];
}

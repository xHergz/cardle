import { makeStyles } from "../../util/style.utils";

export type BottomBannerProps = React.PropsWithChildren<{
  open?: boolean;
}>;

const useStyles = makeStyles()((theme) => ({
  banner: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
}));

const BottomBanner: React.FunctionComponent<BottomBannerProps> = (
  props: BottomBannerProps
): JSX.Element | null => {
  const { classes } = useStyles();

  if (!props.open) {
    return null;
  }

  return <div className={classes.banner}>{props.children}</div>;
};

export default BottomBanner;

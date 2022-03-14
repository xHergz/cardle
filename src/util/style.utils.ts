import { useTheme } from "@mui/material";
import { createMakeStyles, createWithStyles } from "tss-react";

export const { makeStyles } = createMakeStyles({ useTheme });
export const { withStyles } = createWithStyles({ useTheme });

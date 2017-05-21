import { types } from "../constants/ActionTypes";

export const toggleDialog = payload => ({ type: types.TOGGLE_DIALOG, payload });

export const toggleDrawer = payload => ({ type: types.TOGGLE_DRAWER, payload });

export const refreshCanvasSchema = payload => ({ type: "REFRESH_CANVAS_SCHEMA", payload });

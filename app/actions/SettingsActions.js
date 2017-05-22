import { types } from "../constants/ActionTypes";

export const toggleDialog = payload => ({ type: types.TOGGLE_DIALOG, payload });

export const toggleDrawer = payload => ({ type: types.TOGGLE_DRAWER, payload });

export const refreshCanvasSchema = payload => ({ type: "REFRESH_CANVAS_SCHEMA", payload });

export const saveSettings = payload => ({ type: "SAVE_SETTINGS", payload });

export const saveSettingsSucceeded = payload => ({ type: "SAVE_SETTINGS_SUCCEEDED", payload });

export const saveSettingsFailed = error => ({ type: "SAVE_SETTINGS_FAILED", error });
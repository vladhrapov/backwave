import { types } from "../constants/ActionTypes";

export const toggleDialog = payload => ({ type: types.TOGGLE_DIALOG, payload });

export const toggleDrawer = payload => ({ type: types.TOGGLE_DRAWER, payload });

export const toggleSpinner = payload => ({ type: "TOGGLE_SPINNER", payload });

export const refreshCanvasSchema = payload => ({ type: "REFRESH_CANVAS_SCHEMA", payload });

export const loadSettings = () => ({ type: "LOAD_SETTINGS" });

export const loadSettingsSucceeded = payload => ({ type: "LOAD_SETTINGS_SUCCEEDED", payload });

export const loadSettingsFailed = error => ({ type: "LOAD_SETTINGS_FAILED", error });

export const saveSettings = payload => ({ type: "SAVE_SETTINGS", payload });

export const saveSettingsSucceeded = payload => ({ type: "SAVE_SETTINGS_SUCCEEDED", payload });

export const saveSettingsFailed = error => ({ type: "SAVE_SETTINGS_FAILED", error });
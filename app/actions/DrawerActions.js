import { types } from "../constants/ActionTypes";

export function toggleDrawer(drawer) {
  return {
    type: types.TOGGLE_DRAWER,
    drawer
  };
}

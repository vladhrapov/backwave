export const loadCanvasList = () => ({ type: "LOAD_CANVAS_LIST" });

export const loadCanvasListSucceeded = (payload) => ({ type: "LOAD_CANVAS_LIST_SUCCEEDED", payload });

export const loadListFailed = (error) => ({ type: "LOAD_CANVAS_LIST_FAILED", error });

export const saveCanvasToList = (payload) => ({ type: "SAVE_CANVAS_TO_LIST", payload });

export const saveCanvasToListSucceeded = (payload) => ({ type: "SAVE_CANVAS_TO_LIST_SUCCEEDED", payload });

export const saveCanvasToListFailed = (error) => ({ type: "SAVE_CANVAS_TO_LIST_FAILED", error });

export const removeCanvasFromList = (payload) => ({ type: "REMOVE_CANVAS_FROM_LIST", payload });

export const removeCanvasFromListSucceeded = (payload) => ({ type: "REMOVE_CANVAS_FROM_LIST_SUCCEEDED", payload });

export const removeCanvasFromListFailed = (error) => ({ type: "REMOVE_CANVAS_FROM_LIST_FAILED", error });
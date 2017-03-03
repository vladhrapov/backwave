export const loadCanvasList = () => ({ type: "LOAD_CANVAS_LIST" });

export const loadCanvasListSucceeded = (payload) => ({ type: "LOAD_CANVAS_LIST_SUCCEEDED", payload });

export const loadListFailed = (error) => ({ type: "LOAD_CANVAS_LIST_FAILED", error });

export const saveCanvasToList = (payload) => ({ type: "SAVE_CANVAS_TO_LIST", payload });

export const saveCanvasToListSucceeded = () => ({ type: "SAVE_CANVAS_TO_LIST_SUCCEEDED" });

export const saveCanvasToListFailed = () => ({ type: "SAVE_CANVAS_TO_LIST_FAILED" });

export const removeCanvasFromList = () => ({ type: "REMOVE_CANVAS_FROM_LIST" });

export const removeCanvasFromListSucceeded = () => ({ type: "REMOVE_CANVAS_FROM_LIST_SUCCEEDED" });

export const removeCanvasFromListFailed = () => ({ type: "REMOVE_CANVAS_FROM_LIST_FAILED" });
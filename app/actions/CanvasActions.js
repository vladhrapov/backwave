export const loadCanvasList = () => ({ type: "LOAD_CANVAS_LIST" });

export const loadCanvasListSucceeded = (payload) => ({ type: "LOAD_CANVAS_LIST_SUCCEEDED", payload });

export const loadCanvasListFailed = (error) => ({ type: "LOAD_CANVAS_LIST_FAILED", error });

export const loadDataTypes = () => ({ type: "LOAD_DATA_TYPES" });

export const loadDataTypesSucceeded = (payload) => ({ type: "LOAD_DATA_TYPES_SUCCEDED", payload });

export const loadDataTypesFailed = (error) => ({ type: "LOAD_DATA_TYPES_FAILED", error });

export const addDataType = (payload) => ({ type: "ADD_DATA_TYPE", payload });

export const addDataTypeSucceeded = (payload) => ({ type: "ADD_DATA_TYPE_SUCCEEDED", payload });

export const addDataTypeFailed = (error) => ({ type: "ADD_DATA_TYPE_FAILED", error });

export const removeDataType = (payload) => ({ type: "REMOVE_DATA_TYPE", payload });

export const removeDataTypeSucceeded = (payload) => ({ type: "REMOVE_DATA_TYPE_SUCCEEDED", payload });

export const removeDataTypeFailed = (error) => ({ type: "REMOVE_DATA_TYPE_FAILED", error });

export const saveDataTypes = (payload) => ({ type: "SAVE_DATA_TYPES", payload });

export const saveDataTypesSucceeded = (payload) => ({ type: "SAVE_DATA_TYPES_SUCCEDED", payload });

export const saveDataTypesFailed = (error) => ({ type: "SAVE_DATA_TYPES_FAILED", error });
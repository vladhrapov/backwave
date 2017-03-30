import { firebaseRef } from "../constants/FirebaseConfig";

export const loadDataTypesApi = () => {
  return firebaseRef.ref("dataTypesCollection")
    .once("value")
    .then(data => data.val());
}


export const addDataTypeApi = payload => {
  let { id } = payload;

  return firebaseRef
    .ref("dataTypesCollection")
    .child(id)
    .set({ ...payload });
}

export const saveDataTypesApi = (payload, payloadWithOldDataTypes) => {
  //const oldDatatable = this.loadDataTypesApi();
  const oldDatatable = [...payloadWithOldDataTypes];
  const newDatatable = [...payload];

  console.log("oldDatatable", oldDatatable);

  let newSET = oldDatatable
    .filter(oldRow => !!oldRow)
    .map(oldRow => {
      let newRow = newDatatable.filter(newRow => newRow.id == oldRow.id)[0];

      if (newRow) return newRow;

      return oldRow;
    });

  console.log("saveDataTypesApi -- newDatatable: ", newSET);

  newSET.forEach(item => {
    console.log(item.id, { ...item });

    firebaseRef
      .ref("dataTypesCollection")
      .child(item.id)
      .set({ ...item })
  })

  return newSET;
}

export const removeDataTypeApi = payload => {
  let { id } = payload;

  return firebaseRef
    .ref(`dataTypesCollection/${id}`)
    .remove();
}
import { createSlice, nanoid } from "@reduxjs/toolkit";

export function createEntitySlice(entityKey) {
  return createSlice({
    name: entityKey,
    initialState: { records: [] },
    reducers: {
      addRecord: {
        reducer(state, action) {
          state.records.push(action.payload);
        },
        prepare(fields) {
          const now = new Date().toISOString();
          return {
            payload: { id: nanoid(), ...fields, isDeleted: false, deletedAt: null, createdAt: now, updatedAt: now },
          };
        },
      },
      updateRecord(state, action) {
        const { id, fields } = action.payload;
        const record = state.records.find((r) => r.id === id);
        if (record) {
          Object.assign(record, fields);
          record.updatedAt = new Date().toISOString();
        }
      },
      softDeleteRecord(state, action) {
        const record = state.records.find((r) => r.id === action.payload);
        if (record) {
          record.isDeleted = true;
          record.deletedAt = new Date().toISOString();
        }
      },
      restoreRecord(state, action) {
        const record = state.records.find((r) => r.id === action.payload);
        if (record) {
          record.isDeleted = false;
          record.deletedAt = null;
        }
      },
      hardDeleteRecord(state, action) {
        state.records = state.records.filter((r) => r.id !== action.payload);
      },
    },
  });
}

import { configureStore, combineReducers, nanoid } from "@reduxjs/toolkit";
import { ENTITIES } from "../config/entityConfig";
import { createEntitySlice } from "../features/entitySlice";
import { coordinatorSlice } from "../features/coordinatorSlice";
import { loadState, saveState } from "../utils/localStorage";
import { SEED_DATA } from "../config/seedData";

export const entitySlices = Object.fromEntries(
  Object.keys(ENTITIES).map((key) => [key, createEntitySlice(key)])
);

export const entityActions = Object.fromEntries(
  Object.entries(entitySlices).map(([key, slice]) => [key, slice.actions])
);

// coordinators lives outside ENTITIES (nested operators array, custom UI)
export const coordinatorActions = coordinatorSlice.actions;

const rootReducer = combineReducers({
  ...Object.fromEntries(Object.entries(entitySlices).map(([key, slice]) => [key, slice.reducer])),
  coordinators: coordinatorSlice.reducer,
});

function buildSeedState() {
  const now = new Date().toISOString();
  const state = {};
  Object.keys(ENTITIES).forEach((entityKey) => {
    const rows = SEED_DATA[entityKey] || [];
    state[entityKey] = {
      records: rows.map((fields) => ({
        id: nanoid(),
        ...fields,
        isDeleted: false,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      })),
    };
  });
  state.coordinators = { records: [] }; // no seed data for coordinators
  return state;
}

function isEffectivelyEmpty(state) {
  if (!state) return true;
  return Object.keys(ENTITIES).every(
    (key) => !state[key]?.records || state[key].records.length === 0
  );
}

const savedState = loadState();
const preloadedState = isEffectivelyEmpty(savedState) ? buildSeedState() : savedState;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
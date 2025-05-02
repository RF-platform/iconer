import { types } from 'mobx-state-tree';

// Define your RootStore model
const RootStore = types.model('RootStore', {
  // TODO: add properties here
});

// Instantiate the root store
export const rootStore = RootStore.create({
  // TODO: initial values here
});

// Export RootStore type
export type RootStoreType = typeof rootStore;

export default rootStore; 
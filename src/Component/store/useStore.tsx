import {create} from 'zustand';

// Define the store
const useStore = create((set) => ({
  // Define initial state
  count: 0,
  
  // Define actions (functions that can update the state)
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;

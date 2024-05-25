import { create } from 'zustand'
import { devtools } from 'zustand/middleware';


const useDataStore = create(devtools((set) => ({

    node: 0,
    edge: 0,
    nodeData: [],
    setNodeStore: (data) => set((state) => ({ node: data })),
    setEdgeStore: (data) => set((state) => ({ edge: data })),
    setNodeData: (data) => set((state) => ({ nodeData: data }))
})))

export default useDataStore;
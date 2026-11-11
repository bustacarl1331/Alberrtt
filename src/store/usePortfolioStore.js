import { create } from 'zustand'

export const usePortfolioStore = create((set) => ({
  // State
  activeSection: null,
  isEntered: false,
  isLoading: true,
  loadingProgress: 0,
  hoveredObject: null,
  isMobile: false,
  reducedMotion: false,
  soundEnabled: false,
  cameraTransitioning: false,

  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  setEntered: (val) => set({ isEntered: val }),
  setLoading: (val) => set({ isLoading: val }),
  setLoadingProgress: (val) => set({ loadingProgress: val }),
  setHoveredObject: (id) => set({ hoveredObject: id }),
  setMobile: (val) => set({ isMobile: val }),
  setReducedMotion: (val) => set({ reducedMotion: val }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setCameraTransitioning: (val) => set({ cameraTransitioning: val }),
  goBack: () => set({ activeSection: null }),
}))

export default usePortfolioStore

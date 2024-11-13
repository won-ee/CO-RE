import {create} from 'zustand';
import { OptionType } from '../Types/SelectType';

interface BranchState {
  sourceBranch: OptionType | null;
  targetBranch: OptionType | null;
  setSourceBranch: (branch: OptionType | null) => void;
  setTargetBranch: (branch: OptionType | null) => void;
}

export const useBranchStore = create<BranchState>((set) => ({
  sourceBranch: null,
  targetBranch: null,
  setSourceBranch: (branch) => set({ sourceBranch: branch }),
  setTargetBranch: (branch) => set({ targetBranch: branch }),
}));

import { create } from 'zustand';

type AuthFlowState = {
  username: string;
  setUsername: (v: string) => void;
  usernameExists: boolean | null;
  setUsernameExists: (v: boolean | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  phraseType: 12 | 24 | null;
  setPhraseType: (v: 12 | 24 | null) => void;
  phrase: string;
  setPhrase: (v: string) => void;
  passcode: string;
  setPasscode: (v: string) => void;
  step: 'username' | 'phrase' | 'showPhrase' | 'passcode' | 'done';
  setStep: (v: AuthFlowState['step']) => void;
  error: string;
  setError: (v: string) => void;
};

export const useAuthFlow = create<AuthFlowState>(set => ({
  username: '',
  setUsername: username => set({ username }),
  usernameExists: null,
  setUsernameExists: usernameExists => set({ usernameExists }),
  loading: false,
  setLoading: loading => set({ loading }),
  phraseType: null,
  setPhraseType: phraseType => set({ phraseType }),
  phrase: '',
  setPhrase: phrase => set({ phrase }),
  passcode: '',
  setPasscode: passcode => set({ passcode }),
  step: 'username',
  setStep: step => set({ step }),
  error: '',
  setError: error => set({ error }),
}));

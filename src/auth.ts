interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  async signout() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = null; // Setting to null instead of "" for consistency
  },
};

import { ThemeProvider } from "@/components/theme-provider";

import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

function App({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default App;

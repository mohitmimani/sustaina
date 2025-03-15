// In /app/providers.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ProgressProvider
        height="4px"
        color="#4CAF50" // Eco-friendly green color
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default Providers;

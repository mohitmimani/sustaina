// In /app/providers.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@bprogress/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ProgressProvider
        height="4px"
        color="#4CAF50" // Eco-friendly green color
        options={{ showSpinner: false }}
        shallowRouting
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default Providers;

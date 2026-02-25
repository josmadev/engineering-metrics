import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./App.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { TeamProvider } from "./providers/TeamProvider/TeamProvider";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 15 * 60 * 1000,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TeamProvider>
          <RouterProvider router={router} />
        </TeamProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

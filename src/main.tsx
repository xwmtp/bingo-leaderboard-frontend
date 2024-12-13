import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App.tsx";
import {GlobalStyle} from "./style/GlobalStyle.tsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

TimeAgo.addDefaultLocale(en);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </StrictMode>,
);

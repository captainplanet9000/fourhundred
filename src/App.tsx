import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Token from "./pages/Token";
import Traits from "./pages/Traits";
import Mint from "./pages/Mint";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Breeds from "./pages/Breeds";
import Report from "./pages/Report";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import DefaultMeta from "./components/seo/DefaultMeta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DefaultMeta />
        <div className="min-h-dvh flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/token/:id" element={<Token />} />
              <Route path="/traits" element={<Traits />} />
              <Route path="/breeds" element={<Breeds />} />
              <Route path="/report" element={<Report />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
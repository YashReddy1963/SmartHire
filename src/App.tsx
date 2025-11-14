import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JDBuilder from "./pages/JDBuilder";
import ResumeParser from "./pages/ResumeParser";
import CandidateMatching from "./pages/CandidateMatching";
import CommunicationTimeline from "./pages/CommunicationTimeline";
import InterviewFeedback from "./pages/InterviewFeedback";
import HiringManagerDashboard from "./pages/HiringManagerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
          <Route path="/jd-builder" element={<JDBuilder />} />
          <Route path="/resume-parser" element={<ResumeParser />} />
          <Route path="/candidates" element={<CandidateMatching />} />
          <Route path="/communication/:candidateId" element={<CommunicationTimeline />} />
          <Route path="/feedback/:candidateId" element={<InterviewFeedback />} />
          <Route path="/hiring-manager" element={<HiringManagerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

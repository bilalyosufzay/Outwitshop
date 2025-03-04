
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Define your routes here */}
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;

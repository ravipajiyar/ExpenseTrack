import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import './index.css'
import { FinancialRecordProvider } from "./contexts/FinancialRecordContext";

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl px-6 py-4 mb-8 flex justify-between items-center shadow-lg sticky top-4 z-50 transition-all duration-300">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-100 relative px-3 py-2 transition-colors duration-300 hover:text-blue-400 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
          >
            Dashboard
          </Link>
          <div className="flex gap-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
  <div className="flex gap-2">
    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
      <SignUpButton mode="modal" />
    </div>
    <div className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
      <SignInButton mode="modal" />
    </div>
  </div>
</SignedOut>

          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordProvider>
                <Dashboard />
              </FinancialRecordProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
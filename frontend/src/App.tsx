import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { AuthModal } from "./components/AuthModal";
import { Dashboard } from "./components/Dashboard";

function MainApp() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      {!token ? <AuthModal /> : <Dashboard />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

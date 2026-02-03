import { Outlet } from "react-router-dom";
import ScrollToTop from "../Fragments/ScrollToTop";
import Background from "../Fragments/Background";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScrollToTop />

      {/* Background layer */}
      <Background />

      {/* App content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

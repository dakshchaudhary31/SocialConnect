import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider } from "components/ui/AuthenticationGuard";
import { NotificationProvider } from "components/ui/NotificationToast";
import GlobalHeader from "components/ui/GlobalHeader";
import PrimaryNavigation from "components/ui/PrimaryNavigation";

// Page imports
import AuthenticationLoginRegister from "pages/authentication-login-register";
import HomeFeed from "pages/home-feed";
import UserProfile from "pages/user-profile";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      <main className="md:ml-64 pt-16 lg:pt-18 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <NotificationProvider>
            <ScrollToTop />
            <RouterRoutes>
              <Route path="/" element={
                <AppLayout>
                  <HomeFeed />
                </AppLayout>
              } />
              <Route path="/authentication-login-register" element={
                <AppLayout>
                  <AuthenticationLoginRegister />
                </AppLayout>
              } />
              <Route path="/home-feed" element={
                <AppLayout>
                  <HomeFeed />
                </AppLayout>
              } />
              <Route path="/user-profile" element={
                <AppLayout>
                  <UserProfile />
                </AppLayout>
              } />
            </RouterRoutes>
          </NotificationProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
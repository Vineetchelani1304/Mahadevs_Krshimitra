
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 pt-32 md:pt-6">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
        
        {/* Right side - Image/Illustration */}
        <div className="flex-1 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-agri-green/10">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center max-w-md animate-fadeIn">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Welcome Back to AgriVision
                </h2>
                <p className="text-muted-foreground">
                  Log in to access personalized crop recommendations, weather insights, and market analysis for your farm.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-48 w-48 relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-float [animation-delay:200ms]"></div>
                    <div className="absolute inset-4 rounded-full bg-primary/30 animate-float"></div>
                    <div className="absolute inset-8 rounded-full bg-primary/40 animate-float [animation-delay:400ms]"></div>
                    <div className="absolute inset-12 rounded-full bg-primary/50 animate-float [animation-delay:300ms]"></div>
                    <div className="absolute inset-16 rounded-full bg-primary/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

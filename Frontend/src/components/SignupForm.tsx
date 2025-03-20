
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const soilTypes = [
  { value: "clay", label: "Clay" },
  { value: "sandy", label: "Sandy" },
  { value: "silty", label: "Silty" },
  { value: "peaty", label: "Peaty" },
  { value: "chalky", label: "Chalky" },
  { value: "loamy", label: "Loamy" },
];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    

    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, we'll just register the user
      // In a real app, this would send the data to an API
      setIsLoading(false);
      localStorage.setItem('token', 'true');
      
      toast({
        title: "Account created",
        description: "Welcome to AgriVision! Your account has been created successfully.",
      });
      
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
        <p className="text-muted-foreground mt-2">
          {step === 1 ? "Enter your details to get started" : "Tell us about your farm"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={18} />
              </div>
              <Input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail size={18} />
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={18} />
              </div>
              <Input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <MapPin size={18} />
              </div>
              <Input
                type="text"
                name="location"
                placeholder="Farm location"
                value={formData.location}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Soil Type (Optional)</label>
              <Select value={formData.soilType} onValueChange={(value) => handleSelectChange('soilType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : step === 1 ? "Continue" : "Create account"}
        </Button>
        
        {step === 2 && (
          <Button 
            type="button" 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
        )}
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;

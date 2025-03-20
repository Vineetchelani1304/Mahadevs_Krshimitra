
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, Droplet, CloudRain, Sun, Wind, AlertTriangle, FileDown, ArrowUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const soilTypes = [
  { value: "clay", label: "Clay" },
  { value: "sandy", label: "Sandy" },
  { value: "silty", label: "Silty" },
  { value: "peaty", label: "Peaty" },
  { value: "chalky", label: "Chalky" },
  { value: "loamy", label: "Loamy" },
];

const cropSeasons = [
  { value: "kharif", label: "Kharif (Monsoon)" },
  { value: "rabi", label: "Rabi (Winter)" },
  { value: "zaid", label: "Zaid (Summer)" },
  { value: "annual", label: "Annual (Year-round)" },
];

const CropRecommendation: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("primary");
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    soilMoisture: '',
    phLevel: '',
    season: '',
    previousCrop: '',
    irrigationAccess: true,
  });
  
  // Mock recommendations data - this would come from an AI model in a real app
  const recommendations = {
    primary: [
      {
        name: "Wheat",
        confidence: 92,
        waterRequirement: "Medium",
        growingPeriod: "110-130 days",
        marketPrice: "₹2,200/quintal",
        profitPotential: "High",
        risks: ["Susceptible to rust disease", "Requires moderate irrigation"],
      },
      {
        name: "Barley",
        confidence: 87,
        waterRequirement: "Low-Medium",
        growingPeriod: "90-120 days",
        marketPrice: "₹1,800/quintal",
        profitPotential: "Medium",
        risks: ["Price fluctuations", "Lower demand than wheat"],
      },
      {
        name: "Chickpea",
        confidence: 84,
        waterRequirement: "Low",
        growingPeriod: "100-110 days",
        marketPrice: "₹5,100/quintal",
        profitPotential: "High",
        risks: ["Susceptible to pod borer", "Diseases in high humidity"],
      },
    ],
    alternative: [
      {
        name: "Mustard",
        confidence: 81,
        waterRequirement: "Low",
        growingPeriod: "110-140 days",
        marketPrice: "₹5,050/quintal",
        profitPotential: "Medium-High",
        risks: ["Aphid infestation risk", "Temperature sensitivity"],
      },
      {
        name: "Lentil",
        confidence: 78,
        waterRequirement: "Low",
        growingPeriod: "90-120 days",
        marketPrice: "₹5,500/quintal",
        profitPotential: "Medium",
        risks: ["Weed management required", "Disease risk in wet conditions"],
      },
    ],
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to AI model
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your farm data and generated crop recommendations",
      });
    }, 2000);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your crop recommendation report has been downloaded",
    });
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 dark:text-green-400";
    if (confidence >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (confidence >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crop Recommendation</h1>
        <p className="text-muted-foreground">Get AI-powered crop suggestions based on your farm data</p>
      </div>
      
      {!showResults ? (
        <Card className="shadow-md transition-shadow duration-300 animate-fadeIn">
          <CardHeader>
            <CardTitle>Enter Your Farm Details</CardTitle>
            <CardDescription>
              Provide information about your farm to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="e.g., District, State"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Soil Type</label>
                  <Select value={formData.soilType} onValueChange={(value) => handleSelectChange('soilType', value)} required>
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Soil Moisture (approx. %)</label>
                  <Input
                    type="number"
                    name="soilMoisture"
                    placeholder="e.g., 60"
                    min="0"
                    max="100"
                    value={formData.soilMoisture}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">pH Level (if known)</label>
                  <Input
                    type="number"
                    name="phLevel"
                    placeholder="e.g., 6.5"
                    min="0"
                    max="14"
                    step="0.1"
                    value={formData.phLevel}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Season</label>
                  <Select value={formData.season} onValueChange={(value) => handleSelectChange('season', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select growing season" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropSeasons.map((season) => (
                        <SelectItem key={season.value} value={season.value}>
                          {season.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Previous Crop (if any)</label>
                  <Input
                    type="text"
                    name="previousCrop"
                    placeholder="e.g., Rice"
                    value={formData.previousCrop}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="irrigationAccess"
                  name="irrigationAccess"
                  checked={formData.irrigationAccess}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="irrigationAccess" className="text-sm">
                  I have access to irrigation
                </label>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Analyzing your farm data..." : "Get Recommendations"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="primary" className="flex items-center">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Primary Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="alternative" className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Alternative Options
                  </TabsTrigger>
                </TabsList>
                
                <Button variant="outline" onClick={handleDownloadReport} className="flex items-center">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
              
              <TabsContent value="primary" className="mt-0">
                <div className="space-y-6">
                  {recommendations.primary.map((crop, index) => (
                    <Card key={index} className="card-hover overflow-hidden">
                      <CardHeader className="pb-2 relative">
                        <div className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                          <span className="text-sm font-medium">
                            {crop.confidence}% Match
                          </span>
                        </div>
                        <CardTitle className="text-2xl">{crop.name}</CardTitle>
                        <CardDescription>
                          Best suited for {formData.soilType || "your"} soil and {formData.season || "current"} season
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Droplet className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Water Need</p>
                              <p className="font-medium">{crop.waterRequirement}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Growing Period</p>
                              <p className="font-medium">{crop.growingPeriod}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CloudRain className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Market Price</p>
                              <p className="font-medium">{crop.marketPrice}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="h-5 w-5 text-purple-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Profit Potential</p>
                              <p className="font-medium">{crop.profitPotential}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="font-medium flex items-center mb-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Risk Factors
                          </p>
                          <ul className="space-y-1 ml-6 text-sm text-muted-foreground list-disc">
                            {crop.risks.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View detailed analysis</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="alternative" className="mt-0">
                <div className="space-y-6">
                  {recommendations.alternative.map((crop, index) => (
                    <Card key={index} className="card-hover overflow-hidden">
                      <CardHeader className="pb-2 relative">
                        <div className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                          <span className="text-sm font-medium">
                            {crop.confidence}% Match
                          </span>
                        </div>
                        <CardTitle className="text-2xl">{crop.name}</CardTitle>
                        <CardDescription>
                          Alternative option for weather uncertainty or market diversification
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Droplet className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Water Need</p>
                              <p className="font-medium">{crop.waterRequirement}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Growing Period</p>
                              <p className="font-medium">{crop.growingPeriod}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CloudRain className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Market Price</p>
                              <p className="font-medium">{crop.marketPrice}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="h-5 w-5 text-purple-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Profit Potential</p>
                              <p className="font-medium">{crop.profitPotential}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="font-medium flex items-center mb-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Risk Factors
                          </p>
                          <ul className="space-y-1 ml-6 text-sm text-muted-foreground list-disc">
                            {crop.risks.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View detailed analysis</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
            Start a new recommendation
          </Button>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;

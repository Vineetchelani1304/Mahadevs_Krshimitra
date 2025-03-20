
import React from 'react';
import NavigationLayout from './NavigationLayout';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, description, children }) => {
  const location = useLocation();
  const isProtectedPage = ['/dashboard', '/crop-recommendation', '/weather-analysis', '/market-insights', '/profile', '/iot'].some(
    route => location.pathname.startsWith(route)
  );
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <NavigationLayout>
      <motion.div 
        className={`min-h-screen pt-20 px-4 md:px-6 ${isProtectedPage ? 'pb-20' : 'pb-10'}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto py-8">
          <motion.div className="mb-8" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-xl text-muted-foreground">{description}</p>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </div>
      </motion.div>
    </NavigationLayout>
  );
};

export default PageLayout;

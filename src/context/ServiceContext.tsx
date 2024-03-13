import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceContextType {
  serviceId: string;
  setServiceId: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [serviceId, setServiceId] = useState('');

  return (
    <ServiceContext.Provider value={{ serviceId, setServiceId }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

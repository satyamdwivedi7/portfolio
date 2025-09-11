'use client';

import React, { createContext, useState, useEffect } from 'react';
import { preloadData } from '@/lib/api';

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState({
    projects: [],
    skills: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const preloadedData = await preloadData();
        setData(preloadedData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const contextValue = {
    projects: data.projects,
    skills: data.skills,
    isLoading
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

import * as React from 'react';
import { FC, useContext } from 'react';
import { ResourceMapper } from './ResourceMapper';
import { MockReferenceResolver } from './MockReferenceResolver';

const MapperContext = React.createContext<ResourceMapper>(
  new MockReferenceResolver()
);

export const MapperProvider: FC = ({ children }) => {
  return (
    <MapperContext.Provider value={new MockReferenceResolver()}>
      {children}
    </MapperContext.Provider>
  );
};

export function useMapper() {
  const context = useContext(MapperContext);
  if (context === undefined) {
    throw new Error('useMapper must be used within a MapperProvider');
  }
  return context;
}

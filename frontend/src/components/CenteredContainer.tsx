import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    {children}
  </Box>
);

export default CenteredContainer; 
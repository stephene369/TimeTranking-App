import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ContentAreaProps {
  title: string;
  children?: React.ReactNode;
}

/**
 * Content area component that displays the selected menu title and content
 */
const ContentArea: React.FC<ContentAreaProps> = ({ title, children }) => {
  return (
    <>
    {children}
    </>
  );
};

export default ContentArea;

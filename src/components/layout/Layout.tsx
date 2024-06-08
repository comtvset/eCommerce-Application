import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

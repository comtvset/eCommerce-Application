import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  title: string;
  className: string;
}

export const Link: React.FC<LinkProps> = ({ to, title, className }) => {
  return (
    <NavLink to={to} className={className}>
      {title}
    </NavLink>
  );
};

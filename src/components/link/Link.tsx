import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  title: string;
  className: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, title, className, onClick }) => {
  return (
    <NavLink to={to} className={className} onClick={onClick}>
      {title}
    </NavLink>
  );
};

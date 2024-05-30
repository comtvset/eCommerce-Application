import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  title?: string;
  className: string;
  children?: React.ReactNode;
  id?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, title, className, id, children, onClick }) => {
  return (
    <NavLink to={to} className={className} onClick={onClick} id={id}>
      {title}
      {children}
    </NavLink>
  );
};

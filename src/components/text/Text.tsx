import React from 'react';

type Tags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface ParagraphProps {
  tag: Tags;
  title: string;
  className: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ tag, title, className }) => {
  return React.createElement(
    tag,
    {
      className,
    },
    title,
  );
};

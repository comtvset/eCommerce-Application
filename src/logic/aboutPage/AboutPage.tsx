import React from 'react';
import { AboutUS } from 'src/components/form/aboutUS/AboutUSForm.tsx';

const AboutPage: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AboutUS />
    </React.Suspense>
  );
};

export default AboutPage;

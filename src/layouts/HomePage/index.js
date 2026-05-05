import { lazy } from 'react';

// Essential section that should load immediately
import HeroSection from './HeroSection';

// Lazy-loaded section components
const AgendaSection = lazy(() => import('./AgendaSection'));
const InfoGrafikSection = lazy(() => import('./InfoGrafikSection'));
const LiputanSection = lazy(() => import('./LiputanSection'));
const Kajian = lazy(() => import('./Kajian'));
const VidioKajian = lazy(() => import('./VidioKajian'));
const Sorotan = lazy(() => import('./Sorotan'));

export {
  // Eagerly loaded component
  HeroSection,
  
  // Lazy-loaded components
  AgendaSection,
  InfoGrafikSection,
  LiputanSection,
  Kajian,
  VidioKajian,
  Sorotan
};
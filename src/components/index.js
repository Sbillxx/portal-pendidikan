import { lazy } from 'react';

// Essential components that should load immediately
import TanggalWaktu from './TanggalWaktu';
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';
import ImageComponent from './ImageComponent';
import InputSearch from './InputSearch';

// Lazy-loaded components
const Navbar = lazy(() => import('./Navbar'));
const Card = lazy(() => import('./Card'));
const HeaderSection = lazy(() => import('./HeaderSection'));
const Footer = lazy(() => import('./Footer'));
const Ads1110 = lazy(() => import('./Ads1110'));
const Ads850 = lazy(() => import('./Ads850'));
const SocialMediaSection = lazy(() => import('./SocialMediaSection'));
const KajianSection = lazy(() => import('./KajianSection'));
const PopularNews = lazy(() => import('./PopularNews'));
const CardArtikel = lazy(() => import('./CardArtikel'));
const CardVideo = lazy(() => import('./CardVideo'));
const CardSorotan = lazy(() => import('./CardSorotan'));
const CardLiputan = lazy(() => import('./CardLiputan'));
const SocialKajian = lazy(() => import('./SocialKajian'));
const Pagination = lazy(() => import('./Pagination'));
const ContentCardMultiple = lazy(() => import('./ContentCardMultiple'));
const CardLiveStreaming = lazy(() => import('./CardLiveStreaming'));
const LanguageSwitcher = lazy(() => import('./LanguageSwitcher'));
const CardVideokajian = lazy(() => import('./CardVideokajian'));
const EmbedComponent = lazy(() => import('./EmbedComponent'));
const ShareButton = lazy(() => import('./ShareButton'));
const ModalFeedback = lazy(() => import('./ModalFeedback'));
const CardRadioStreaming = lazy(() => import('./CardRadioStreaming'));
const Pulse = lazy(() => import('./Pulse'));

export {
  // Eagerly loaded components
  TanggalWaktu,
  SecondaryButton,
  PrimaryButton,
  ImageComponent,
  InputSearch,
  
  // Lazy-loaded components
  Navbar,
  Card,
  HeaderSection,
  Footer,
  Ads1110,
  Ads850,
  SocialMediaSection,
  KajianSection,
  PopularNews,
  CardArtikel,
  CardVideo,
  CardSorotan,
  CardLiputan,
  SocialKajian,
  Pagination,
  ContentCardMultiple,
  CardLiveStreaming,
  LanguageSwitcher,
  CardVideokajian,
  EmbedComponent,
  ShareButton,
  ModalFeedback, 
  CardRadioStreaming
};
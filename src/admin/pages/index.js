import React from 'react';

// Lazy imports
export const AddNotifikasi = React.lazy(() => import('./notifikasi/AddNotifikasi'));
export const ListNotifikasi = React.lazy(() => import('./notifikasi/ListNotifikasi'));

export const AddLiputan = React.lazy(() => import('./Liputan/AddLiputan'));
export const EditLiputan = React.lazy(() => import('./Liputan/EditLiputan'));
export const Liputan = React.lazy(() => import('./Liputan/Liputan'));

export const AddVideoKajian = React.lazy(() => import('./VideoKajian/AddVideoKajian'));
export const EditVideoKajian = React.lazy(() => import('./VideoKajian/EditVideoKajian'));
export const VideoKajian = React.lazy(() => import('./VideoKajian/VideoKajian'));

export const AddAgenda = React.lazy(() => import('./Agenda/AddAgenda'));
export const ListAgenda = React.lazy(() => import('./Agenda/ListAgenda'));
export const EditAgenda = React.lazy(() => import('./Agenda/EditAgenda'));
export const DaftarHadirAgenda = React.lazy(() => import('./Agenda/DaftarHadirAgenda'));

export const ListSorotan = React.lazy(() => import('./Sorotan/ListSorotan'));

export const ListArtikel = React.lazy(() => import('./Artikel/ListArtikel'));
export const ListArtikelKajian = React.lazy(() => import('./Artikel/ListArtikelKajian'));
export const AddArtikel = React.lazy(() => import('./Artikel/AddArtikel'));
export const EditArtikel = React.lazy(() => import('./Artikel/EditArtikel'));

export const Profile = React.lazy(() => import('./Profile/Profile'));
export const AddContent = React.lazy(() => import('./Profile/AddContent'));
export const EditContent = React.lazy(() => import('./Profile/EditContent'));

export const ListInfografik = React.lazy(() => import('./infografik/ListInfografik'));
export const AddInfografik = React.lazy(() => import('./infografik/AddInfografik'));
export const EditInfografik = React.lazy(() => import('./infografik/EditInfografik'));

export const EditArtikelKajian = React.lazy(() => import('./Artikel/EditArtikelKajian'));
export const AddArtikelKajian = React.lazy(() => import('./Artikel/AddArtikelKajian'));

export const AddIklan = React.lazy(() => import('./Iklan/AddIklan'));
export const EditIklan = React.lazy(() => import('./Iklan/EditIklan'));
export const ListIklan = React.lazy(() => import('./Iklan/ListIklan'));

export const EditLive = React.lazy(() => import('./Live/EditLive'));
export const LiveList = React.lazy(() => import('./Live/LiveList'));

export const Feedback = React.lazy(() => import('./Feedback'));
export const Headline = React.lazy(() => import('./ListHeadline'));

export const Login = React.lazy(() => import('./Login'));

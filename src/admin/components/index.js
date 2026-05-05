import { lazy } from 'react';

const MultipleFileUpload = lazy(() => import('./MultipleFileUpload'));
const AdminNavbar = lazy(() => import('../components/AdminNavbar'));
const AdminSidebar = lazy(() => import('./AdminSidebar'));
const ConfirmModal = lazy(() => import('./ConfirmModal'));
const DeleteModal = lazy(() => import('./DeleteModal'));
const QuillEditor = lazy(() => import('./QuillEditor'));
const FileUpload = lazy(() => import('./FileUpload'));
const InputBase = lazy(() => import('./InputBase'));
const InputDate = lazy(() => import('./InputDate'));
const HeaderList = lazy(() => import('./HeaderList'));
const ButtonForm = lazy(() => import('./ButtonForm'));

// table
const TableList = lazy(() => import('./Table/TableList'));
const TableProfile = lazy(() => import('./Table/TableProfile'));
const TableArtikel = lazy(() => import('./Table/TableArtikel'));
const TableAgenda = lazy(() => import('./Table/TableAgenda'));
const TableDaftarHadirAgenda = lazy(() => import('./Table/TableDaftarHadirAgenda'));
const TabelInfo = lazy(() => import('./Table/TabelInfo'));
const TableLiputan = lazy(() => import('./Table/TableLiputan'));
const TableArtikelKajian = lazy(() => import('./Table/TableArtikelKajian'));
const TableSorotan = lazy(() => import('./Table/TableSorotan'));
const TableLive = lazy(() => import('./Table/TableLive'));
const TableNotifikasi = lazy(() => import('./Table/TabelNotifikasi'));

const Toaster = lazy(() => import('./Toaster'));

// notif
const Success = lazy(() => import('./Alert/Success'));

export {
  TableDaftarHadirAgenda, 
  TableNotifikasi,
  TableLive,
  MultipleFileUpload,
  Success,
  TableSorotan,
  Toaster,
  TableArtikelKajian,
  TableLiputan,
  TabelInfo,
  TableAgenda,
  TableArtikel,
  TableProfile,
  TableList,
  AdminNavbar,
  HeaderList,
  AdminSidebar,
  QuillEditor,
  FileUpload,
  InputBase,
  InputDate,
  DeleteModal,
  ConfirmModal,
  ButtonForm,
};

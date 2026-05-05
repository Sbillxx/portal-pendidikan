import { lazy } from "react";

// UMUM
export const HomePage = lazy(() => import("./HomePage"));
export const BisnisPage = lazy(() => import("./BisnisPage"));
export const LembagaPage = lazy(() => import("./LembagaPage"));
export const LiveStreaming = lazy(() => import("./LiveStreaming"));
export const PendidikanPage = lazy(() => import("./PendidikanPage"));

// KUMPULAN
export const Kumpulan = lazy(() => import("./Kumpulan"));

// DETAIL
export const DetailPage = lazy(() => import("./Detailpage"));
export const ContentDetail = lazy(() => import("./ContentDetail"));
export const GaleriPage = lazy(() => import("./GaleriPage"));
export const JenjangPage = lazy(() => import("./JenjangPage"));

export const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
import "./App.css";
import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  BisnisPage,
  DetailPage,
  LembagaPage,
  LiveStreaming,
  PendidikanPage,
  ProtectedRoute,
  Kumpulan,
  ContentDetail,
  GaleriPage,
  JenjangPage,
} from "./pages";

import {
  VideoKajian,
  EditVideoKajian,
  AddVideoKajian,
  Liputan,
  EditLiputan,
  AddLiputan,
  AddAgenda,
  ListAgenda,
  EditAgenda,
  ListSorotan,
  ListArtikelKajian,
  AddContent,
  EditContent,
  Profile,
  ListInfografik,
  EditInfografik,
  AddInfografik,
  AddArtikelKajian,
  EditArtikelKajian,
  Login,
  ListIklan,
  AddIklan,
  EditIklan,
  LiveList,
  EditLive,
  Feedback,
  Headline,
  ListNotifikasi,
  AddNotifikasi,
  DaftarHadirAgenda,
} from "./admin/pages";
import { Suspense } from "react";
import { LanguageProvider } from "./Func/LanguageContext";
import useAnalytics from "./lib/useAnalytics";

function App() {
  useAnalytics()

  const Load = () => {
    return (
      <div className="h-screen w-full flex items-center justify-center text-base-semibold">
        Loading...
      </div>
    );
  };

  return (
    <LanguageProvider>
      <Suspense fallback={<Load />}>
        <Routes>
          {/* umum  */}
          <Route path="/" element={<HomePage />} />
          <Route path="/bisnis" element={<BisnisPage />} />
          <Route path="/lembaga" element={<LembagaPage />} />
          <Route path="/pendidikan" element={<PendidikanPage />} />
          <Route path="/livestreaming" element={<LiveStreaming />} />
          <Route path="/kumpulan/:params" element={<Kumpulan />} />
          <Route path="/content/:page/:id/:slug" element={<ContentDetail />} />
          <Route path="/headline/:id/:slug" element={<DetailPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/jenjang/:jenjangId" element={<JenjangPage />} />

          {/* admin route */}
          <Route path="/admincms" element={<ProtectedRoute />}>
            <Route index element={<ListSorotan />} />
            <Route path="iklan" element={<ListIklan />} />
            <Route path="iklan/add" element={<AddIklan />} />
            <Route path="iklan/:id" element={<EditIklan />} />

            <Route path="agenda" element={<ListAgenda />} />
            <Route path="agenda/:id" element={<EditAgenda />} />
            <Route path="agenda/add" element={<AddAgenda />} />
            <Route path="agenda/daftar-hadir/:id" element={<DaftarHadirAgenda />} />

            <Route path="live" element={<LiveList />} />
            <Route path="live/:id" element={<EditLive />} />

            <Route path="videokajian" element={<VideoKajian />} />
            <Route path="videokajian/tambahvideo" element={<AddVideoKajian />} />
            <Route path="videokajian/:id" element={<EditVideoKajian />} />

            <Route path="liputan" element={<Liputan />} />
            <Route path="liputan/:id" element={<EditLiputan />} />
            <Route path="liputan/tambahliputan" element={<AddLiputan />} />

            <Route path="artikel/kajian" element={<ListArtikelKajian />} />
            <Route path="artikel/kajian/add" element={<AddArtikelKajian />} />
            <Route path="artikel/kajian/:id" element={<EditArtikelKajian />} />

            <Route path="notifikasi" element={<ListNotifikasi />} />
            <Route path="notifikasi/add" element={<AddNotifikasi />} />

            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<EditContent />} />
            <Route path="profile/add" element={<AddContent />} />

            <Route path="infografik" element={<ListInfografik />} />
            <Route path="infografik/:id" element={<EditInfografik />} />
            <Route path="infografik/add" element={<AddInfografik />} />

            <Route path="kotaksaran" element={<Feedback />} />
            <Route path="headline" element={<Headline />} />
          </Route>
          <Route path="/adminlogin" element={<Login />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;

import { useState } from "react";
import { AdminNavbar, AdminSidebar } from "../components";

const MainLayout = ({ children }) => {
  const [show, setShow] = useState(false)

  const toggle = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <AdminNavbar setShow={toggle}/>
        <div className="main-container w-full flex dark:bg-slate-900">
          <aside className={`lg:w-fit border-r border-neutral-200 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 z-30 fixed lg:relative transition-all duration-300 ${show ?'translate-x-0' : '-translate-x-full lg:translate-x-0  '}`}>
            <AdminSidebar />
          </aside>
          <main id="main" className="content-container w-full p-4 py-24 overflow-y-scroll h-screen">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

import { Dropdown, Navbar } from "flowbite-react";
import { idrisyyahLogo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";

const AdminNavbar = ({ setShow }) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const removeData = localStorage.getItem("user");
    if (removeData == null) {
      navigate("/adminlogin");
    }
  };

  const AvatarProfile = ({ username, email }) => {
    return (
      <div className="flex items-center gap-2 ">
        <div className="avatar  lg:h-10 lg:w-10 h-6 w-6 rounded-full bg-idi-800 flex items-center justify-center">
          <h2 className="text-white text-small-semibold lg:text-lg-semibold uppercase">
            {username && username[0]}
          </h2>
        </div>
        <div className="lg:flex hidden flex-col items-start">
          <span className="block text-small-semibold">{username}</span>
          <span className="block truncate text-xs-regular">{email}</span>
        </div>
      </div>
    );
  };

  return (
    <Navbar
      fluid
      rounded
      className="border-b border-neutral-300 w-full fixed left-0 right-0 top-0 z-50"
    >
      <Navbar.Brand>
        <Link to={"/"} className="logo flex items-center gap-3">
          <img src={idrisyyahLogo} alt="logo-idrisiyyah" className="h-8 w-8" />
          <div className="flex flex-col">
            <h2 className="text-small-bold text-idi-800">TAREKAT IDRISIYYAH</h2>
            <span className="text-xs-regular dark:text-slate-300">
              Content Management System
            </span>
          </div>
        </Link>
      </Navbar.Brand>

      <div className="flex lg:order-2 gap-5">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <AvatarProfile
              email={userData && userData.email}
              username={userData && userData.username}
            />
          }
        >
          <Dropdown.Header className="block lg:hidden">
            <span className="block text-sm">
              {userData && userData.username}
            </span>
            <span className="block truncate text-sm font-medium">
              {userData && userData.email}
            </span>
          </Dropdown.Header>

          <button onClick={handleSignOut} aria-label="sign-out">
            <Dropdown.Item>Sign out</Dropdown.Item>
          </button>
        </Dropdown>

        <HiMenu className="block lg:hidden h-10 w-10" onClick={setShow} />
      </div>
    </Navbar>
  );
};

export default AdminNavbar;

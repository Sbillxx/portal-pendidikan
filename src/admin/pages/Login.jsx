import React, { useEffect, useState } from "react";
import { InputBase } from "../components";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { idrisyyahLogo } from "../../assets";
import axios from "axios";

const Login = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // data user
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });

  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/loginadmin`, dataUser);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/admincms");
    } catch (error) {
      setError("Username atau password salah!");
    }
  };

  // middleware route
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/admincms");
    }
  }, []);

  const Idrisiyyah = () => (
    <Link
      to="/"
      className="logo items-center gap-3 py-2 flex mx-auto w-fit mb-5"
    >
      <img src={idrisyyahLogo} alt="Logo" className="h-10 w-10" />
      <div className="flex flex-col">
        <p className="text-small-semibold lg:text-lg-semibold text-[#145927 ]">
          TAREKAT IDRISYYAH
        </p>
        <p className="text-xs-regular">MEDIA PERGERAKAN TASAWUF</p>
      </div>
    </Link>
  );

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
        <div className="form-container w-full bg-white px-8 py-8 drop-shadow-sm rounded-lg border border-gray-200 shadow-gray-400">
          <Idrisiyyah />

          <div className="input-container flex flex-col gap-5 mb-6">
            <InputBase
              handleChange={handleChange}
              name="username"
              label="Username"
              type="text"
            />
            <InputBase
              utBase
              type="password"
              handleChange={handleChange}
              name="password"
              label="Password"
            />
            {error && <p className="text-red-500 mb-1">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-idi-900 hover:bg-idi-700 ring-idi"
          >
            Masuk
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;

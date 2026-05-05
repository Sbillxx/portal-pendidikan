import { useState, useEffect } from "react";
import { FormLayout, MainLayout } from "../../layout";
import { Label, Radio } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import InputBase from "../../components/InputBase";
import ButtonForm from "../../components/ButtonForm";
import axios from "axios";

const EditLive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/live`);
      const filteredData = response.data.isi_konten.find((ele) => ele._id === id || ele.id === id );
      setData(filteredData || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${base_url}/live/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/admincms/live`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <FormLayout action={handleUpdate} notif={isSuccess}>
        <div className="flex flex-col gap-3">
          <p className="text-small-semibold">Status Live</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Radio
                id="sedanglive"
                name="status"
                value="live"
                checked={data.status === "live"}
                onChange={handleChange}
              />
              <Label htmlFor="sedanglive">Sedang Live</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="tidakLive"
                name="status"
                value="tidaklive"
                checked={data.status === "tidaklive"}
                onChange={handleChange}
              />
              <Label htmlFor="tidakLive">Tidak Live</Label>
            </div>
          </div>
        </div>

        <InputBase
          label={"Link Live"}
          handleChange={handleChange}
          name={"url"}
          value={data.url || ""}
        />

        <ButtonForm backRoute={`/admincms/live`}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditLive;
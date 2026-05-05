import { MainLayout } from "../../layout";
import { HeaderList, TableProfile } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";


const Profile = () => {
  const {data, getData} = useGetDataFromApi('profile')
  
  return (
    <MainLayout>
      <HeaderList path={"/admincms/profile/add"} title={"Konten Profile"} />
      <TableProfile data={data} page={'profile'} refresher={getData}/>
    </MainLayout>
  );
};

export default Profile;

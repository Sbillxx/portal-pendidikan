import { Alert } from "flowbite-react";

const Success = ({itemName, func}) => {
  return (
    <Alert color="success" onDismiss={() => func}>
      <span className="font-medium">Berhasil!</span> {itemName} telah berhasil di tambahkan
    </Alert>
  );
};

export default Success;

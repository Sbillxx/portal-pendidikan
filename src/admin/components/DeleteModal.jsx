import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDeleteFromApi } from "../../Func/GlobalFunction";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  namaItem,
  deleteFunction,
  refresher,
}) => {

  
  const { handleDelete } = useDeleteFromApi(
    deleteFunction,
    refresher,
    isOpen,
    setIsOpen
  );

  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg-regular text-gray-500 dark:text-gray-400">
              <span className="text-lg-bold">"{namaItem}"</span> akan dihapus
            </h3>
            <div className="flex justify-center gap-4">
              <Button aria-label="delete-button" color="failure" onClick={handleDelete}>
                {"Ya, Hapus"}
              </Button>
              <Button aria-label="cancel-button" color="gray" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;

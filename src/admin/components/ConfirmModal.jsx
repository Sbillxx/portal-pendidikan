import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const ConfirmModal = ({ isOpen, setIsOpen, backRoute }) => {
  
  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <div className="">
              <h3 className="mb-2 text-lg font-normal text-gray-700 dark:text-gray-400 w-full">
                Data akan hilang jika Anda berpindah halaman
              </h3>
              <h4 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Yakin untuk meninggalkan halaman?
              </h4>
            </div>
            <div className="flex justify-center gap-4 pt-5">
              <Link to={backRoute}>
                <Button aria-label="confirm" color="gray" onClick={() => setIsOpen(false)}>
                  Ya, tinggalkan halaman
                </Button>
              </Link>
              <Button aria-label="continue-writing" onClick={() => setIsOpen(false)}>
                Lanjutkan menulis
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmModal;

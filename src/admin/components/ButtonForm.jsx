import { Button } from "flowbite-react";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const ButtonForm = ({ backRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="button flex w-full gap-2">
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        backRoute={backRoute}
      />

      <Button aria-label="back-button" color="gray" className="w-full" onClick={() => setIsOpen(true)}>
        Kembali
      </Button>

      <Button aria-label="submit-button" type="submit" className="w-full">
        Submit
      </Button>
    </div>
  );
};

export default ButtonForm;

'use client'
import { Button, Modal } from "@heroui/react";
const RegisterNewCompanyModal = () => {
  return (
    <div>
          <Modal>
      <Button variant="">Add Company</Button>
      <Modal.Backdrop variant={"blur"}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-4xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
         
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
           
            </Modal.Body>
            <Modal.Footer>
              <Button
                slot="close"
           
                className="mt-4 cursor-pointer w-full bg-primary  text-white font-medium  px-6 h-10 rounded-lg shadow-md transition flex items-center justify-center gap-2 disabled:bg-purple-300"
              >
                Create Comapny 
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    </div>
  );
};

export default RegisterNewCompanyModal;
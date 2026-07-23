'use client'

import { useState } from "react";
import {Button, Drawer} from "@heroui/react";
const DasboardMobileMenu = () => {
      const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
              <div className="flex flex-col gap-3">
        {/* here will the drawer hamberger menu will appear from react icons */}
     

   <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
              Open Drawer
            </Button>

{/* the main heroUI drawer */}

   <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Controlled with useState()</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  This drawer is controlled by React's <code>useState</code> hook. Pass{" "}
                  <code>isOpen</code> and <code>onOpenChange</code> props to manage the drawer state
                  externally.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
    </div>
    </div>
  );
};

export default DasboardMobileMenu;
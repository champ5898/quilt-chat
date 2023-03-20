import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function ImageViewer({ setOpen, open, image }) {
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Basic Modal</Button>}
    >
      <Modal.Content>
        <img src={image} className="w-11/12 rounded-xl h-full object-cover " />
      </Modal.Content>

      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ImageViewer;

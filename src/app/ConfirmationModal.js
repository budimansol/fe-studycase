"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, note }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>
        <Text>
          Are you sure you want to delete the note titled `{note?.title}`?
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="red"
          mr={3}
          onClick={() => {
            onConfirm(note.id);
            onClose();
          }}
        >
          Delete
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

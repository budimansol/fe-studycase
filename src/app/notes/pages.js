"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Text,
  CardBody,
  CardFooter,
  Heading,
  CardHeader,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { ConfirmationModal } from "../ConfirmationModal";
import NoteModal from "../NoteModal";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://studycase-production.up.railway.app/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleOpenModal = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  const handleSave = () => {
    axios
      .get("https://studycase-production.up.railway.app/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenConfirmModal = (note) => {
    setNoteToDelete(note);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmOpen(false);
    setNoteToDelete(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://studycase-production.up.railway.app/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
        toast({
          title: "Note deleted.",
          description: "The note was successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        toast({
          title: "Error.",
          description: "There was an error deleting the note.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="flex flex-col mx-5 my-10">
      <div className="text-center w-full mb-10">
        <Button
          colorScheme="pink"
          variant="solid"
          onClick={() => handleOpenModal(null)}
        >
          Add Notes
        </Button>
      </div>
      <div className="w-full">
        {notes.length === 0 ? (
          <Alert status="warning" mb="4">
            <AlertIcon />
            <AlertTitle mr={2}>No Notes Found</AlertTitle>
            <AlertDescription>
              Please add a note to get started.
            </AlertDescription>
          </Alert>
        ) : (
          <SimpleGrid
            spacing={54}
            templateColumns="repeat(auto-fill, minmax(25rem, 1fr))"
          >
            {notes.map((note) => (
              <Card
                key={note.id}
                boxShadow="0 0 0 2px black"
                className="w-96 h-auto"
              >
                <CardHeader>
                  <Heading size="md">{note.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{note.body}</Text>
                  <Text>
                    Created At: {new Date(note.createdAt).toLocaleDateString()}
                  </Text>
                </CardBody>
                <CardFooter className="mb-16">
                  <Button
                    onClick={() => router.push(`/notes/${note.id}`)} // Use router.push for navigation
                  >
                    View Note
                  </Button>
                  <Button ml="4" onClick={() => handleOpenModal(note)}>
                    Edit
                  </Button>
                  <Button
                    ml="4"
                    colorScheme="red"
                    onClick={() => handleOpenConfirmModal(note)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </div>
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteToEdit={noteToEdit}
        onSave={handleSave}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDelete}
        note={noteToDelete}
      />
    </div>
  );
}

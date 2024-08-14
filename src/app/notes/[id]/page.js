"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation"; // Correct import for App Router

export default function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract id from the path

  const toast = useToast();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://studycase-production.up.railway.app/notes/${id}`)
        .then((response) => {
          setNote(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching note details");
          setLoading(false);
          toast({
            title: "Error.",
            description: "There was an error fetching the note details.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      setLoading(false);
      setError("Note ID not found");
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col mx-5">
      <Card>
        <CardHeader>
          <Heading size="lg">{note?.title || "No Title"}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{note?.body || "No content available"}</Text>
          <Text>
            Created At:{" "}
            {note?.createdAt
              ? new Date(note.createdAt).toLocaleDateString()
              : "Unknown Date"}
          </Text>
        </CardBody>
        <Button onClick={() => router.back()} colorScheme="teal" mt="4">
          Back
        </Button>
      </Card>
    </div>
  );
}

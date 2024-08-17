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
  Skeleton,
  Box
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

export default function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract id from the path

  const toast = useToast();

  useEffect(() => {
    // Set a timeout to simulate delay
    const timer = setTimeout(() => setShowSkeleton(false), 2000);

    if (id) {
      axios
        .get(`https://astonishing-reflection-production.up.railway.app/notes/${id}`)
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

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [id]);

  if (showSkeleton && loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Skeleton width="full" height="full" />
      </Box>
    );
  }
  
  if (error) return <p>{error}</p>;

  return (
    <Box display="flex" alignItems="center" justifyContent="center" className="w-full min-h-screen overflow-hidden" bgGradient='linear(to-r, #522258, #D95F59)'>
      <Card height="250px" width="600px">
        <CardHeader>
          <Heading size="lg">{note?.title || "No Title"}</Heading>
        </CardHeader>
        <CardBody margin="">
          <Text>{note?.body || "No content available"}</Text>
          <Text>
            Created At:{" "}
            {note?.createdAt
              ? new Date(note.createdAt).toLocaleDateString()
              : "Unknown Date"}
          </Text>
        </CardBody>
        <Button onClick={() => router.back()} bg="#D95F59" className="text-white" mt="4">
          Back
        </Button>
      </Card>
    </Box>
  );
}

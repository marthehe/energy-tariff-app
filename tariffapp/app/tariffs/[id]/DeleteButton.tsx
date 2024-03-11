/*This code defines a React component named DeleteButton, designed for deleting a tariff from a database. It utilizes a custom alert dialog component for confirming the deletion action, integrated with axios for making HTTP DELETE requests, 
and React's state management to handle the deletion process and error messaging. Here's a detailed breakdown of its functionalities:

State Management: Uses useState to manage two pieces of state: error for storing any error messages that might occur during the deletion process, and isDeleting to indicate whether the deletion process is currently underway.

Props: Accepts a single prop, tariffId, which is expected to be a number representing the unique identifier of the tariff to be deleted.

Custom Alert Dialog: Implements a custom alert dialog (modal) that confirms with the user before proceeding with the deletion. This dialog includes:

Trigger: A button that opens the dialog, styled with buttonVariants to appear distinctive for a destructive action and disabled based on the isDeleting state.
Content: The main content of the dialog, containing:
A header with a title (AlertDialogTitle) asking for confirmation and a description (AlertDialogDescription) that emphasizes the permanent nature of the action.
A footer (AlertDialogFooter) with two options: to cancel the action (AlertDialogCancel) or confirm the deletion (AlertDialogAction). The confirm button is also styled for a destructive action and executes the deleteTariff function on click.
Deletion Logic: The deleteTariff async function handles the deletion process by:

Setting isDeleting to true to indicate the process has started.
Using axios to send a DELETE request to a specific endpoint (/api/tariffs/{tariffId}), with tariffId dynamically inserted into the URL.
Navigating back to the tariffs listing page (/tariffs) and refreshing the page upon successful deletion.
Catching any errors that occur during the process, disabling the deleting state, and setting an error message.
Error Display: Conditionally renders an error message below the delete button if an error occurs during the deletion process.

Overall, DeleteButton provides a user-friendly and secure way to handle the deletion of tariffs, ensuring that users are fully aware of the action's permanence and can confirm or cancel the deletion as needed.*/

"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const DeleteButton = ({ tariffId }: { tariffId: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTariff = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/tariffs/" + tariffId);
      router.push("/tariffs");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError("Uknown Error Occured.");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({
            variant: "destructive",
          })}
          disabled={isDeleting}
        >
          Delete Tariff
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              tariff.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({
                variant: "destructive",
              })}
              disabled={isDeleting}
              onClick={deleteTariff}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className=" text-destructive">{error}</p>
    </>
  );
};

export default DeleteButton;

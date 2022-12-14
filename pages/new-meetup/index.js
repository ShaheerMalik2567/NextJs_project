import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetUpHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add a new meetup</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
    </React.Fragment>
  );
};

export default NewMeetup;

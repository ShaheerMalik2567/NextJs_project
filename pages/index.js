import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import React from "react";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Shaheer Meetups</title>
      </Head>

      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://shaheermalik2567:vh5t4j3FSfIuAXV6@cluster0.ty0u8pa.mongodb.net/NextJS?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

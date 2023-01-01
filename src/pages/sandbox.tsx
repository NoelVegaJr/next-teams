// import * as React from "react";
// import Image from "next/image";
// import { useContext, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEllipsisH,
//   faReply,
//   faSmile,
// } from "@fortawesome/free-solid-svg-icons";
// import { UserContext } from "../context/auth-context";
// import { trpc } from "../utils/trpc";
// import { pusherClient } from "../utils/pusher";
// import styles from "../styles/chatfeed.module.css";
// import axios from "axios";
// import Pusher from "pusher";
// import client from "pusher-js";

// function closingCode() {
//   // do something...
//   axios.get("http://localhost:3000/api/examples");

//   return null;
// }

// const pusher = new client(
//   "99e512a0e34c2dc7612d", // Replace with 'key' from dashboard
//   {

//     cluster: "us2", // Replace with 'cluster' from dashboard
//     forceTLS: true,
//     channelAuthorization: {
//       transport: "ajax",
//       endpoint: "http://localhost:3000/api/pusher/auth",
//       params: {
//         userId: ''
//       }
//     },
//   }
// );

// const SandboxPage: React.FunctionComponent = () => {
//   useEffect(() => {
//     const channel = pusher.subscribe("presence-quickstart");
//     channel.bind("pusher:subscription_succeeded", () => {
//       console.log("succeed");
//       console.log(channel.members);
//     });

//     channel.bind("pusher:member_added", (member: any) => {
//       console.log("member add: ", member);
//     });

//     channel.bind("pusher:member_removed", (member: any) => {
//       console.log("member removed: ");
//       console.log(channel.members);
//     });
//   }, []);

//   return <div className="flex h-screen flex-col bg-slate-700 "></div>;
// };

// export default SandboxPage;

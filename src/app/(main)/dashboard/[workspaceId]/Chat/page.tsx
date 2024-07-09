"use client";
import WorkspcaeSidebar from "@/components/Workspace-sedebar/Workspace-sidebar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "../../../../../../public/images/man.png";
import VideoCall from "../../../../../../public/images/video-camera.png";
import MessageSend from "../../../../../../public/images/paper-plane.png";
import attachements from "../../../../../../public/images/attachment (1).png";
// import searchIcon from "../../../../../../public/images/search-interface-symbol.png";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { log } from "util";
import socket from "../../../../../lib/Socket";
import { LogInIcon } from "lucide-react";
import { previousDay } from "date-fns";
import { toast } from "sonner";

type messagesType = {
  message: any;
  conversationId: any;
  receiver: any;
  senderId: any;
  reciverDetails: any;
  time: any;
};

// type UserType={

// }
// type conversationType={

// }

type getUsersType = { userId: string; socktId: string };
import { LuUserCircle2 } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { NewChat } from "@/components/chat/NewChat";
import { Attachement } from "@/components/chat/Attachement";
import { ImagePreview } from "@/components/chat/ImagePreView";
import { UserDetails } from "@/components/chat/UserDetails";

const Chat = ({ params }: { params: { workspaceId: string } }) => {
  const [conversations, setConversation] = useState([]);
  // console.log("params", params);

  const [query, setQuery] = useState<string>();
  const [messages, setMessages] = useState<messagesType>();
  const [SendMessage, setSendMessage] = useState<string>("");
  // const [message, setMessage] = useState([]);
  const [userData, setuserData] = useState<string[] | undefined>();

  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  // console.log("messages",messages);

  useEffect(() => {
    // LogInIcon
    socket.emit("addUser", userId);
    socket.on("getUsers", (users) => {
      // console.log('activeUsers :>> ', users);
    });

    return () => {
      socket.off("getMessage");
    };
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/conversation/${userId}`
      );
      if (response) {
        console.log("resData :>>", response.data);

        setConversation(response.data);
      }
    };
    fetchConversation();
  }, [SendMessage]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      // console.log("data", data);
      // console.log("createdAt", data.createdAt,typeof data.createdAt);

      setMessages((prev: any) => {
        // console.log("prev1", prev);
        if (!prev) {
          // console.log("prev2", prev);

          return {
            message: [{ message: data }],
            conversationId: data.conversationId,
            reciver: data.reciverId,
            senderId: data.senderId,
          };
        }

        // console.log("prev1",prev);

        return {
          ...prev,
          message: [
            ...prev.message,
            {
              message: {
                senderId: data.senderId,
                conversationId: data.conversationId,
                reciverId: data.reciverId,
                message: data.message,
                createdAt: data.createdAt,
              },
            },
          ],
        };
      });

      // console.log("messsage",messages);

      return () => {
        socket.off("getMessage");
      };
    });
  }, []);

  // useEffect(()=>{

  // })
  const fetchMessage = async (conversationId: string, receiver: string) => {
    const senderId = localStorage.getItem("userId");
    const reciverId = receiver;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/message/${conversationId}/${senderId}/${reciverId}`
    );

    if (response) {
      setMessages({
        message: response.data.message,
        conversationId: conversationId,
        receiver: receiver,
        senderId: senderId,
        reciverDetails: response.data.reciverDetails,
        time: response.data.createdAt,
      });
      // setMessage(response.data);

      // console.log("messagesReciverDetails", messages?.reciverDetails);
      // console.log("messages", messages?.message);
      // console.log("messages", messages);

      // console.log(
      //   " messages?.reciverDetails.username",
      //   messages?.reciverDetails.username
      // );
    }
  };

  const sendMessage = async () => {
    if (!SendMessage.trim()) {
      //  console.log("Message cannot be empty.");

      toast.success("Message cannot been empty", {
        position: "top-left",
      });
      return;
    }

    const data = {
      conversationId: messages?.conversationId,
      senderId: messages?.senderId,
      reciverId: messages?.receiver,
      message: SendMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", {
      conversationId: messages?.conversationId,
      senderId: messages?.senderId,
      reciverId: messages?.receiver,
      message: SendMessage,
      timestamp: new Date().toISOString(),
    });

    // console.log("messages?.conversationId",messages?.conversationId);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/saveMessage`,
      data,
      {
        withCredentials: true,
      }
    );
    setSendMessage("");
    if (response) {
      console.log("response", response.data);
      if (messages?.conversationId === "new") {
        setMessages((prev: any) => ({
          ...prev,
          conversationId: response.data.conversationId,
          message: [...prev.message],
        }));
      }

  

    }
  };

  const searchUser = async () => {
    console.log("query", query);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/searchUsers/${query}/${params.workspaceId}`
    );

    if (response) {
      const localStorageEmail = localStorage.getItem("email");
      const filteredData = response.data.filter(
        (user: any) => user.email !== localStorageEmail
      );
      // console.log("filteredData", filteredData);

      console.log("response", response.data);

      // response.data.map((user:any)=>{

      // })
      setuserData(filteredData);

      // console.log("userData", userData);
    }
  };

  // console.log(conversations);
  console.log("messages", messages);

  return (
    <>
      {/* <WorkspcaeSidebar workspaceId={params.workspaceId} /> */}

      <div className="w-screen h-screen flex">
        <div className="w-[24%] bg-custom-zinc">
          <div className="flex flex-col   justify-center items-center mt-5">
            <div className="flex w-full justify-between  gap-5">
              <div className="ml-3">
                {/* <Image height={40} width={40} alt="" src={Avatar} /> */}
                <p className="text-3xl font-bold text-white">Messages</p>
              </div>

              <div className="mt-3 mr-3">
                {/* <h3 className="text-sm text-white">NewChat</h3> */}
                <NewChat
                  workspaceId={params.workspaceId}
                  fetchMessage={fetchMessage}
                />
                {/* <p className="text-base font-light">Your Account</p> */}
              </div>
            </div>

            <div className="mt-5 ">
              <input
                onChange={(e) => setQuery(e.target.value)}
                className="px-12 py-2 rounded-lg bg-workspace-gray text-white  focus:border-0 outline-none"
                placeholder="search..."
              />
              <div className="fixed">
                {/* <Image className="absolute  top-22 left-55" height={20} width={20} src={searchIcon} alt="" />  */}
                <IoSearch
                  onClick={searchUser}
                  className="absolute bottom-2.5 text-white left-2"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="mx-7">
            {/* <div className="text-white text-center text-lg">Messages</div> */}
            <div className="mb-8">
              {conversations.length > 0 ? (
                conversations
                  .sort((a: any, b: any) => {
                    if (!a.lastMessagedTime) return 1;
                    if (!b.lastMessagedTime) return -1;
                    return (
                      new Date(b.lastMessagedTime).getTime() -
                      new Date(a.lastMessagedTime).getTime()
                    );
                  })
                  .map((conversation: any, index: any) => {
                    // Convert lastMessagedTime to a readable time format
                    let formattedTime = "No time";
                    if (conversation.lastMessagedTime) {
                      const date = new Date(conversation.lastMessagedTime);
                      formattedTime = date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    }

                    return (
                      <React.Fragment key={conversation.user._id}>
                        <div
                          onClick={() =>
                            fetchMessage(
                              conversation.conversationId,
                              conversation.user.id
                            )
                          }
                          className="flex overscroll-auto items-center py-[27.7px] border-b border-gray-300"
                        >
                          <div className="cursor-pointer bg-workspace-gray rounded-full w-10 h-10 flex items-center justify-center">
                            {/* <Image height={40} width={40} alt="" src={Avatar} /> */}

                            {conversation.user.profilePhoto ? (
                              <img
                                className="w-10 h-10 rounded-full "
                                src={conversation.user.profilePhoto}
                              />
                            ) : (
                              <LuUser2 className="text-white text-xl" />
                            )}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold text-white">
                              {conversation.user.username}
                            </h3>
                            <p className="text-xs font-medium text-left pl-10 text-white ">
                              {conversation.lastmessage}
                            </p>
                            <p className="text-xs pl-10 text-left text-white font-light">
                              {formattedTime}
                            </p>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
              ) : (
                <div className="text-center text-white text-lg font-semibold mt-36">
                  No Conversation
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-[100%] bg-chat  flex flex-col item-center">
          {messages?.receiver && (
            <div className="w-[100%] flex items-center gap-4   h-[80px] mt-  p-5">
              <div className="cursor-pointer">
            
              {messages.reciverDetails.profilePhoto ? (
          <img className="w-10 h-10 rounded-full" src={messages.reciverDetails.profilePhoto} />
        ) : (
          <Image alt="" src={Avatar} width={40} height={40} className="rounded-full" />
        )}
              </div> 
              <div>
                <h3 className="text-lg text-white font-semibold">
                  {messages?.reciverDetails.username}
                </h3>
                <p className="text-sm text-white font-light">
                  {/* {messages?.reciverDetails.email} */}
                  <UserDetails user={messages?.reciverDetails} />
                </p>
              </div>
              <div className="cursor-pointer ml-">
                {/* <Image height={30} width={30} src={VideoCall} alt="" /> */}
              </div>
            </div>
          )}

          <div className="w-full h-full overflow-y-auto">
            <div className="px-10 py-10">
              {messages && messages.message && messages.message.length > 0 ? (
                messages.message.map((msg: any, index: any) => {
                  let date;
                  // console.log("messageTime",msg.message,typeof msg.message.createdAt);

                  if (typeof msg.message.createdAt === "string") {
                    date = new Date(msg.message.createdAt);
                    // console.log("date",date,typeof date);
                  } else {
                    date = msg.message.createdAt;
                    // console.log("else date",date);
                  }

                  const formattedTime = date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  // Check if the message ends with .png or .jpeg
                  // const isImage = msg.message.message.endsWith(".png") || msg.message.message.endsWith(".jpeg");
                  let isImage;
                  if (
                    msg.message.message.endsWith(".png") ||
                    msg.message.message.endsWith(".jpg") ||
                    msg.message.message.endsWith(".jpeg") ||
                    msg.message.message.endsWith(".pdf")
                  ) {
                    isImage = msg.message.message;
                  }

                  return (
                    <div
                      key={index} // It's good practice to add a unique key prop when using map
                      className={`${
                        userId === msg.message.senderId
                          ? `max-w-[25%] bg-white rounded-b-xl rounded-tr-md p-4 mb-5`
                          : `max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-5 text-white`
                      }`}
                    >
                      {isImage ? (
                        // <a href={msg.message.message} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">
                        //   {msg.message.message}
                        // </a>
                        // <img alt="Preview" src={msg.message.message} width={100} height={100} className="" />
                        <ImagePreview previewImage={msg.message.message} />
                      ) : (
                        msg.message.message
                      )}
                      <p className="text-black text-xs pl-28 text-left">
                        {formattedTime}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Messages or No Conversation Selected
                </div>
              )}
            </div>
          </div>
          <div className="p-5 gap-6  flex w-full">
            <input
              onChange={(e) => setSendMessage(e.target.value)}
              placeholder="Type A Message..."
              className="w-[90%] px-4 py-4 border-0 shadow-md rounded-full bg-workspace-gray text-white focus:border-0 outline-none"
              value={SendMessage}
            />
            <div onClick={sendMessage}>
              <Image
                height={35}
                width={35}
                className="pt-3"
                src={MessageSend}
                alt=""
              />
            </div>
            <div>
              <Attachement
                conversationId={messages?.conversationId}
                senderId={messages?.senderId}
                receiver={messages?.receiver}
              />
            </div>
          </div>
        </div>
        <div className="w-[25%] bg-custom-zinc">
          <div className=" mt-4">
            {userData
              ? userData.map((user: any) => (
                  <React.Fragment key={user.username}>
                    <div
                      onClick={() => fetchMessage("new", user._id)}
                      className="flex overscroll-auto items-center py-[27.7px] border-b border-gray-300"
                    >
                      <div className="cursor-pointer">
                        <Image height={40} width={40} alt="" src={Avatar} />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg text-white">{user.username}</h3>
                        <p className="text-base font-light">{status}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              : " "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

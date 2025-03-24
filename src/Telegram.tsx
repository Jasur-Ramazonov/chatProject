import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteMessage,
  deleteMyUser,
  editMessage,
  getMessages,
  getUsers,
  logOut,
  sendMessage,
} from "./utils/requestsBack";
import { DataSnapshot } from "firebase/database";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Rodal from "rodal";

interface Message {
  id: string;
  body: string;
  sender: string;
  receiver: string;
}

interface User {
  id: string;
  email: string;
  password: string;
}

const Telegram = () => {
  const [users, setUsers] = useState<
    { email: string; password: string; id: string }[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState("");
  const [hasPartner, setHasPartner] = useState(false);
  const [current, setCurrent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, reset, register } = useForm<{
    body: string;
    sender: string;
    receiver: string;
    id?: string;
  }>();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/signin");
    } else {
      getUsers().then((res) => {
        let user: User[] = res.docs.map((itm) => {
          return {
            id: itm.id,
            ...(itm.data() as { email: string; password: string }),
          };
        });
        setUsers(user);
        getMessages(takeMessages);
      });
    }
  }, []);

  function takeMessages(snapshot: DataSnapshot) {
    const data = snapshot.val();
    const myMessages = Object.keys(data).map((itm) => {
      return { id: itm, ...data[itm] };
    });
    setMessages(myMessages);
  }

  return (
    <PanelGroup
      direction="horizontal"
      className="flex h-[100vh] w-full relative"
    >
      {/* saidbar */}
      <Panel className="p-2 w-1/4 max-w-full bg-[#34495e]">
        <h1 className="text-center font-bold text-2xl">Users</h1>
        <div className=" h-[90vh] overflow-auto">
          {users
            ?.filter((itm) => itm.id !== userId)
            .map((itm, i) => {
              return (
                <div
                  onClick={() => {
                    setPartner(itm.id);
                    setHasPartner(true);
                    console.log(userId);
                  }}
                  key={i}
                  className="w-full h-24 flex items-center justify-between p-2 hover:bg-[#2c3e50] ease-linear duration-75 cursor-pointer overflow-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2980b9] flex justify-center items-center font-bold text-2xl">
                    {itm.email[0].toUpperCase()}
                  </div>
                  <div className="w-75 text-2xl">{itm.email}</div>
                </div>
              );
            })}
        </div>
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-600 cursor-ew-resize" />

      {/* message screen */}
      <Panel className="w-full">
        <h1 className="text-center text-2xl font-bold">Messages</h1>
        <div className=" h-[88vh] overflow-auto p-2">
          {messages.map((itm, i) => {
            if (itm.sender === userId && itm.receiver === partner) {
              return (
                <p
                  key={i}
                  className="bg-[#2B5278] text-center w-fit p-3 rounded-t-md rounded-e-md"
                  onDoubleClick={() => {
                    setCurrent(itm.id);
                    reset({
                      body: itm.body,
                    });
                  }}
                  onContextMenu={(e) => {
                    deleteMessage(e, itm.id);
                  }}
                >
                  {itm.body}
                </p>
              );
            }
            if (itm.sender === partner && itm.receiver === userId) {
              return (
                <p
                  key={i}
                  className="bg-[#182533] text-center w-fit p-3 rounded-t-md rounded-e-md "
                >
                  {itm.body}
                </p>
              );
            }
          })}
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            if (!current) {
              data.receiver = partner;
              data.sender = userId!;
              sendMessage(data).then(() => {
                reset({
                  body: "",
                });
              });
            } else {
              delete data.id;
              editMessage(data, current).then(() => {
                reset({ body: "" });
                setCurrent("");
              });
            }
          })}
          className="px-2 flex gap-2"
        >
          <input
            {...register("body")}
            disabled={!hasPartner}
            type="text"
            className="form-control"
            placeholder="Send message..."
          />
          <button className="btn btn-primary">
            <IoSend />
          </button>
        </form>
      </Panel>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="btn btn-primary absolute top-5 right-5"
      >
        My Accaunt
      </button>
      {/* Rodal */}
      <Rodal
        visible={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className=" h-full flex justify-center items-center">
          {users.map((itm, i) => {
            if (itm.id === userId) {
              return (
                <div key={i}>
                  <p className="text-dark text-xl" key={i}>
                    User Email: {itm.email}
                  </p>
                  <p className="text-dark text-xl">
                    User Password: {itm.password}
                  </p>
                  <button
                    onClick={() => {
                      logOut().then(() => {
                        deleteMyUser(itm.id).then(() => {
                          navigate("/");
                        });
                      });
                    }}
                    className="btn btn-danger w-full"
                  >
                    Log Out
                  </button>
                </div>
              );
            }
          })}
        </div>
      </Rodal>
    </PanelGroup>
  );
};

export default Telegram;
{
  /* <p className="bg-[#2B5278] text-center w-fit p-3 rounded-t-md rounded-e-md">
salom
</p>
<p className="bg-[#182533] text-center w-fit p-3 rounded-t-md rounded-e-md ">
salom
</p> */
}

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";

function Chat(props) {
  const [socket, setSocket] = useState(null);
  const [chatsId, setChatsId] = useState(null);
  const [chatsUsers, setChatsUsers] = useState([]);
  const [chatSelected, setChatSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  const { query } = router;

  useEffect(() => {
    const socketCon = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || "http://localhost:4200", {
      withCredentials: true
    });
    setSocket(socketCon);
    socketCon.on("error", (data) => {
      alert('Error al conectarse al chat')
      router.push('/')
    })
    socketCon.on("chats", (data) => {
      setChatsId(data);
    })

    return () => {
      socketCon.emit("leave");
      socketCon.disconnect();
    }
  }, [])

  useEffect(() => {
    async function getChats() {
      let usersInfo = [];
      if (chatsId) {
        for (let i = 0; i < chatsId.length; i++) {
          const userData = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${chatsId[i]}`)
            .then(async res => {
              let avatar = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${chatsId[i]}/avatar`).then(avatarres => avatarres.data).catch(() => { });
              if (avatar) res.data.avatar = avatar;
              return res.data;
            }).catch(() => null);
          if (userData) usersInfo.push(userData);
        }
      }
      setChatsUsers(usersInfo);
    }
    getChats();
  }, [chatsId])

  useEffect(() => {
    if (chatSelected) {
      router.push({
        pathname: `/chat`,
        query: { user: chatsId[chatSelected.index] },
      });
    }
  }, [chatSelected])

  useEffect(() => {
    if (query.user) {
      if (chatsId) {
        socket.removeAllListeners("message");
        socket.emit('leave')
        let index = chatsId.indexOf(parseInt(query.user));
        if (index !== -1) {
          if (chatsUsers[index]) {
            setChatSelected({ index, user: chatsUsers[index] })
            socket.emit("join", query.user);
            socket.on('join', (data) => {
              setMessages(data);
            })
            socket.on('message', (data) => {
              setMessages(messages => [data, ...messages]);
            })
          };
        } else {
          socket.emit("join", query.user);
          socket.on('join', (data) => {
            setMessages(data);
          })
        }
      }
    }
  }, [query.user, chatsId, chatsUsers])

  const handleMessageSend = (event) => {
    event.preventDefault();
    socket.emit("message", message);
    setMessage('')
  }

  return (
    <>
      <Head>
        <title>StackingUp Chat</title>
      </Head>
      <main className="h-screenC md:flex">
        <section className="md:basis-1/2 lg:basis-2/5 xl:basis-1/5 border-r">
          {
            chatsUsers && chatsUsers.length > 0 ? chatsUsers.map((user, index) => {
              return (
                <div key={`ch-${index}`}>
                  <div className={`${chatSelected?.index === index ? 'bg-[#d6f6ff]' : 'bg-white'}  h-24 flex`} onClick={() => { setChatSelected({ index, user }) }}>
                    <div className="shrink-0 min-w-[100px] flex justify-center items-center">
                      <Image src={user?.avatar ? `data:${user.avatar.mimetype};base64, ${user.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" width={80} height={80} objectFit="cover" alt={`userImage`}></Image>
                    </div>
                    <div className="flex items-center p-5">
                      <h1 className="text-xl text-ellipsis">{user.name} {user.surname}</h1>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            }) : null
          }
        </section>
        {
          chatSelected ?
            <>
              <section className={`absolute md:static inset-0 md:basis-1/2 lg:basis-3/5 xl:basis-4/5`}>
                <div className="pt-16 md:pt-0 bg-white h-screenC ">
                  <header className="h-16 flex bg-gray-200 px-3 shadow">
                    <div className="flex justify-center items-center md:hidden">
                      <svg onClick={() => setChatSelected(null)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="shrink-0 min-w-[60px] flex justify-center items-center">
                      <Image src={chatSelected.user?.avatar ? `data:${chatSelected.user.avatar.mimetype};base64, ${chatSelected.user.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" width={50} height={50} objectFit="cover" alt={`userImage`}></Image>
                    </div>
                    <div className="flex items-center p-5">
                      <h1 className="text-xl whitespace-nowrap text-ellipsis">{chatSelected.user.name} {chatSelected.user.surname}</h1>
                    </div>
                  </header>
                  <main className="max-h-[calc(100%-4rem)] h-[calc(100%-4rem)] md:h-[calc(100%-8rem)] md:max-h-[calc(100%-8rem)] flex flex-col-reverse p-5 overflow-y-auto">
                    {
                      messages && messages.length > 0 ? messages.sort((a, b) => { new Date(b.datetime) - new Date(a.datetime) }).map((messageInfo, index) => {
                        if (new Date(messageInfo.datetime).toLocaleDateString() !== new Date(messages[index + 1]?.datetime)?.toLocaleDateString()) {
                          if (messageInfo.user === 0) {
                            return (
                              <>
                                <div key={`sistem-${index}`} className={`shrink-0 min-h-[40px] my-4 flex justify-center`}>
                                  <div className={`w-fit p-2 rounded text-gray-600 max-w-[60%] bg-gray-300`}>
                                    <h1 className="text-center">🔒 Por razones de seguridad, nunca compartas datos privados</h1>
                                  </div>
                                </div>
                                <div key={`sistemDate-${index}`} className={`shrink-0 min-h-[40px] my-4 flex justify-center`}>
                                  <div className={`w-fit p-2 rounded text-white max-w-[60%] bg-gray-700`}>
                                    <h1>{new Date(messageInfo.datetime).toLocaleDateString()}</h1>
                                  </div>
                                </div>
                              </>

                            )
                          }
                          return (
                            <>
                              <div key={messageInfo._id} className={`shrink-0 min-h-[40px] mt-2 ${messageInfo.user !== chatsId[chatSelected.index] ? 'flex justify-end' : ''}`}>
                                <div className={`w-fit p-2 rounded text-white max-w-[60%] ${messageInfo.user !== chatsId[chatSelected.index] ? 'bg-blue-bondi' : 'bg-gray-600'}`}>
                                  <h1 className="break-words">{messageInfo.text}</h1>
                                  <p className="text-gray-300 text-xs">{new Date(messageInfo.datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                </div>
                              </div>
                              <div key={`sistemDate-${index}`} className={`shrink-0 min-h-[40px] my-4 flex justify-center`}>
                                <div className={`w-fit p-2 rounded text-white max-w-[60%] bg-gray-700`}>
                                  <h1>{new Date(messageInfo.datetime).toLocaleDateString()}</h1>
                                </div>
                              </div>
                            </>
                          )
                        }
                        if (messageInfo.user == 0) {
                          return;
                        }
                        return (
                          <>
                            <div key={messageInfo._id} className={`shrink-0 min-h-[40px] mt-2 ${messageInfo.user !== chatsId[chatSelected.index] ? 'flex justify-end' : ''}`}>
                              <div className={`w-fit p-2 rounded text-white max-w-[60%] ${messageInfo.user !== chatsId[chatSelected.index] ? 'bg-blue-bondi' : 'bg-gray-600'}`}>
                                <h1 className="break-words">{messageInfo.text}</h1>
                                <p className="text-gray-300 text-xs text-right">{new Date(messageInfo.datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                              </div>
                            </div>
                          </>
                        )
                      }) : null
                    }
                  </main>
                  <form onSubmit={handleMessageSend} className="h-16 bg-gray-200 p-2 px-4 flex space-x-3 border-t">
                    <input className="h-full border focus:border focus:border-blue-bondi basis-[95%] px-2 rounded" placeholder="Escribe un mensaje aquí" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" className="h-full p-3 rounded-full bg-blue-bondi text-white ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </section>
            </> : <></>
        }
      </main>
    </>
  )
}

export default Chat;
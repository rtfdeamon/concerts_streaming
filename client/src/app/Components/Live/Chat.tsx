'use client'
import { useState, useEffect, useRef, memo } from "react";
import { io } from "socket.io-client";
import InputEmojiWithRef from "react-input-emoji";
import Link from "next/link";
import Image from "next/image";
import Clip from '../../../../public/clip.png';
import FileIcon from '../../../../public/fileIcon.svg';
// import FileUpload from "./FileUpload";
import styles from './Chat.module.scss';

export default memo(function Chat() {
    // const socket = io(`http://localhost:5000`);
    const [messageText, setMessageText] = useState('');
    const [chatMessageReceived, setChatMessageReceived] = useState([]);
    const [showMoreMessage, setShowMoreMessage] = useState('');
    // chat funcs
    // const sendMessage = (e) => {
    //     const date = new Date();
    //     const currDate = String(date.toLocaleTimeString().split(':').splice(0, 2).join(':'));
    //     if (!e && messageText !== ''){
    //       socket.emit("sendMessage", { messageText, roomName, user, currDate });
    //       setMessageText('');
    //     }
    //   };
    //   const handleKeyDown = (e) => {
    //     if (e.key === "Enter" && messageText !== ''){
    //         const date = new Date();
    //         const currDate = String(date.toLocaleTimeString().split(':').splice(0, 2).join(':'));
    //         socket.emit("sendMessage", { messageText, roomName, user, currDate });
    //         setMessageText('');
    //     }
    //   };
    //   const showMoreMessageHandler = (i) => {
    //     if (showMoreMessage === i){
    //       setShowMoreMessage('')
    //     } else{
    //       setShowMoreMessage(i);
    //     }
    //   }
    //   // fileUpload funcs
    //   const sendFileMessage = (data) => {
    //     const date = new Date();
    //     const currDate = String(date.toLocaleTimeString().split(':').splice(0, 2).join(':'));
    //     console.log(data)
    //       socket.emit("sendMessage", { messageInfo: data, roomName, user, currDate });
    //   };
    //   const el = useRef();
    //   const handleChange = (e) => {
    //     const file = e.target.files[0];
    //     uploadFile(file)
    //     .then((data) => sendFileMessage(data));
    //   }
    //   const uploadFile = async (file) => {
    //       try{
    //           const formData = new FormData();
    //           formData.append('file', file);
    //           const res = await fetch(`${process.env.WSBACK_URL}/api/upload/`, {
    //               method: 'POST',
    //               body: formData
    //           })
    //           const data = await res.json();
    //           return {
    //               name: data.name,
    //               path: `${process.env.WSBACK_URL}/public` + data.path
    //           }
    //       } catch(e){
    //           console.log(e);
    //       }
    //     }
    //   useEffect(() => {
    //     socket.emit("joinRoom", roomName);
    //     getChat(roomName)
    //     .then(res => setChatMessageReceived(res))
    //     .catch(e => console.log(e))
    //     return () => {
    //         if (tracks.length === 0){
    //             deleteChat(roomName)
    //           }
    //     };
    //   }, [roomName])
    //   useEffect(() => {
    //     socket.on("receiveMessage", (data) => {
    //       setChatMessageReceived(prev => [...prev, data]);
    //     });
    //   }, [socket]);
      
  return (
    <section
    className={styles.chat}>
    <div className={styles.messages}>
      {/* {chatMessageReceived.map((chat, i) => (
        <div
            key={i}
            className={i === +showMoreMessage ? styles.fullChatMessage : styles.chatMessage && chat.user === user ? styles.userMessage : styles.remoteMessage}
        >
        {chat.messageText ?
            <>
              <div className={styles.messageWrapper}>
                  <span
                      className={styles.chatUser}
                  >{chat.user}</span>
                  <span
                  className={styles.chatDate}
              >{chat.currDate}</span>
              </div>
              <p className={styles.messageText}
              >{chat.messageText}</p>
              {chat.messageText?.length > 27 && 
                  <span
                  onClick={() => showMoreMessageHandler(i)}
                  className={styles.moreMessage}>Ещё</span>
              }
          </>
          :
          <>
            <div className={styles.messageWrapper}>
                <span
                    className={styles.chatUser}
                >{chat.user}</span>
                <span
                className={styles.chatDate}
            >{chat.currDate}</span>
            </div>
            {
              chat.messageInfo?.name.toLowerCase().split('.').includes('jpg')
              || chat.messageInfo?.name.toLowerCase().split('.').includes('png')
              || chat.messageInfo?.name.toLowerCase().split('.').includes('jpeg')
              ?
              <Image className={styles.fileImage} src={chat.messageInfo?.path} width={200} height={200} alt={chat.messageInfo?.name} />
              :
              <Link className={styles.messagePathLink} href={chat.messageInfo?.path}>
                <Image className={styles.file} width={100} height={100}  src={FileIcon} alt={chat.messageInfo?.name} />
                <span className={styles.fileName}>{chat.messageInfo?.name}</span>
              </Link>
            }
          </>
        }
        </div>
      ))} */}
    </div>
    <div className={styles.input}>
    <InputEmojiWithRef
              // inputClass={styles.input}
              height={60}
              keepOpened
              language="ru"
              value={messageText}
              onChange={setMessageText}
            //   onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Type your message..."
    />
    </div>
    <div className={styles.btns}>
        <>
            <Image
                // onClick={() => el.current.click()}
                className={styles.clip}
                src={Clip}
                width={40}
                height={20}
                alt='clip'
            />
            <input
                className={styles.inputUpload}
                // type='file' ref={el}
                // onChange={handleChange}
            />
        </>
        {/* <FileUpload
            socket={socket}
            setChatMessageReceived={setChatMessageReceived}
            roomName={roomName}
            user={user}
        /> */}
        <button
            // onClick={() => sendMessage()}
            className={styles.sendButton}>
                Send</button>
    </div>
</section>
  )
})

'use client'
import { useState, useEffect, memo } from "react";
import { Centrifuge } from 'centrifuge';
import InputEmojiWithRef from "react-input-emoji";
import { IMessage, IUser } from "@/app/types/interfaces";
import styles from './Chat.module.scss';
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { CSTTimeZoneOptions } from "@/app/utils/constants";

const centrifuge = new Centrifuge('wss://dp-ent.com:8443/connection/websocket')
export default memo(function Chat({id}: {id: string}) {
    const [messageText, setMessageText] = useState('');
    const [chatMessageReceived, setChatMessageReceived] = useState<IMessage[]>([]);
    const [showMoreMessage, setShowMoreMessage] = useState<number>(-1);
    const [user, setUser] = useState<IUser>()
    const [sub, setSub] = useState(() => {
      try {
        const test = centrifuge.newSubscription(`concert-${id}`)
        return test
      } catch(e){
        return null
      }
    })

    useEffect(() => {
      setSub(() => {
        try {
          const test = centrifuge.newSubscription(`concert-${id}`)
          return test
        } catch(e){
          return null
        }
      })
    }, [centrifuge])
    useEffect(() => {
      if (!sub){
        setSub(() => {
          try {
            const test = centrifuge.newSubscription(`concert-${id}`)
            test?.subscribe();
            centrifuge.connect();
            return test
          } catch(e){
            return null
          }
        })
      }
    })
    useEffect(() => {
      sub?.subscribe();
      centrifuge.connect();
      return () => {
        // centrifuge.removeSubscription(sub)
      }
    }, [sub])
    useEffect(() => {
      async function getCurrUser(){
        const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
          method: 'GET',
          headers: {
            'Authorization' : `Bearer ${await getTokenForApi()}`
          }
        })
        const data = await res.json();
        setUser(data);
      }
      getCurrUser()
    }, [])

    useEffect(() => {
      sub?.on('publication', function(ctx) {
        setChatMessageReceived(prev => [...prev, ctx.data])
    });
    }, [centrifuge])

    useEffect(() => {
      async function getChat() {
        const res =  await fetch(`${process.env.BACKEND_URL}/concerts/${id}/chat/`)
        const data: IMessage[] = await res.json();
        setChatMessageReceived(data)
      }
      getChat()
    }, [])

    const sendMessage = async () => {
          if (messageText === '') return
            const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/chat/`, {
              method : 'POST',
              headers: {
                'Authorization':`Bearer ${await getTokenForApi()}`,
                'Content-type':'application/json'
              },
              body: JSON.stringify({text: messageText})

            })
            if (res.ok) {
              setMessageText('');
            }
        }
      const handleKeyDown = async (e: globalThis.KeyboardEvent) => {
        if (e.key === "Enter" && messageText !== ''){
          if (messageText === '') return
            const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/chat/`, {
              method : 'POST',
              headers: {
                'Authorization':`Bearer ${await getTokenForApi()}`,
                'Content-type':'application/json'
              },
              body: JSON.stringify({text: messageText})

            })
            if (res.ok) {
              setMessageText('');
            }
            setMessageText('');
        }
      };
      const showMoreMessageHandler = (i: number) => {
        if (showMoreMessage === i){
          setShowMoreMessage(-1)
        } else{
          setShowMoreMessage(i);
        }
      }
      
  return (
    <section
    className={styles.chat}>
    <div className={styles.messages}>
      {chatMessageReceived.length > 0 &&  chatMessageReceived.map((msg, i) => (
        <div
            key={i}
            className={i === +showMoreMessage ? styles.fullChatMessage : styles.chatMessage && msg?.sender?.id === user?.id ? styles.remoteMessage : styles.userMessage}
        >
              <div className={styles.messageWrapper}>
                  <span
                      className={styles.chatUser}
                  >{msg?.sender?.name}</span>
                  <span
                  className={styles.chatDate}
              >{typeof msg.date !== 'undefined' && new Date(Math.round(msg.date)*1000).toLocaleString('en-US', CSTTimeZoneOptions).split(',')[1]}</span>
              </div>
              <p className={styles.messageText}
              >{msg.text}</p>
              {msg.text?.length > 27 && 
                  <span
                  onClick={() => showMoreMessageHandler(i)}
                  className={styles.moreMessage}>More</span>
              }
        </div>
      ))}
    </div>
    <div className={styles.input}>
    <InputEmojiWithRef
              // inputClass={styles.input}
              keepOpened
              language="ru"
              value={messageText}
              onChange={setMessageText}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
    />
    </div>
    <div className={styles.btns}>
        <>
            {/* <Image
                // onClick={() => el.current.click()}
                className={styles.clip}
                src={Clip}
                width={40}
                height={20}
                alt='clip'
            /> */}
            {/* <input
                className={styles.inputUpload} */}
                {/* // type='file' ref={el}
                // onChange={handleChange}
            /> */}
        </>
        {/* <FileUpload
            socket={socket}
            setChatMessageReceived={setChatMessageReceived}
            roomName={roomName}
            user={user}
        /> */}
        <button
            onClick={sendMessage}
            className={styles.sendButton}>
                Send</button>
    </div>
</section>
  )
})

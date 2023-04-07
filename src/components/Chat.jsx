import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import SignOut from "./auth/SignOut";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const q = query(messageRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapShot) => {
      const _messages = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setMessages(_messages);
    });

    return () => unsubscribe();
  },[]);

  const handleNewMessage = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      name: auth.currentUser.displayName,
      img: auth.currentUser.photoURL,
    });

    setNewMessage("");
  }

  return (
    <div className="w-[700px] overflow-y-scroll h-[400px] p-4 flex flex-col justify-between gap-10 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row justify-between">
        <h1 className="flex flex-col items-baseline text-white text-center font-extrabold text-2xl">
          Zurcord
          <span className="text-white text-sm font-thin">Realtime Chat App</span>
        </h1>
        <SignOut />
      </div>
      <div className="flex flex-col space-y-4">
        {messages.map((message) => (
          <div className="flex flex-row justify-start items-baseline space-x-2" key={message.id}>
            <p className="text-white text-center font-bold text-base">{message.name}:</p>
            <p className="text-white text-center font-normal text-sm">{message.text}</p>
          </div>
        ))}
      </div>
      <form className="flex flex-row space-x-4  top-[500px]" onSubmit={handleNewMessage}>
        <input
          className="w-[700px] h-12 p-2 rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a new message..."
        />
        <button className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">Send</button>
      </form>
    </div>
  );
}

import SignIn from "../src/components/auth/SignIn";
import SignOut from "../src/components/auth/SignOut";
import Chat from "./components/Chat";
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="flex flex-col items-center space-y-4">
          <Chat />
        </div>
      ) : (
        <div className="w-[400px] h-[200px] p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col space-y-8 justify-center items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-extrabold text-2xl">
              Welcome to Zurcord
            </h1>
            <p className="text-white font-medium text-lg">
              Sign in with Google before continue
            </p>
          </div>

          <SignIn />
        </div>
      )}
    </div>
  );
}

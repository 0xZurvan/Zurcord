import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

export default function SignOut() {

  const signOutFromGoogle = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={signOutFromGoogle}
      >
        Sign Out
      </button>
    </div>
  )
}

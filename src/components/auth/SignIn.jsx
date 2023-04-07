import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";

export default function SignIn() {
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={SignInWithGoogle}
      >
        Sign In
      </button>
    </div>
  );
}

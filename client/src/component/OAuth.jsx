import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase.js'
import { useDispatch } from "react-redux";
import { signInSucess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 3:15:00
    async function handleGoogleAuth() {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })
            const data = await res.json();
            console.log(data);
            dispatch(signInSucess(data));
            console.log(data);

            navigate('/')
            // console.log(result);
        } catch (error) {
            console.log("Try Again Later");
        }
    }

    return (
        <button
        onClick={handleGoogleAuth}
        type="button"
        className="bg-yellow-500 w-1/4 p-4 rounded-xl text-xl text-gray-400 font-semibold hover:bg-yellow-300 hover:text-orange-500 transition-all ease-in-out duration-500">
        Continue with Google
        </button>
    )
}

// 3:10:00
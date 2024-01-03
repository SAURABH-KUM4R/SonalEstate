import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { deleteUserFaliure, deleteUserStart, deleteUserSucess, signInStart, signOutUserStart, updateUserFaliure, updateUserStart, updateUserSucess } from "../Redux/user/userSlice";
import { Link } from "react-router-dom";

export function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState();
  const [filePrecent, setFilePrecent] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrecent(Math.round(progress));
      },

      (error) => {
        setFileError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.sucess === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }

      dispatch(updateUserSucess(data));
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.sucess == false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSucess(data));

    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.sucess == false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSucess(data))
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.sucess == false) {
        setShowListingError(true);
        setError(data.message);
        return;
      }

      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
      setError(error.message);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.sucess == false) {
        console.log(data.message);
        return
      }

      setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="text-3xl font-semibold text-orange-500 text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt=""
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-center">
          {fileError ? (
            <span className="text-red-700">Error Image upload</span>
          ) : filePrecent > 0 && filePrecent < 100 ? (
            <span>{`Uploading ${filePrecent}%`}</span>
          ) : filePrecent == 100 ? (
            <span>Image Sucessfully Uploaded!</span>
          ) : (
            <></>
          )}
        </p>
        <input
          type="text"
          name="username"
          defaultValue={currentUser.username}
          id="username"
          placeholder="username"
          className="border p-3 w-1/3 self-center rounded-xl text-orange-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 w-1/3 self-center rounded-xl text-orange-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          className="border p-3 w-1/3 self-center rounded-xl text-orange-500"
          onChange={handleChange}
        />
        <button disabled={loading} className="border-orange-500 w-1/3 self-center p-3 rounded-lg text-xl bg-transparent border-2 text-orange-400 hover:bg-orange-400 hover:text-black transition-all ease-in-out duration-300">
          {loading ? 'Loading....':'UPDATE'}
        </button>
        <Link className="bg-orange-400 p-3 rounded-lg text-center w-1/3 hover:bg-orange-500 duration-300 transition-all ease-in-out text-xl" to={"/create-listing"}>
            CREATE LISTING 
        </Link>
        <div className="flex justify-center mt-5">
          <span onClick={handleDeleteUser} className="text-red-700 mx-36 cursor-pointer hover:underline text-xl">
            Delete Account
          </span>
          <span onClick={handleSignout} className="text-red-700 mx-36 cursor-pointer hover:underline text-xl">
            Sign Out
          </span>
        </div>
        <p className="text-orange-400 text-2xl">{error ? error : ''}</p>
        <button onClick={handleShowListings} className="bg-transparent border-orange-400 border-2 w-1/3 mb-4 p-2 text-white rounded-lg cursor-pointer hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-black">Show Listing</button>
      </form>
      <p>{showListingError ? 'Error showing listing' : ''}</p>
      {userListing && userListing.length > 0 && 
        userListing.map((listing) =>
          <div className="border rounded-lg p-3 flex justify-between items-center m-auto w-1/2 " key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageURLs[0]} alt="listing cover" className="h-16 w-16 object-contain"/>
            </Link>
            <Link to={`/listing/${listing._id}`}>
              <p className="text-orange-400 font-semibold felx-1">{listing.name}</p>
            </Link>
            <div>
              <button onClick={() => handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
              <br />
              <Link to={`/update-listing/${listing._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
}

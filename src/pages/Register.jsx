import { useState, useRef } from "react";
import Add from "../img/addAvatar.png";
import { Link, useNavigate } from "react-router-dom";
// firebase
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  // States
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    image: "",
  });
  const toastId = useRef(null);
  const navigate = useNavigate();
  // Handle form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name == "image" ? e.target.files[0] : e.target.value,
    });
  };
  // Handle Submit
  const handleSubmit = async (e) => {
    const { displayName, email, image, password } = formData;
    e.preventDefault();
    // Register Promise
    const Registeration = () =>
      new Promise(async (resolve, rejected) => {
        // "Producing Code" (May take some time)

        try {
          //1 Register user
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          //2 Uploade Image & Update Profile
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);

          await uploadBytesResumable(storageRef, image).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update Profile
                await updateProfile(user, {
                  displayName: displayName,
                  photoURL: downloadURL,
                });
                // Create user on firestore
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: displayName,
                  email: email,
                  photoURL: downloadURL,
                });
                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", user.uid), {});
                resolve(); // when successful
              } catch (err) {
                rejected(); // when error
              }
            });
          });
        } catch (err) {
          rejected(); // when error
        }
      });

    toast.promise(Registeration, {
      pending: "Registering the user... ",
      success: {
        render() {
          navigate("/");
          return `Welcome to Firecaht 🔥`;
        },
      },
      error: {
        render() {
          return `Something went wrong could not register the user`;
        },
      },
    });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src="/favicon.ico" alt="Logo" width={30} /> FireChat
        </span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="displayName"
            required
            type="text"
            placeholder="display name"
          />
          <input
            onChange={handleChange}
            name="email"
            required
            type="email"
            placeholder="email"
          />
          <input
            onChange={handleChange}
            name="password"
            required
            type="password"
            placeholder="password"
          />
          <input
            onChange={handleChange}
            name="image"
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            accept="image/png, image/jpeg"
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled="">Sign up</button>
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

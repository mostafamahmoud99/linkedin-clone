import { signInWithPopup } from "firebase/auth";
import { auth, db, provider, storage } from "../../firebase";
import { setUser, setLoading, getArticles } from "./actions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}

export function postArticles(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image) {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const collRef = collection(db, "articles");
            addDoc(collRef, {
              actor: {
                description: payload.user.email,
                name: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              comments: 0,
              video: payload.video,
              description: payload.description,
              shareImg: downloadURL,
            });
            dispatch(setLoading(false));
          });
        }
      );
    } else if (payload.video) {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        actor: {
          descripition: payload.user.email,
          name: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        video: payload.video,
        description: payload.description,
        shareImg: payload.image,
      });
      dispatch(setLoading(false));
    } else {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        actor: {
          descripition: payload.user.email,
          name: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        video: payload.video,
        description: payload.description,
        shareImg: payload.image,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    const collRef = collection(db, "articles");
    const orderRef = query(collRef, orderBy("actor.date", "desc"));
    onSnapshot(orderRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      dispatch(getArticles(payload));
    });
  };
}

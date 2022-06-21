import logo from './logo.svg';
import React from 'react';
import { auth, db } from './firebase/init'
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from 'firebase/firestore'
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut,
 } from "firebase/auth";


function App() {
  const [user, setUser] = React.useState({});

  async function updatePost() {
    const hardCodedId = "3DIziqg1ZogKAZ6JIgVj"
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId);
    const newPost = {
      ...post,
      title: "Land a $400k job"
    }; 
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "3DIziqg1ZogKAZ6JIgVj"
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "x",
      description: "y",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({...elem.data(), id:elem.id }));
    console.log(posts);
  }

  async function getPostById() {
    const hardCodedId= "3DIziqg1ZogKAZ6JIgVj"
    const postRef = doc(db, "posts", hardCodedId);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(postRef);
  }

  async function getPostByUid () {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")
    );
    const { docs } = await getDocs(collection(db, "posts"));
    console.log(docs);
  }

    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          setUser(user)
        }
      })
    }, []); 

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({ user }) => {
      console.log(user)
      setUser(user)
    })
      .catch((error) => {
        console.log(error);
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
      .catch((error) => {
        
        console.log(error.message);
      })
  }
  
  function logout() {
    signOut(auth);
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {user.email} 
      <button onClick={createPost}>Create Posts</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App; 

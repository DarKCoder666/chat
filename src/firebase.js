import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDRpcjuFEoNTP273cPg5PSJ4yxp8FS5UYg",
  authDomain: "react-chat-c9106.firebaseapp.com",
  databaseURL: "https://react-chat-c9106.firebaseio.com",
  projectId: "react-chat-c9106",
  storageBucket: "react-chat-c9106.appspot.com",
  messagingSenderId: "163038142325",
  appId: "1:163038142325:web:16c54b1812429bf6a17d3c"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
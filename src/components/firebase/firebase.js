import { firebaseConfig } from '../../credentials';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig)

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }


  // *** Auth API ***

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      return error;
      // ...
    });
  }

  signInWithEmailAndPassword = (email, password) => {
    var error = this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      return error
    });
    if (error) {
      return error;
    }
  }

  sendPasswordReset = (email) => {
    var error = this.auth.sendPasswordResetEmail(email).catch(function(error) {
      // An error happened.
      return error;
    });
    if (error) {
      return error;
    }
  }

  googleSignInPopup = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.auth.signInWithPopup(provider)
    .catch(function(error) {
      this.addError(error);
    });
  }

  logout = () => {
    return this.auth.signOut().catch(function(error) {
      // An error happened.
      return error;
    });
  }

  sendPasswordResetEmail = email => {
    return this.auth.sendPasswordResetEmail(email).then(()=>{})
    .catch((error) => {
      return error;
    })
  }

  // *** Firestore API ***

  addTimeslip = (data) => {
    data.uid = this.auth.currentUser.uid;
    if (data.win === "T/T") data.dial = "N/A";
    return this.db.collection("timeslips").add(data);
  }

  updateTimeslip = (data, id) => {
    data.uid = this.auth.currentUser.uid;
    if (data.win === "T/T") data.dial = "N/A";
    return this.db.collection("timeslips").doc(id).update(data);
  }

  getTimeslips = async() => {
    let checked = [];
    var timeslips = await this.db.collection("timeslips").orderBy("date", "desc").orderBy("time", "desc").where("uid", "==", this.auth.currentUser.uid)
    .get()
    .then((results) => {
      return (
        results.docs.map((timeslip, i) => {
          checked[timeslip.id] = false;
          return {
            id: timeslip.id,
            data: timeslip.data(),
          };
        })
      );
    });
    return { timeslips, checked };
  }

  deleteTimeslip = (id) => {
    return this.db.collection("timeslips").doc(id).delete();
  }

  addError = (error) => {
    this.db.collection("errors").add({
      uid: this.auth.currentUser.uid,
      errorM: error.message,
      errorC: error.code,
    })
  }
}

export default Firebase;

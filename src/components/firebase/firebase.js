import { firebaseConfig } from '../../credentials';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)

    this.db = app.firestore();
    this.auth = app.auth();
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
    var error = null;
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      error = error
    });
    if (error) {
      return error;
    }
  }

  logout = () => {
    return this.auth.signOut().catch(function(error) {
      // An error happened.
      return error;
    });
  }



  // *** Firestore API ***

  addTimeslip = (data) => {
    data.uid = this.auth.currentUser.uid;
    return this.db.collection("timeslips").add(data);
  }

  getTimeslips = async() => {
    let checked = [];
    var timeslips = await this.db.collection("timeslips").where("uid", "==", this.auth.currentUser.uid)
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
      errorM: error.code,
    })
  }
}

export default Firebase;

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
    this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      return error;
      // ...
    });
  }

  signInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      return error
    });
  }
  // *** Firestore API ***
  addTimeslip = (data) => {
    return this.db.collection("time-slips").add(data);
  }

  getTimeslips = async() => {
    let checked = [];
    var timeslips = await this.db.collection("time-slips").get().then((results) => {
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
    return this.db.collection("time-slips").doc(id).delete();
  }

  addError = (user, error) => {
    this.db.collection("errors").add({
      user: user,
      error: error,
    })
  }
}

export default Firebase;

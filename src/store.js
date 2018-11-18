import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from '../src/reducers/notifyReducer';

// firebase config data
var firebaseConfig = {
    apiKey: "AIzaSyBlfSeVw7eM13Qe1Yaob7zcHjiD8hHoD8M",
    authDomain: "ankishandarbetencom.firebaseapp.com",
    databaseURL: "https://ankishandarbetencom.firebaseio.com",
    projectId: "ankishandarbetencom",
    storageBucket: "ankishandarbetencom.appspot.com",
    messagingSenderId: "597698855579"
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
};

// init firebase inst
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};

const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase)
		// window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// 	window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;

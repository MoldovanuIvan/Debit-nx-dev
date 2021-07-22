import React, {createContext, Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './translation/i18n'
/*
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAnWSJ6TdDPg506sIgwCEIqPMfUmjbMVZI",
  authDomain: "transaction-f36c9.firebaseapp.com",
  projectId: "transaction-f36c9",
  storageBucket: "transaction-f36c9.appspot.com",
  messagingSenderId: "21710084418",
  appId: "1:21710084418:web:be7cd22a4cc0f69cec90db",
  measurementId: "G-K9P923FCZN"
};
*/

/*firebase.initializeApp(firebaseConfig);*/

/*export const Context = createContext(null)*/

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      {/*<Context.Provider value={{firebase}}>*/}
        <App/>
{/*      </Context.Provider>*/}
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);


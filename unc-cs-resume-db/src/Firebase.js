import firebase from 'firebase';
import * as config from './config.json';
 
export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
  }
}
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import config from "../env/config";

admin.initializeApp({
  credential: admin.credential.cert(config)
})

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  const result = admin.firestore().collection("members").get();

  result.then((docRef) => {
    //console.log("Document written with ID: ", docRef);
    docRef.forEach((doc) => {
      console.log("Document data: ", doc.data());
    })
  }).catch((error) => {
    console.error("Error adding document: ", error);
  })

  response.send("Hello from Firebase! now what?");
});

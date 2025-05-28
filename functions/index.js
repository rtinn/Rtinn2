/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// Initialiser Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

exports.incrementVisit = onRequest(async (request, response) => {
  // Ajouter les en-têtes CORS
  response.set('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines (utilisez une origine spécifique en production, ex: 'https://rtinn.netlify.app')
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer les requêtes OPTIONS (pré-vol CORS)
  if (request.method === 'OPTIONS') {
    response.status(204).send();
    return;
  }

  try {
    const counterRef = db.collection("visits").doc("counter");
    await counterRef.update({
      count: admin.firestore.FieldValue.increment(1)
    });
    logger.info("Visit counter incremented", {structuredData: true});
    response.status(200).send("Visit counter incremented");
  } catch (error) {
    logger.error("Error incrementing counter:", error);
    response.status(500).send("Error incrementing counter");
  }
});
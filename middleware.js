import admin from "firebase-admin";
export const checkAuth = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) next();
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (e) {
    console.error("Error verifying token:", e);
    res.status(401).send("Unauthorized");
  }
};

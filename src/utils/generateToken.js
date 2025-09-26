import jwt from "jsonwebtoken";

export function generateToken(user) {
  try {

    const token = jwt.sign(
      { _id: user._id,role: user.role }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" } 
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
}

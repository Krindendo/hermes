import crypto from "crypto";
import bcrypt from "bcrypt";

async function hashPin(pin: string) {
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the pin with the salt
    const hashedPin = await bcrypt.hash(pin, salt);

    return hashedPin as string;
  } catch (error) {
    // Handle error
    console.error("Error hashing pin:", error);
    throw error;
  }
}

function generateSecurityStamp() {
  return crypto.randomBytes(32).toString("hex");
}

export { hashPin, generateSecurityStamp };

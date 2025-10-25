import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // standard and secure

// Hashes a plain password before saving
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
}

// Compares a plain password to a hashed one
export async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error("Password comparison failed");
  }
}
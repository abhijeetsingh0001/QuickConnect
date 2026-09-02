import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";
import { users } from "../../src/db/schema.ts";
import { eq, ne } from "drizzle-orm";

export const register = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password do not match" });
    }
    
    const existingUser = await db.select().from(users).where(eq(users.username, username));
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let profilePhoto = `https://robohash.org/${username}.png?set=set2`;
    try {
      const faceRes = await fetch(`https://randomuser.me/api/?gender=${gender === 'male' ? 'male' : 'female'}`);
      const faceJson = await faceRes.json();
      if (faceJson.results && faceJson.results.length > 0) {
        profilePhoto = faceJson.results[0].picture.large;
      }
    } catch (err) {
      console.error("Error fetching avatar:", err);
    }
    
    await db.insert(users).values({
      fullName, 
      username, 
      password: hashedPassword, 
      profilePhoto, 
      gender 
    });
    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    return next(error);
  }
}

export const login = async (req, resp, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return resp.status(400).json({ message: "Username and password are required" });
    };
    
    const userResult = await db.select().from(users).where(eq(users.username, username));
    const user = userResult[0];
    if (!user) {
      return resp.status(400).json({ message: "Invalid username or password", success: false })
    };
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp.status(400).json({ message: "Invalid username or password", success: false })
    };
    
    const tokenData = {
      userId: user.id,
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET || 'secret', { expiresIn: "1d" });
    return resp.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none", secure: true }).json({
      _id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto,
    })
  } catch (error) {
    return next(error);
  }
}

export const logout = async (req, res, next) => {
  try {
    if (req.id) {
      await db.update(users).set({ lastActive: new Date() }).where(eq(users.id, req.id));
    }
    return res.status(200).cookie("token", "", { maxAge: 0, sameSite: "none", secure: true }).json({ message: "Logout successfully" });
  } catch (error) {
    return next(error);
  }
}
export const getOtherUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.id;
    const otherUsersList = await db.select({
      id: users.id,
      _id: users.id,
      username: users.username,
      fullName: users.fullName,
      profilePhoto: users.profilePhoto,
      gender: users.gender,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastActive: users.lastActive
    }).from(users).where(ne(users.id, loggedInUserId));
    
    return res.status(200).json({ otherUsers: otherUsersList });
  } catch (error) {
    return next(error);
  }
}

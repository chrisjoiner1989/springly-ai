import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Verify JWT token
export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch (error) {
    return null;
  }
}

// Extract token from request headers
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

// Get user from request
export function getUserFromRequest(request: NextRequest): User | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  return {
    id: decoded.userId,
    email: decoded.email,
    name: decoded.email.split("@")[0], // Simple name extraction
  };
}

// Middleware helper for protected routes
export function requireAuth(
  handler: (request: NextRequest, user: User) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return handler(request, user);
  };
}

// Password hashing (you should use bcrypt in production)
export function hashPassword(password: string): string {
  // This is a simple hash - use bcrypt in production
  return Buffer.from(password).toString("base64");
}

// Password verification
export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  return hashPassword(password) === hashedPassword;
}

// Generate secure random string
export function generateSecureToken(length: number = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  private readonly jwtSecret = process.env.JWT_SECRET;

  // Hash the password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  // Validate the password
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  createToken(userId: string): string {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: "1d" });
  }
}

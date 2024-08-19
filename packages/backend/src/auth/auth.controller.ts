import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.dto";
import { Response } from "express";
import { C_COOKIE_KEY } from "src/config/constants";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await this.userService.create({ ...createUserDto, password: hashedPassword, image: image });
    // console.log({ user: newUser });
    const token = this.authService.createToken(newUser._id.toString());

    res.cookie(C_COOKIE_KEY, token, {
      maxAge: 1000 * 60 * 60 * 24, //1d in MS,
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });

    return res.status(201).json({ success: true, user: { ...newUser, password: "" }, token });
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const loggedInUser = await this.userService.login(loginUserDto);
    const token = this.authService.createToken(loggedInUser._id.toString());

    res.cookie(C_COOKIE_KEY, token, {
      maxAge: 1000 * 60 * 60 * 24, //1d in MS,
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });

    return res.status(200).json({ success: true, user: { ...loggedInUser, password: "" }, token });
  }

  @Post("logout")
  async logout(@Res() res: Response) {
    res.clearCookie(C_COOKIE_KEY);
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}

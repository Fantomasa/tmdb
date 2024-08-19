import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto, LoginUserDto } from "./user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    //console.log(createUserDto);
    if (await this.userModel.findOne({ email: createUserDto.email })) {
      throw new BadRequestException("Email already exists");
    }

    if (await this.userModel.findOne({ username: createUserDto.username })) {
      throw new BadRequestException("Username already exists");
    }

    const user = new this.userModel(createUserDto);
    const savedUser = await user.save();

    return savedUser.toObject();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException("Invalid credentials");
    }

    return user.toObject();
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });

    if (!user) throw new NotFoundException("User not found");

    return user;
  }
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, unique: true, length: { min: 6, max: 20 } })
  password: string;

  @Prop({ type: String, default: "" })
  image: string;

  @Prop({ type: Array, default: [] })
  searchHistory: [];
}

export const UserSchema = SchemaFactory.createForClass(User);

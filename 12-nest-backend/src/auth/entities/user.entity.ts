import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  // _id: string; Lo coloca mongo automáticamente

  _id?: string; //Para indicar a ts que existe

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ minlength: 6, required: true })
  password?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: ["user"] }) // ['user', 'admin']
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

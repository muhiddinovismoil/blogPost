import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostsDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  user_id: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  slug: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

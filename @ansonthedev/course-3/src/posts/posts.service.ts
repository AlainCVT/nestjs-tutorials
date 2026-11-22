import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';
import { CreatePostDTO } from './dto/CreatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(createPostDTO: CreatePostDTO) {
    const { userId, ..._createPostDTO } = createPostDTO;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = new this.postModel({ ..._createPostDTO, user: userId });
    const savedPost = await newPost.save();

    await user.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });

    return savedPost;
  }
}

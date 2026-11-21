import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/models/article.model';
import { Node } from 'src/pagination/models/node.model';
import { User } from 'src/user/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class Comment extends Node {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  author: User;

  @RelationId((self: Comment) => self.author)
  readonly auhtorId: User['id'];

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @RelationId((self: Comment) => self.article)
  readonly articleId: Article['id'];

  @Field()
  @Column()
  message: string;
}

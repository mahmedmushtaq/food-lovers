import { Field, ObjectType, ID, Int } from "type-graphql";
import { Base } from "./Base";
import { User } from "./User";
import { Column, JoinColumn, ManyToOne } from "typeorm";

@ObjectType({ description: "Restaurant Schema" })
export class Restaurant extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  contact: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  main_img: string;

  @Field((type) => Int)
  @Column()
  rating: number;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field({ nullable: true })
  @Column()
  website?: string;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.restaurants, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}

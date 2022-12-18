import { Field, ObjectType, ID, Int } from "type-graphql";
import { Base } from "./Base";
import { User } from "./User";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { RestaurantImagesEntity } from "../../database/entities/RestaurantImagesEntity";

@ObjectType({ description: "Restaurant Schema" })
@Entity()
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
  mainImg: string;

  @Field((type) => Int)
  @Column()
  rating: number;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field({ nullable: true })
  @Column()
  website?: string;

  //   @Field()
  //   @OneToMany(
  //     () => RestaurantImagesEntity,
  //     (restaurantImages) => restaurantImages.restaurant
  //   )
  //   images: RestaurantImagesEntity[];

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.restaurants, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}

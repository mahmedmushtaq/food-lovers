import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./BaseEntity";
import { RestaurantImagesEntity } from "./RestaurantImagesEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "restaurant" })
export class RestaurantEntity extends Base {
  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  contact: string;

  @Column()
  city: string;

  @Column()
  main_img: string;

  @Column({ type: "numeric", default: 0 })
  rating: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  website?: string;

  @OneToMany(
    () => RestaurantImagesEntity,
    (restaurantImages) => restaurantImages.restaurant
  )
  images: RestaurantImagesEntity[];

  @ManyToOne(() => UserEntity, (user) => user.restaurants, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

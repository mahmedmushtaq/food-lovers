import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./BaseEntity";
import { RestaurantEntity } from "./RestaurantEntity";

@Entity("restaurant_images")
export class RestaurantImagesEntity extends Base {
  @Column()
  src: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.images)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: RestaurantEntity;
}

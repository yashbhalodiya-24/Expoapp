export { default } from "./StarCoffee";
import { products } from "./Model";
import { cards } from "../../Component/Cards";

export const assets = products
  .map((product) => product.picture)
  .concat(cards.map((card) => card.picture));

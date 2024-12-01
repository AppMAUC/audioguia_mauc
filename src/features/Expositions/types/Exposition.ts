import Image from "../../../types/Image";
import { ArtWork } from "../../ArtWorks/types/ArtWork";

export interface Exposition {
  image: Image;
  _id: string;
  title: string;
  type: number; // 1 = Permanent , 2 = Temporal
  description: string;
  artWorks: string[] | ArtWork[];
  place: string;
  dateStarts: string;
  dateEnds: string;
  archived: boolean;
}

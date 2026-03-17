import Image from "../../../types/Image";
import { ArtWork } from "../../ArtWorks/types/ArtWork";

export interface Exposition {
  image: Image;
  _id: string;
  title: string;
  title_en?: string;
  type: number; // 1 = Permanent , 2 = Temporal
  description: string;
  description_en?: string;
  artWorks: string[] | ArtWork[];
  place: string;
  place_en?: string;
  dateStarts: string;
  dateEnds: string;
  archived: boolean;
}

import Image from "../../../types/Image";
import Audio from "../../../types/Audio";

export interface ArtWork {
  image: Image;
  _id: string;
  title: string;
  description: string;
  audioDesc: Audio[];
  audioGuia: Audio[];
  author: string;
  suport: string;
  year: string;
  dimension: string;
  archived: boolean;
}
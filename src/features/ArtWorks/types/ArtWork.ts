import Image from "../../../types/Image";
import Audio from "../../../types/Audio";

export interface ArtWork {
  image: Image;
  _id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  audioDesc: Audio[];
  audioGuia: Audio[];
  author: string;
  suport: string;
  suport_en?: string;
  year: string;
  dimension: string;
  archived: boolean;
}
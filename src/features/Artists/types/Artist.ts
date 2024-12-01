import Image from "../../../types/Image";
import Audio from "../../../types/Audio";
import { ArtWork } from "../../ArtWorks/types/ArtWork";

export interface Artist {
  image: Image;
  _id: string;
  name: string;
  artWorks: string[] | ArtWork[];
  biography: string;
  audioGuia: Audio[];
  birthDate: string;
}

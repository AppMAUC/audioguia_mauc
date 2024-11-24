import Image from "../../../types/Image";
import Audio from "../../../types/Audio";

export interface Artist {
  image: Image;
  _id: string;
  name: string;
  artWorks: any[];
  biography: string;
  audioGuia: Audio[];
  birthDate: string;
}

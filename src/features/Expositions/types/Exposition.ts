import Image from "../../../types/Image";

export interface Exposition {
  image: Image;
  _id: string;
  title: string;
  type: number; // 1 = Permanent , 2 = Temporal
  description: string;
  artWorks: any[];
  place: string;
  dateStarts: string;
  dateEnds: string;
  archived: boolean;
}

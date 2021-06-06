export type Estate = {
  id: number;
  name: string;
  locality: string;
  price: number;
  thumbnails: string[];
  images: string[];
  description: string;
  highlights: { type: string; name: string; value: unknown }[];
};

export type EstateDBRecord = {
  id: number;
  status: string;
  note: string;
  data: string;
};

export type EstateDTO = {
  id: number;
  status: string;
  note: string;
  data: Estate;
};

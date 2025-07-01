export type EventDTO = {
  idEvent: number;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  location: string | null;
  createdAt: Date;
  idUser: string;
};

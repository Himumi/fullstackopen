import { NewDiaryEntry, NewEntrySchema } from "./types";

const toNewDiaryEntry = (body: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(body);
};

export default toNewDiaryEntry;

import { User } from "../types/user.types";

export const testUser: User = {
  username: "shish",
  email: "shishwow@test.com",
  password: "passwordKo12345",
};
export const duplicateUsername: User = {
  username: "dupe",
  email: "testing@test.com",
  password: "passwordKo123456",
};
export const duplicateEmail: User = {
  username: "test2",
  email: "momomom@test.com",
  password: "passwordKo1234567",
};
export const testDeck = {
  deckName: "testDeck",
  color: "red",
};
export const testFlashcard = {
  front: "testFront",
  back: "testBack",
};
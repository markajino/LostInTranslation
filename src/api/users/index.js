import axios from "axios";
import { API_KEY, API_ROUTES } from "../routes";

export class User {
  static async createUser(username) {
    return await axios.post(
      API_ROUTES.translation,
      {
        username,
        translations: [],
      },
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  }
}

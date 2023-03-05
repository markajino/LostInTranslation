import axios from "axios";
import { API_KEY, API_ROUTES } from "../routes";

export class Translation {
  static async getAllTranslations() {
    return await axios.get(API_ROUTES.translation);
  }

  static async getUserTranslations(username) {
    return await axios.get(`${API_ROUTES.translation}?username=${username}`);
  }

  static async createUserTranslations(userId, translations) {
    return await axios.patch(
      `${API_ROUTES.translation}/${userId}`,
      {
        translations,
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

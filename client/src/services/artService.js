import httpService from "./httpService";

import { apiUrl } from "../config.json";

export function publishArt(art) {
  return httpService.post(`${apiUrl}/arts`, art);
}

export function getArt(artId) {
  return httpService.get(`${apiUrl}/arts/${artId}`);
}

export function editArt(art) {
  const artId = art._id;
  delete art._id;
  return httpService.put(`${apiUrl}/arts/${artId}`, art);
}

export function getPublic() {
  return httpService.get(`${apiUrl}/arts/public`);
}

export function getMyArt() {
  return httpService.get(`${apiUrl}/arts/user-gallery`);
}

export function deleteArt(art) {
  const artId = art._id;
  return httpService.delete(`${apiUrl}/arts/${artId}`, art);
}

export default {
  publishArt: publishArt,
  getMyArt: getMyArt,
  getArt: getArt,
  editArt: editArt,
  getPublic: getPublic,
  deleteArt: deleteArt,
};

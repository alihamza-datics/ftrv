import http from '../service/http';
import { APIS } from '../utils/constants';
import { insertParams } from '../utils/helper';

const {
  LOGIN,
  FILE_UPLOAD,
  USERS,
  USERS_LIST,
  USERS_DELETE,
  RETRIEVE_LINKS,
  CREATE_LINK,
  GET_LINK,
  UPDATE_LINK,
  DELETE_LINK,
  QUOTE,
  BIRTHDAYS,
  ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  ANNOUNCEMENT_DELETE,
  CREATE_EVENT,
  EVENTS,
  DELETE_EVENTS,
} = APIS;

// USER CRUD

export const fetchUsers = ({ queryKey }) => {
  let url;
  if (queryKey[1].query) {
    url = `${`${USERS_LIST}?pageSize=1000&${insertParams(queryKey[1].query)}`}`;
  } else if (queryKey[1].filters) {
    url = `${USERS_LIST}?pageSize=1000&${insertParams(queryKey[1].filters)}`;
  } else {
    url = USERS_LIST;
  }
  return http.get(url);
};

export const deleteUser = (payload) =>
  http.delete(USERS_DELETE, { data: { ids: payload } });

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const updateUser = (payload) => {
  const { id, updatedData } = payload;
  return http.put(`${USERS}/${id}`, updatedData);
};

export const getUserById = (id) => http.get(`${USERS}/${id}`);

export const getQuote = () => http.get(`${QUOTE}`);

export const getBirthdays = () => http.get(`${BIRTHDAYS}`);

export const saveQuote = (payload) => http.put(`${QUOTE}`, payload);

export const uploadEmployeeFile = (payload) => http.post(FILE_UPLOAD, payload);

export const createUser = (payload) => http.post(USERS, payload);

export const login = (payload) => http.post(LOGIN, payload);

// USEFUL LINKS CRUD

export const fetchLinks = () => http.get(`${RETRIEVE_LINKS}?pageSize=1000&`);

export const createLink = (payload) => http.post(CREATE_LINK, payload);

export const getLinkById = (id) => http.get(`${GET_LINK}/${id}`);

export const updateLink = (payload) =>
  http.put(`${UPDATE_LINK}/${payload.id}`, payload);

export const deleteLink = (payload) =>
  http.delete(DELETE_LINK, { data: { ids: payload } });
export const createAnnouncement = (payload) => http.post(ANNOUNCEMENT, payload);

export const retrieveActiveAnnouncements = () =>
  http.get(`${GET_ANNOUNCEMENTS}`);

export const retrieveAnnouncements = () =>
  http.get(`${ANNOUNCEMENT}?pageSize=1000&`);

export const retrieveAnnouncementById = (id) =>
  http.get(`${ANNOUNCEMENT}/${id}`);

export const updateAnnouncement = (payload) =>
  http.put(`${ANNOUNCEMENT}/${payload.id}`, payload);

export const deleteAnnouncement = (payload) =>
  http.delete(ANNOUNCEMENT_DELETE, { data: { ids: payload } });

export const retrieveAnnouncement = () => http.get(`${GET_ANNOUNCEMENTS}`);

// EVENTS CRUD

export const createEvent = (payload) => http.post(CREATE_EVENT, payload);

export const fetchEvents = () => http.get(`${EVENTS}?pageSize=1000&`);

export const deleteEvents = (payload) =>
  http.delete(DELETE_EVENTS, { data: { ids: payload } });

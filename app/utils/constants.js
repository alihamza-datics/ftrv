export const STYLE_CONSTANTS = {
  HEADER_WIDTH: '5rem',
  menuWidth: '5rem',
};

export const FILE_ACCEPT_TYPES = {
  imageFiles: 'image/x-png,image/jpeg,image/jpg',
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];
export const LOCAL_STORAGE_ENTRIES = { user: 'user' };
export const MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS = 10; // Mb
export const MIN_UPLOADABLE_FILE_SIZE_IN_MBS = 0; // Mb
export const MAX_UPLOADABLE_FILE_SIZE_IN_MBS = 10; // Mb
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
export const ANNOUNCEMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const APIS = {
  LOGIN: 'users/login',
  USERS_LIST: '/users',
  USERS_DELETE: '/users/deleteUsers',
  USERS: '/users',
  BIRTHDAYS: '/users/birthday',
  QUOTE: '/quote',
  FILE_UPLOAD: 'users/upload',
  RETRIEVE_LINKS: '/usefulLinks',
  CREATE_LINK: '/usefulLinks',
  GET_LINK: '/usefulLinks',
  UPDATE_LINK: '/usefulLinks',
  DELETE_LINK: '/usefulLinks/deleteLinks',
  ANNOUNCEMENT: '/announcements',
  ANNOUNCEMENT_DELETE: '/announcements/deleteAnnouncements',
  GET_ANNOUNCEMENTS: '/announcements/userAnnouncements',
  CREATE_EVENT: '/events',
  EVENTS: '/events',
  DELETE_EVENTS: '/events',
};

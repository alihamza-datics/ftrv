import addUsefulLink from '../containers/addUsefulLink/loadable';
import addCeoMessage from '../containers/addCeoMessage/loadable';
import CreateUser from '../containers/createUser/loadable';
import Directory from '../containers/directory/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';
import EditUser from '../containers/editUser/loadable';
import Announcement from '../containers/announcement/loadable';
import CreateAnnouncement from '../containers/createAnnouncement/loadable';
import EditAnnouncement from '../containers/editAnnouncement/loadable';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import Quote from '../containers/qoute/loadable';
import usefulLinks from '../containers/usefulLinks/loadable';
import UserProfile from '../containers/userProfile/loadable';
import CeoMessage from '../containers/ceoMessage/loadable';
import Events from '../containers/events/loadable';
import { ROLES } from '../utils/constants';
import createEvent from '../containers/createEvent/loadable';

const routeTypes = { public: 'public', private: 'private' };
export const routeArray = [
  {
    path: '/',
    component: Login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: '/directory',
    component: Directory,
    exact: true,
    breadCrumbKey: 'Directory',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/upload',
        component: DirectoryImporter,
        exact: true,
        breadCrumbKey: 'Upload Directory',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: `/add`,
        component: CreateUser,
        exact: true,
        breadCrumbKey: 'Create User',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: EditUser,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },

  {
    path: '/quote',
    component: Quote,
    exact: true,
    breadCrumbKey: 'Daily Quote',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN],
  },
  {
    path: '/profile',
    component: UserProfile,
    exact: true,
    breadCrumbKey: 'My Profile',
    routeType: routeTypes.private,
  },
  {
    path: '/useful-links',
    component: usefulLinks,
    exact: true,
    breadCrumbKey: 'Useful Links',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: addUsefulLink,
        exact: true,
        breadCrumbKey: 'Add New Link',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: addUsefulLink,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Link',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/ceo-message',
    component: CeoMessage,
    exact: true,
    breadCrumbKey: 'Ceo Message',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/edit',
        component: addCeoMessage,
        exact: true,
        breadCrumbKey: 'Edit Ceo Message',
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    path: '/announcement',
    component: Announcement,
    exact: true,
    breadCrumbKey: 'Announcement',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: `/add`,
        component: CreateAnnouncement,
        exact: true,
        breadCrumbKey: 'Create Announcement',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: EditAnnouncement,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit Announcement',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    path: '/events',
    component: Events,
    exact: true,
    breadCrumbKey: 'Events',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createEvent,
        exact: true,
        breadCrumbKey: 'Create New Event',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: createEvent,
        exact: true,
        breadCrumbKey: 'Edit Event',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN, ROLES.USER],
      },
    ],
  },
];

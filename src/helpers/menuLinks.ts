import { PATHS } from './paths';
import { Roles } from '@/utils/types';

export interface MenuLink {
  label: string;
  section?: string;
  link?: string;
  scrollDuration?: number;
}

export const baseMenuLinks = [
  {
    label: 'Schedule',
    link: PATHS.landing,
    section: 'schedule-section',
    scrollDuration: 500
  },
  {
    label: 'Get a Quote',
    link: PATHS.quoteRequest
  },
  {
    label: 'Gallery',
    link: PATHS.gallery
  },
  {
    label: 'Services',
    link: PATHS.services
  },
  {
    label: 'Instructions',
    link: PATHS.instructions
  },
  {
    label: 'Testimonials',
    link: PATHS.landing,
    section: 'testimonials-section',
    scrollDuration: 500
  },
  {
    label: 'About Us',
    link: PATHS.landing,
    section: 'about-us-section',
    scrollDuration: 1000
  },
  {
    label: 'Contact Us',
    link: PATHS.landing,
    section: 'contact-us-section',
    scrollDuration: 1500
  }
];

export const editScheduleMenuLink = {
  label: 'Edit Schedule',
  link: PATHS.scheduleManagement
};

export const usersListMenuLink = {
  label: 'Users Requests',
  link: PATHS.usersRequests
};

export const adminMenuLinks = [
  baseMenuLinks[0],
  editScheduleMenuLink,
  baseMenuLinks[1],
  usersListMenuLink,
  ...baseMenuLinks.slice(2)
];

export const getMenuLinksForRole = (role: Roles = Roles.User) => {
  console.log('getMenuLinksForRole().  role: ', role);
  if (role === Roles.Admin) {
    return adminMenuLinks;
  } else {
    return baseMenuLinks;
  }
};

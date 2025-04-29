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

export const adminSectionMenuLink = {
  label: 'Admin',
  link: PATHS.admin
};

export const adminMenuLinks = [baseMenuLinks[0], adminSectionMenuLink, ...baseMenuLinks.slice(1)];

export const getMenuLinksForRole = (role: Roles = Roles.User) => {
  if (role === Roles.Admin) {
    return adminMenuLinks;
  } else {
    return baseMenuLinks;
  }
};

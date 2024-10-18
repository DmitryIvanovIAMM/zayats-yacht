import { PATHS } from "../helpers/paths";

export const menuLinks = [
  {
    label: "Schedule",
    sectionName: "schedulesSection",
    scrollDuration: 500,
  },
  {
    label: "Get a Quote",
    link: PATHS.quoteRequest,
  },
  {
    label: "Gallery",
    link: PATHS.gallery,
  },
  {
    label: "Services",
    link: PATHS.services,
  },
  {
    label: "Instructions",
    link: PATHS.instructions,
  },
  {
    label: "Testimonials",
    sectionName: "testimonials",
    scrollDuration: 500,
  },
  {
    label: "About Us",
    sectionName: "aboutUsSection",
    scrollDuration: 1000,
  },
  {
    label: "Contact Us",
    sectionName: "contactsSection",
    scrollDuration: 1500,
  },
];

export const editScheduleMenuLinks = [
  {
    label: "Home",
    link: "/",
    sectionName: "quoteRequestSection",
    scrollDuration: 500,
  },
];

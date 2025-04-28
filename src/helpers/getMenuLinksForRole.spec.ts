import { Roles } from '@/utils/types';
import { baseMenuLinks, adminMenuLinks, getMenuLinksForRole } from '@/helpers/menuLinks';

describe('getMenuLinksForRole', () => {
  it('should return the base menu links for a user', () => {
    const role = Roles.User;

    const menuLinksForUser = getMenuLinksForRole(role);
    expect(menuLinksForUser).toEqual(baseMenuLinks);
  });

  it('should return the correct menu links for an admin', () => {
    const role = Roles.Admin;
    const menuLinksForAdmin = getMenuLinksForRole(role);
    expect(menuLinksForAdmin).toEqual(adminMenuLinks);
  });
});

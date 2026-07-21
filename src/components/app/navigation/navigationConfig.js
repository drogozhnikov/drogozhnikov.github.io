import {admins} from "@/components/app/navigation/menu/admins.js";
import {monitors} from "@/components/app/navigation/menu/monitors.js";
import {reports} from "@/components/app/navigation/menu/reports.js";
import {getAuthUser} from "@/stores/user.js";
import {special} from "@/components/app/navigation/menu/special.js";

const rawMenu = [
  { title: 'Домой', icon: 'home', target: '/home' },

  reports,
  monitors,
  admins,
  special,

  { title: 'О приложении', icon: 'about', target: '/home' },
]

export function getNavigationItems() {
  const user = getAuthUser();

  const roleCodes = (user?.rolePermissions || []).map(p => p.code);
  const directCodes = (user?.directPermissions || []).map(p => p.code);

  const userPermissions = new Set([...roleCodes, ...directCodes]);

  const filterMenu = (items) => {
    return items
      .map(item => {
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterMenu(item.children);
          return { ...item, children: filteredChildren };
        }
        return item;
      })
      .filter(item => {
        if (item.permissionCode) {
          return userPermissions.has(item.permissionCode);
        }
        if (item.children) {
          return item.children.length > 0;
        }
        return true;
      });
  };

  return filterMenu(rawMenu);
}

export function getUserMenuItems(){
  return rawMenu.slice(1, -1);
}

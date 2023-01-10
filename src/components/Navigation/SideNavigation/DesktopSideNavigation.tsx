import { SideNavButton } from "../Buttons/SideNavButton";

export const DesktopSideNavigation = () => {
  return (
    <nav className="mt-5 flex-1 space-y-1 px-2">
      <SideNavButton name="Servers" />
      <SideNavButton name="Staff" />
      <SideNavButton name="Projects" />
      <SideNavButton name="Documents" />
      <SideNavButton name="Calendar" />
    </nav>
  );
};

export default DesktopSideNavigation;

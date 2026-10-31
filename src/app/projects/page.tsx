import ResponsiveTree from "../../components/ResponsiveTree";
import ProjectsDesktop from "./ProjectsDesktop";
import ProjectsMobile from "./ProjectsMobile";

/**
 * Server renders the desktop tree so crawlers and no-JS visitors get real
 * content; ResponsiveTree swaps to the mobile tree after mount at <=1024px.
 */
export default function projectsPage() {
  return (
    <ResponsiveTree
      desktop={<ProjectsDesktop />}
      mobile={<ProjectsMobile />}
    />
  );
}

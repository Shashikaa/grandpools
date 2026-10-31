import ResponsiveTree from "../../components/ResponsiveTree";
import AboutDesktop from "./AboutDesktop";
import AboutMobile from "./AboutMobile";

/**
 * Server renders the desktop tree so crawlers and no-JS visitors get real
 * content; ResponsiveTree swaps to the mobile tree after mount at <=1024px.
 */
export default function aboutPage() {
  return (
    <ResponsiveTree
      desktop={<AboutDesktop />}
      mobile={<AboutMobile />}
    />
  );
}

import ResponsiveTree from "../../components/ResponsiveTree";
import ServiceDesktop from "./ServiceDesktop";
import ServiceMobile from "./ServiceMobile";

/**
 * Server renders the desktop tree so crawlers and no-JS visitors get real
 * content; ResponsiveTree swaps to the mobile tree after mount at <=1024px.
 */
export default function servicesPage() {
  return (
    <ResponsiveTree
      desktop={<ServiceDesktop />}
      mobile={<ServiceMobile />}
    />
  );
}

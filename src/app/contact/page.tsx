import ResponsiveTree from "../../components/ResponsiveTree";
import ContactDesktop from "./ContactDesktop";
import ContactMobile from "./ContactMobile";

/**
 * Server renders the desktop tree so crawlers and no-JS visitors get real
 * content; ResponsiveTree swaps to the mobile tree after mount at <=1024px.
 */
export default function contactPage() {
  return (
    <ResponsiveTree
      desktop={<ContactDesktop />}
      mobile={<ContactMobile />}
    />
  );
}

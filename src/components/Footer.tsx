"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useSite } from "../app/context/SiteContext"; 

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:admin@grandpools.com.au", src: "/email.svg", size: 24 },
  { label: "Instagram", href: "https://www.instagram.com/grandpools_aus/", src: "/ig.svg", size: 27 },
];

const MAIN_NAV = [
  { item: "Home", href: "/" },
  { item: "About Us", href: "/about" },
  { item: "Services", href: "/services" },
  { item: "Projects", href: "/projects" },
  { item: "Contact Us", href: "/contact" },
];

const SERVICES_NAV = [
  { item: "Residential Pools Construction", href: "/services/residential-pools-construction" },
  { item: "Pool Equipment & Installation", href: "/services/pool-equipment-and-installation" },
  { item: "Commercial Pool Construction", href: "/services/commercial-pool-construction" },
];

export default function Footer() {
  const { smootherRef } = useSite();
  const pathname = usePathname();

  // Force full reload if user clicks logo while already on the home page
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        zIndex: 20,
        boxSizing: "border-box",
      }}
    >
      <style jsx global>{`
        @media (max-width: 1023px) {
          .responsive-row-1 {
            justify-content: center !important;
          }
          .responsive-row-2 {
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
            margin-bottom: 24px !important;
          }
          .responsive-links-container {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 0px !important;
          }
          .responsive-socials-container {
            width: 100% !important;
            align-items: center !important;
            margin-left: 0 !important;
            gap: 0px !important;
          }
          .desktop-only-contacts {
            display: none !important;
          }
          .mobile-only-row-4 {
            display: flex !important;
          }
          .desktop-only-row-4 {
            display: none !important;
          }
          .responsive-bottom-row {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .responsive-attribution {
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .responsive-attribution span {
            width: auto !important;
            text-align: left !important;
          }
        }

        @media (max-width: 767px) {
          .responsive-attribution {
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 16px !important;
          }
          .responsive-attribution span {
            width: 100% !important;
            text-align: center !important;
          }
          .mobile-copy-text {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      <div 
        className="!px-[20px] md:!px-[30px] !pb-[20px] md:!pb-[20px] !pt-[30px] md:!pt-[40px] shadow-2xl overflow-hidden font-light"
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #162D24 0%, #094146 100%)",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          isolation: "isolate",
          fontWeight: 300,
        }}
      >
        {/* ROW 1: Logo */}
        <div
          className="responsive-row-1"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            marginBottom: 30,
            position: "relative",
            zIndex: 20,
          }}
        >
          <Link 
            href="/" 
            onClick={handleLogoClick}
            style={{ 
              display: "block", 
              width: "100%", 
              maxWidth: "380px",
              position: "relative",
              zIndex: 20,
            }}
          >
            <img
              src="/Footer.svg"
              alt="Grand Pools"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            />
          </Link>
        </div>

        {/* ROW 2: Link Column Grid */}
        <div
          className="responsive-row-2"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
            marginBottom: 48,
          }}
        >
          {/* Navigation Links */}
          <div 
            className="responsive-links-container flex flex-row justify-between lg:w-[60%] !text-[14px] md:!text-[16px]" 
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* Col 1 — Main Nav */}
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              {MAIN_NAV.map(({ item, href }) => (
                <Link
                  key={item}
                  href={href}
                  style={{
                    color: "#F4EBE4",
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    transition: "opacity 0.2s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Col 2 — Services Nav */}
            <nav className="flex flex-col !items-end lg:!items-start gap-3">
              {SERVICES_NAV.map(({ item, href }) => (
                <Link
                  key={item}
                  href={href}
                  style={{
                    color: "#F4EBE4",
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    transition: "opacity 0.2s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Social Icons */}
          <div className="responsive-socials-container" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 12 }}>
              {SOCIAL_LINKS.map(({ label, href, src, size }) => (
                <SocialLink key={label} href={href} label={label} src={src} size={size} />
              ))}
            </div>
          </div>
        </div>

        {/* Glass Divider Line */}
        <div
          style={{ height: "1px", background: "rgba(244, 235, 228, 0.2)", marginBottom: 20 }}
          className="w-full"
        />

        {/* ROW 3: Bottom Row */}
        <div
          className="responsive-bottom-row !text-[14px] md:!text-[16px]"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Mobile Split Layout */}
          <div className="mobile-only-row-4" style={{ display: "none", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <BottomLink href="/terms-of-use">Terms of Use</BottomLink>
            <BottomLink href="/privacy-policy">Privacy Policy</BottomLink>
          </div>

          {/* Desktop Copyright */}
          <span className="desktop-only-row-4" style={{ color: "#F4EBE4", fontFamily: "var(--font-display)", fontWeight: 300 }}>
            © 2026 Grand Pools. All Rights Reserved.
          </span>

          {/* Desktop Links */}
          <div className="desktop-only-row-4 !text-[14px] md:!text-[16px]" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <BottomLink href="/terms-of-use">Terms of Use</BottomLink>
            <BottomLink href="/privacy-policy">Privacy Policy</BottomLink>
          </div>

          {/* Desktop Attribution */}
          <div className="responsive-attribution !text-[14px] md:!text-[16px]">
            <span style={{ color: "#F4EBE4", fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Design &amp; Development by{" "}
              <a
                href="https://tactik.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F4EBE4", textDecoration: "none", fontWeight: 300, opacity: 1, transition: "opacity 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Tactik.
              </a>
            </span>

            <span className="mobile-only-row-4 mobile-copy-text !text-[14px] md:!text-[16px] !text-center" style={{ display: "none", color: "#F4EBE4", fontFamily: "var(--font-display)", fontWeight: 300 }}>
              © 2026 Grand Pools. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, src, size = 24 }: { href: string; label: string; src: string; size?: number }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        textDecoration: "none",
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </a>
  );
}

function BottomLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: "#F4EBE4",
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        textDecoration: "none",
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </Link>
  );
}
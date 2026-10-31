"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconMark } from "./IconMark";
import SubmitRequestModal from "./SubmitRequestModal";
import { useSite } from "@/src/app/context/SiteContext";
import Link from "next/link";

export const LOGO_COLOR        = "#F4EEDF";
export const LOGO_ICON_W       = 160;
export const LOGO_ICON_H       = 138;
export const LOGO_GAP          = 10;
export const HEADER_LOGO_SCALE = 0.28;

function GrandSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox="0 0 212 30" width={width} height={height} fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, overflow: "visible" }} aria-hidden>
      <path d="M15.4378 30.203C13.355 30.2221 11.2885 29.8346 9.35456 29.0621C7.51817 28.3316 5.84584 27.2431 4.43513 25.8603C3.03404 24.4929 1.92204 22.8585 1.16502 21.054C0.371041 19.1353 -0.0248849 17.0757 0.00121094 14.9998C-0.0159603 12.9545 0.372295 10.926 1.1436 9.03117C1.88335 7.22156 2.981 5.5796 4.37087 4.2035C5.7627 2.82952 7.4127 1.74383 9.22604 1.00882C11.1301 0.236435 13.1686 -0.151355 15.2236 -0.132131C16.719 -0.13507 18.2064 0.0860757 19.6361 0.52392C21.0202 0.940239 22.3413 1.54236 23.5631 2.31379C24.6675 2.9982 25.6358 3.88063 26.4191 4.9166L24.2771 7.20564C23.0845 5.95849 21.658 4.9578 20.0788 4.26055C18.3705 3.47995 16.501 3.11557 14.6242 3.19739C12.7474 3.27921 10.9169 3.80489 9.28316 4.73119C7.49991 5.7233 6.01938 7.17979 4.99918 8.9456C3.94745 10.788 3.41223 12.8793 3.44981 14.9998C3.41508 17.135 3.97364 19.2381 5.06344 21.0754C6.10997 22.8594 7.61004 24.3354 9.41168 25.354C11.2772 26.4129 13.3922 26.9545 15.5378 26.9228C17.2075 26.949 18.861 26.5929 20.3715 25.8817C21.7435 25.2426 22.9266 24.26 23.8058 23.0293C24.6457 21.8733 25.0912 20.4783 25.0768 19.0502V18.4654H15.395V15.1281H28.454C28.454 15.4918 28.5182 15.9126 28.5611 16.3761C28.6039 16.8396 28.6253 17.2746 28.6253 17.6668C28.6719 19.9574 28.0625 22.2137 26.8689 24.1702C25.7094 26.0354 24.0761 27.5608 22.1351 28.5914C20.0749 29.6854 17.7707 30.2399 15.4378 30.203Z" fill="#F4EBE4"/>
      <path d="M49.7456 30.2049V0.5614H61.4052C63.0484 0.53834 64.668 0.954419 66.0961 1.7666C67.5117 2.5603 68.6858 3.72174 69.494 5.12782C70.3023 6.53389 70.7146 8.13219 70.6871 9.75328C70.7107 11.6095 70.1154 13.4207 68.9949 14.9018C67.9277 16.3618 66.4297 17.4515 64.711 18.0181L71.8509 30.212H67.8311L61.1553 18.5172H53.0942V30.2049H49.7456ZM53.0942 15.2299H61.9549C62.6581 15.252 63.358 15.1255 64.0089 14.8589C64.6597 14.5922 65.2469 14.1913 65.732 13.6824C66.2293 13.1537 66.6167 12.5316 66.8716 11.8522C67.1266 11.1729 67.244 10.4498 67.2171 9.72476C67.245 8.92796 67.1028 8.13435 66.8 7.39665C66.4971 6.65896 66.0406 5.99408 65.4607 5.44617C64.8616 4.88635 64.1578 4.45014 63.3895 4.16258C62.6213 3.87501 61.8038 3.74173 60.9839 3.7704H53.13L53.0942 15.2299Z" fill="#F4EBE4"/>
      <path d="M92.9565 30.204L104.38 0.560547H108.158L119.432 30.204H115.79L112.72 22.0319H99.4896L96.3909 30.204H92.9565ZM103.602 11.2285L100.746 18.7731H111.52L108.593 11.0217C108.25 10.1137 107.848 8.99173 107.386 7.65586C106.915 6.31524 106.501 5.07445 106.137 3.94776C105.737 5.16002 105.33 6.38655 104.902 7.63447C104.473 8.88239 104.031 10.0733 103.602 11.2285Z" fill="#F4EBE4"/>
      <path d="M140.537 30.204V0.560547H143.593L162.206 25.1695C162.149 24.3209 162.092 23.3083 162.042 22.1389C161.992 20.9694 161.942 19.7429 161.914 18.4736C161.885 17.2042 161.864 15.9563 161.849 14.7227C161.835 13.489 161.849 12.3908 161.849 11.3996V0.560547H165.198V30.204H162.078L143.421 5.80894C143.535 7.50611 143.628 9.11533 143.7 10.6366C143.771 12.1626 143.821 13.489 143.85 14.5586C143.878 15.6283 143.892 16.3699 143.892 16.7407V30.204H140.537Z" fill="#F4EBE4"/>
      <path d="M186.297 30.2043V0.560815H197.536C200.014 0.498532 202.461 1.13429 204.594 2.39536C206.728 3.65643 208.464 5.49188 209.602 7.69179C210.838 10.0706 211.457 12.721 211.401 15.4004C211.455 18.0796 210.837 20.7296 209.602 23.1089C208.462 25.3078 206.727 27.1423 204.593 28.4032C202.46 29.6641 200.014 30.3005 197.536 30.2399L186.297 30.2043ZM197.321 3.81967H189.646V26.9454H197.321C199.249 26.9872 201.15 26.4935 202.812 25.5192C204.418 24.5486 205.719 23.1479 206.568 21.476C207.455 19.5783 207.916 17.5092 207.916 15.4146C207.916 13.32 207.455 11.251 206.568 9.3533C205.719 7.68141 204.418 6.28065 202.812 5.31004C201.155 4.31644 199.254 3.80059 197.321 3.81967Z" fill="#F4EBE4"/>
    </svg>
  );
}

function PoolsSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox="0 0 202 30" width={width} height={height} fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, overflow: "visible" }} aria-hidden>
      <path d="M0 30.2049V0.561459H11.7523C13.2389 0.538699 14.7009 0.942084 15.9649 1.72381C17.2067 2.51757 18.2224 3.61794 18.9137 4.91848C19.6622 6.29387 20.0434 7.83862 20.0204 9.40386C20.0473 11.0377 19.667 12.6526 18.9137 14.1032C18.2274 15.4168 17.2113 16.5299 15.9649 17.3335C14.7098 18.1257 13.2513 18.5369 11.7666 18.5172H3.35579V30.2049H0ZM3.35579 15.2299H11.9237C12.7714 15.2386 13.5987 14.9707 14.2799 14.4669C15.0103 13.9059 15.5873 13.1701 15.9578 12.3276C16.3924 11.3695 16.6094 10.3272 16.5933 9.27551C16.6359 7.84872 16.1532 6.45584 15.2367 5.36061C14.8414 4.86196 14.3377 4.45965 13.7637 4.18415C13.1897 3.90864 12.5606 3.76716 11.9237 3.7704H3.35579V15.2299Z" fill="#F4EBE4"/>
      <path d="M55.6852 30.2051C53.6922 30.2253 51.7156 29.8446 49.8732 29.0855C48.1232 28.3602 46.5447 27.2768 45.2394 25.9051C43.9208 24.5101 42.9898 22.8698 42.2049 21.0774C40.7637 17.1647 40.7637 12.8675 42.2049 8.95478C42.8914 7.16752 43.9224 5.53216 45.2394 4.14137C46.5431 2.76896 48.1155 1.6791 49.8589 0.939562C53.5839 -0.581416 57.7578 -0.581416 61.4828 0.939562C63.2308 1.68222 64.8096 2.77148 66.1238 4.14137C67.4536 5.5317 68.4925 7.17292 69.1797 8.96904C70.6209 12.8817 70.6209 17.179 69.1797 21.0917C68.4925 22.8878 67.4536 24.529 66.1238 25.9194C64.8125 27.2873 63.2325 28.37 61.4828 29.0998C59.6438 29.8521 57.6723 30.228 55.6852 30.2051ZM55.6852 26.9034C57.6696 26.9509 59.6275 26.4415 61.3365 25.433C63.0454 24.4246 64.4369 22.9575 65.3526 21.1987C66.3013 19.2906 66.7949 17.1892 66.7949 15.0589C66.7949 12.9286 66.3013 10.8272 65.3526 8.91912C64.4428 7.17988 63.0816 5.7169 61.4114 4.68332C60.1388 3.89479 58.7167 3.37766 57.2343 3.16443C55.752 2.9512 54.2416 3.04647 52.7979 3.44428C51.3542 3.84208 50.0086 4.5338 48.8454 5.47598C47.6823 6.41816 46.7268 7.59043 46.0391 8.91912C45.1041 10.8312 44.6181 12.931 44.6181 15.0589C44.6181 17.1868 45.1041 19.2866 46.0391 21.1987C46.9291 22.9393 48.2863 24.3984 49.9589 25.4131C51.6905 26.4349 53.6744 26.9513 55.6852 26.9034Z" fill="#F4EBE4"/>
      <path d="M105.929 30.204C103.938 30.2248 101.964 29.844 100.124 29.0844C98.376 28.3597 96.7997 27.2762 95.4976 25.904C94.1789 24.5104 93.15 22.8696 92.4703 21.0763C91.0197 17.1653 91.0197 12.8647 92.4703 8.95367C93.15 7.16042 94.1789 5.51955 95.4976 4.126C96.8026 2.75185 98.3777 1.6618 100.124 0.924198C103.847 -0.597129 108.019 -0.597129 111.741 0.924198C113.489 1.66685 115.068 2.75611 116.382 4.126C117.712 5.51633 118.751 7.15756 119.438 8.95367C120.879 12.8664 120.879 17.1636 119.438 21.0763C118.751 22.8724 117.712 24.5137 116.382 25.904C115.071 27.2719 113.491 28.3546 111.741 29.0844C109.899 29.8435 107.922 30.2242 105.929 30.204ZM105.929 26.9023C107.913 26.9498 109.871 26.4404 111.58 25.4319C113.289 24.4235 114.681 22.9564 115.597 21.1975C116.545 19.2895 117.039 17.1881 117.039 15.0578C117.039 12.9275 116.545 10.8261 115.597 8.91802C114.692 7.16098 113.324 5.68402 111.641 4.64657C109.907 3.63884 107.936 3.10798 105.929 3.10798C103.922 3.10798 101.952 3.63884 100.217 4.64657C98.5498 5.67705 97.1948 7.14131 96.2973 8.88236C95.3623 10.7944 94.8763 12.8942 94.8763 15.0221C94.8763 17.15 95.3623 19.2499 96.2973 21.1619C97.2055 22.9223 98.5923 24.3914 100.298 25.4004C102.005 26.4095 103.961 26.9177 105.943 26.8667L105.929 26.9023Z" fill="#F4EBE4"/>
      <path d="M141.629 30.204V0.560547H144.985V26.9451H159.229V30.204H141.629Z" fill="#F4EBE4"/>
      <path d="M191.215 30.2038C189.067 30.2712 186.937 29.781 185.035 28.7812C183.133 27.7813 181.523 26.3059 180.362 24.499L182.697 21.9176C183.741 23.5366 185.14 24.8972 186.788 25.8967C188.227 26.6702 189.839 27.0653 191.472 27.0448C192.669 27.0631 193.857 26.8475 194.971 26.4101C195.922 26.0417 196.763 25.4352 197.413 24.6487C198 23.9096 198.313 22.9897 198.298 22.0459C198.317 21.3232 198.141 20.6087 197.786 19.9784C197.432 19.3481 196.913 18.8255 196.284 18.4662C194.534 17.4669 192.638 16.7452 190.665 16.3269C187.781 15.6518 185.584 14.6701 184.075 13.3818C182.566 12.0935 181.809 10.2513 181.805 7.85531C181.782 6.36973 182.235 4.91569 183.097 3.70508C184 2.47155 185.205 1.48956 186.595 0.852694C189.12 -0.426215 192.035 -0.704779 194.756 0.0728637C197.477 0.850507 199.803 2.62686 201.268 5.0457L198.891 7.42032C198.082 6.1036 196.999 4.97724 195.713 4.11868C194.449 3.31126 192.973 2.8968 191.472 2.9278C189.855 2.86261 188.264 3.34788 186.96 4.30408C186.399 4.71141 185.945 5.2487 185.638 5.86975C185.331 6.49081 185.179 7.17707 185.196 7.86957C185.169 8.51149 185.302 9.15005 185.584 9.72767C185.866 10.3053 186.287 10.8038 186.81 11.1783C187.881 11.9627 189.666 12.6045 192.108 13.1679C194.621 13.6579 197.004 14.6658 199.105 16.1272C199.94 16.7386 200.612 17.5452 201.063 18.4764C201.513 19.4075 201.729 20.4349 201.689 21.4683C201.719 23.0889 201.262 24.6812 200.376 26.0393C199.47 27.3938 198.2 28.4663 196.713 29.1341C194.981 29.89 193.104 30.2552 191.215 30.2038Z" fill="#F4EBE4"/>
    </svg>
  );
}

function MenuIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} aria-label="Open menu" className="menu-icon-btn"
      style={{
        background: "none", border: "none", cursor: "pointer", padding: "8px",
        display: "flex", flexDirection: "column", alignItems: "flex-end",
        gap: "7px", outline: "none", position: "relative", zIndex: 2,
      }}
    >
      <span className="menu-line menu-line-top" />
      <span className="menu-line menu-line-bottom" />
      <style>{`
        .menu-line {
          display: block; height: 1px; background: ${LOGO_COLOR}; border-radius: 1px;
          transition: width 0.48s cubic-bezier(0.76,0,0.24,1), opacity 0.48s cubic-bezier(0.76,0,0.24,1);
        }
        .menu-line-top    { width: 20px; opacity: 1; }
        .menu-line-bottom { width: 14px; opacity: 1; }
        .menu-icon-btn:hover .menu-line-top    { width: 14px; }
        .menu-icon-btn:hover .menu-line-bottom { width: 20px; }

        @media (min-width: 768px) {
          .menu-line { height: 2px; }
          .menu-line-top    { width: 32px; }
          .menu-line-bottom { width: 24px; }
          .menu-icon-btn:hover .menu-line-top    { width: 24px; }
          .menu-icon-btn:hover .menu-line-bottom { width: 32px; }
        }
      `}</style>
    </button>
  );
}

function Logo({
  onClick,
  href = "/",
  logoVisible = true,
}: {
  onClick?: () => void;
  href?: string;
  logoVisible?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Grand Pools — go to homepage"
      id="header-logo-inner"
      style={{
        display: "flex", alignItems: "center", gap: LOGO_GAP,
        position: "relative", zIndex: 2, textDecoration: "none",
        cursor: "pointer",
        opacity: logoVisible ? 1 : 0,
        transition: "opacity 0.25s ease",
        overflow: "visible",
        pointerEvents: logoVisible ? "auto" : "none"
      }}
      onMouseEnter={e => { if (logoVisible) e.currentTarget.style.opacity = "0.72"; }}
      onMouseLeave={e => { if (logoVisible) e.currentTarget.style.opacity = "1"; }}
    >
      <span id="h-grand" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
        <span id="h-grand-svg" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
          <GrandSVG width={212 * HEADER_LOGO_SCALE} height={30 * HEADER_LOGO_SCALE} />
        </span>
      </span>
      <span id="h-icon" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
        <span id="h-icon-svg" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
          <IconMark style={{ width: LOGO_ICON_W * HEADER_LOGO_SCALE, height: LOGO_ICON_H * HEADER_LOGO_SCALE, color: LOGO_COLOR }} />
        </span>
      </span>
      <span id="h-pools" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
        <span id="h-pools-svg" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
          <PoolsSVG width={202 * HEADER_LOGO_SCALE} height={30 * HEADER_LOGO_SCALE} />
        </span>
      </span>
    </Link>
  );
}

const glassVariants = {
  hidden:  { y: "-100%", scaleY: 0.4, opacity: 0, transition: { duration: 0.65, ease: [0.76,0,0.24,1] as const } },
  visible: { y: "0%",   scaleY: 1,   opacity: 1, transition: { duration: 0.85, ease: [0.16,1,0.3,1]  as const } },
};

interface HeaderProps {
  onMenuClick?:    () => void;
  onLogoClick?:    () => void;
  onContactClick?: () => void;
  logoHref?:       string;
  visible?:        boolean;
  menuOpen?:       boolean;
  logoVisible?:    boolean;
}

export default function Header({
  onMenuClick,
  onLogoClick,
  onContactClick,
  logoHref    = "/",
  visible     = true,
  menuOpen    = false,
  logoVisible = true,
}: HeaderProps) {
  const [hovered,   setHovered]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { smootherRef } = useSite();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScrollClass = () => {
      if (window.scrollY > 0) {
        document.documentElement.classList.add("header-scrolled");
        setIsScrolled(true);
      } else {
        document.documentElement.classList.remove("header-scrolled");
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScrollClass, { passive: true });
    handleScrollClass();
    
    return () => window.removeEventListener("scroll", handleScrollClass);
  }, []);

  const handleContactBtnClick = () => {
    if (typeof window !== "undefined" && window.location.pathname === "/contact") {
      const lenis = smootherRef?.current || (window as any).lenis || (window as any).__lenis;
      const vh = window.innerHeight;

      // Find the track container to calculate scroll distance relative to track length
      const trackEl = document.querySelector(".contact-track-container") as HTMLElement;
      let targetScrollY = vh * 0.55;

      if (trackEl) {
        const totalTrackHeight = trackEl.offsetHeight;
        const totalScrollable = totalTrackHeight - vh;

        // 0.18 corresponds to progress where SectionCTA docks at top (layer2Y = 0)
        if (totalScrollable > 0) {
          targetScrollY = totalScrollable * 0.18;
        }
      }

      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(targetScrollY, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }
    } else {
      setModalOpen(true);
    }

    if (onContactClick) {
      onContactClick();
    }
  };

  const showGlass = hovered || menuOpen || isScrolled;

  return (
    <>
      <style>{`
        #site-header {
          height: 56px !important;
          padding: 0 20px !important;
        }
        @media (min-width: 768px) {
          #site-header { height: 66px !important; padding: 0 30px !important; }
        }
        @media (min-width: 1024px) {
          #site-header { height: 72px !important; padding: 0 55px !important; }
        }
        @media (max-width: 767px) {
          #header-logo-inner { width: 135px !important; gap: 8px !important; }
          #header-logo-inner #h-grand,
          #header-logo-inner #h-pools { flex: 1 1 0; min-width: 0; overflow: visible !important; }
          #header-logo-inner #h-grand svg,
          #header-logo-inner #h-pools svg { width: 100% !important; height: auto !important; overflow: visible !important; }
          #header-logo-inner #h-icon-svg svg { height: 25px !important; width: auto !important; flex-shrink: 0; overflow: visible !important; }
        }

        .header-contact-btn {
          color: ${LOGO_COLOR};
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          transition: opacity 0.25s ease;
          display: block;
        }

        .header-contact-btn:hover {
          opacity: 0.72;
        }

        @media (min-width: 1025px) {
          .header-contact-btn {
            display: none !important;
          }
        }
      `}</style>
      <motion.header
        id="site-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <motion.div
          variants={glassVariants}
          initial="hidden"
          animate={showGlass ? "visible" : "hidden"}
          className="glass-backdrop"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transformOrigin: "top",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            background: "transparent",
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            transform: "translateY(0)",
          }}
        />
        <Logo
          onClick={onLogoClick}
          href={logoHref}
          logoVisible={logoVisible}
        />
        <div className="relative z-[2] flex items-center gap-1 md:gap-4">
          <button 
            type="button" 
            onClick={handleContactBtnClick}
            className="header-contact-btn"
            aria-label="Contact us"
          >
            Enquire
          </button>
          <MenuIcon onClick={onMenuClick} />
        </div>
      </motion.header>

      <SubmitRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
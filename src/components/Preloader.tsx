"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

export const LOGO_COLOR        = "#F4EEDF";
export const LOGO_ICON_W       = 160;
export const LOGO_ICON_H       = 138;
export const LOGO_GAP          = 10;
export const HEADER_LOGO_SCALE = 0.28;

const GRAND_SVG_W  = 212;
const GRAND_SVG_H  = 30;
const POOLS_SVG_W  = 202;
const POOLS_SVG_H  = 30;
const TOTAL_LOGO_W = GRAND_SVG_W + LOGO_GAP + LOGO_ICON_W + LOGO_GAP + POOLS_SVG_W;

function useResponsiveScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const calc = () => {
      if (window.innerWidth > 768) {
        setScale(1);
      } else {
        const available = window.innerWidth * 0.72;
        setScale(Math.min(1, available / TOTAL_LOGO_W));
      }
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);
  return scale;
}

function GrandSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox="0 0 212 30" width={width} height={height} fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }} aria-hidden>
      <path d="M15.4378 30.203C13.355 30.2221 11.2885 29.8346 9.35456 29.0621C7.51817 28.3316 5.84584 27.2431 4.43513 25.8603C3.03404 24.4929 1.92204 22.8585 1.16502 21.054C0.371041 19.1353 -0.0248849 17.0757 0.00121094 14.9998C-0.0159603 12.9545 0.372295 10.926 1.1436 9.03117C1.88335 7.22156 2.981 5.5796 4.37087 4.2035C5.7627 2.82952 7.4127 1.74383 9.22604 1.00882C11.1301 0.236435 13.1686 -0.151355 15.2236 -0.132131C16.719 -0.13507 18.2064 0.0860757 19.6361 0.52392C21.0202 0.940239 22.3413 1.54236 23.5631 2.31379C24.6675 2.9982 25.6358 3.88063 26.4191 4.9166L24.2771 7.20564C23.0845 5.95849 21.658 4.9578 20.0788 4.26055C18.3705 3.47995 16.501 3.11557 14.6242 3.19739C12.7474 3.27921 10.9169 3.80489 9.28316 4.73119C7.49991 5.7233 6.01938 7.17979 4.99918 8.9456C3.94745 10.788 3.41223 12.8793 3.44981 14.9998C3.41508 17.135 3.97364 19.2381 5.06344 21.0754C6.10997 22.8594 7.61004 24.3354 9.41168 25.354C11.2772 26.4129 13.3922 26.9545 15.5378 26.9228C17.2075 26.949 18.861 26.5929 20.3715 25.8817C21.7435 25.2426 22.9266 24.26 23.8058 23.0293C24.6457 21.8733 25.0912 20.4783 25.0768 19.0502V18.4654H15.395V15.1281H28.454C28.454 15.4918 28.5182 15.9126 28.5611 16.3761C28.6039 16.8396 28.6253 17.2746 28.6253 17.6668C28.6719 19.9574 28.0625 22.2137 26.8689 24.1702C25.7094 26.0354 24.0761 27.5608 22.1351 28.5914C20.0749 29.6854 17.7707 30.2399 15.4378 30.203Z" fill="#F4EBE4"/>
      <path d="M49.7456 30.2049V0.56146H61.4052C63.0484 0.53834 64.668 0.954419 66.0961 1.7666C67.5117 2.5603 68.6858 3.72174 69.494 5.12782C70.3023 6.53389 70.7146 8.13219 70.6871 9.75328C70.7107 11.6095 70.1154 13.4207 68.9949 14.9018C67.9277 16.3618 66.4297 17.4515 64.711 18.0181L71.8509 30.212H67.8311L61.1553 18.5172H53.0942V30.204H49.7456ZM53.0942 15.2299H61.9549C62.6581 15.252 63.358 15.1255 64.0089 14.8589C64.6597 14.5922 65.2469 14.1913 65.732 13.6824C66.2293 13.1537 66.6167 12.5316 66.8716 11.8522C67.1266 11.1729 67.244 10.4498 67.2171 9.72476C67.245 8.92796 67.1028 8.13435 66.8 7.39665C66.4971 6.65896 66.0406 5.99408 65.4607 5.44617C64.8616 4.88635 64.1578 4.45014 63.3895 4.16258C62.6213 3.87501 61.8038 3.74173 60.9839 3.7704H53.13L53.0942 15.2299Z" fill="#F4EBE4"/>
      <path d="M92.9565 30.204L104.38 0.560547H108.158L119.432 30.204H115.79L112.72 22.0319H99.4896L96.3909 30.204H92.9565ZM103.602 11.2285L100.746 18.7731H111.52L108.593 11.0217C108.25 10.1137 107.848 8.99173 107.386 7.65586C106.915 6.31524 106.501 5.07445 106.137 3.94776C105.737 5.16002 105.33 6.38655 104.902 7.63447C104.473 8.88239 104.031 10.0733 103.602 11.2285Z" fill="#F4EBE4"/>
      <path d="M140.537 30.204V0.560547H143.593L162.206 25.1695C162.149 24.3209 162.092 23.3083 162.042 22.1389C161.992 20.9694 161.942 19.7429 161.914 18.4736C161.885 17.2042 161.864 15.9563 161.849 14.7227C161.835 13.489 161.849 12.3908 161.849 11.3996V0.560547H165.198V30.204H162.078L143.421 5.80894C143.535 7.50611 143.628 9.11533 143.7 10.6366C143.771 12.1626 143.821 13.489 143.85 14.5586C143.878 15.6283 143.892 16.3699 143.892 16.7407V30.204H140.537Z" fill="#F4EBE4"/>
      <path d="M186.297 30.2043V0.560815H197.536C200.014 0.498532 202.461 1.13429 204.594 2.39536C206.728 3.65643 208.464 5.49188 209.602 7.69179C210.838 10.0706 211.457 12.721 211.401 15.4004C211.455 18.0796 210.837 20.7296 209.602 23.1089C208.462 25.3078 206.727 27.1423 204.593 28.4032C202.46 29.6641 200.014 30.3005 197.536 30.2399L186.297 30.2043ZM197.321 3.81967H189.646V26.9454H197.321C199.249 26.9872 201.15 26.4935 202.812 25.5192C204.418 24.5486 205.719 23.1479 206.568 21.476C207.455 19.5783 207.916 17.5092 207.916 15.4146C207.916 13.32 207.455 11.251 206.568 9.3533C205.719 7.68141 204.418 6.28065 202.812 5.31004C201.155 4.31644 199.254 3.80059 197.321 3.81967Z" fill="#F4EBE4"/>
    </svg>
  );
}

function PoolsSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox="0 0 202 30" width={width} height={height} fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }} aria-hidden>
      <path d="M0 30.2049V0.561459H11.7523C13.2389 0.538699 14.7009 0.942084 15.9649 1.72381C17.2067 2.51757 18.2224 3.61794 18.9137 4.91848C19.6622 6.29387 20.0434 7.83862 20.0204 9.40386C20.0473 11.0377 19.667 12.6526 18.9137 14.1032C18.2274 15.4168 17.2113 16.5299 15.9649 17.3335C14.7098 18.1257 13.2513 18.5369 11.7666 18.5172H3.35579V30.2049H0ZM3.35579 15.2299H11.9237C12.7714 15.2386 13.5987 14.9707 14.2799 14.4669C15.0103 13.9059 15.5873 13.1701 15.9578 12.3276C16.3924 11.3695 16.6094 10.3272 16.5933 9.27551C16.6359 7.84872 16.1532 6.45584 15.2367 5.36061C14.8414 4.86196 14.3377 4.45965 13.7637 4.18415C13.1897 3.90864 12.5606 3.76716 11.9237 3.7704H3.35579V15.2299Z" fill="#F4EBE4"/>
      <path d="M55.6852 30.2051C53.6922 30.2253 51.7156 29.8446 49.8732 29.0855C48.1232 28.3602 46.5447 27.2768 45.2394 25.9051C43.9208 24.5101 42.9898 22.8698 42.2049 21.0774C40.7637 17.1647 40.7637 12.8675 42.2049 8.95478C42.8914 7.16752 43.9224 5.53216 45.2394 4.14137C46.5431 2.76896 48.1155 1.6791 49.8589 0.939562C53.5839 -0.581416 57.7578 -0.581416 61.4828 0.939562C63.2308 1.68222 64.8096 2.77148 66.1238 4.14137C67.4536 5.5317 68.4925 7.17292 69.1797 8.96904C70.6209 12.8817 70.6209 17.179 69.1797 21.0917C68.4925 22.8878 67.4536 24.529 66.1238 25.9194C64.8125 27.2873 63.2325 28.37 61.4828 29.0998C59.6438 29.8521 57.6723 30.228 55.6852 30.2051ZM55.6852 26.9034C57.6696 26.9509 59.6275 26.4415 61.3365 25.433C63.0454 24.4246 64.4369 22.9575 65.3526 21.1987C66.3013 19.2906 66.7949 17.1892 66.7949 15.0589C66.7949 12.9286 66.3013 10.8272 65.3526 8.91912C64.4428 7.17988 63.0816 5.7169 61.4114 4.68332C60.1388 3.89479 58.7167 3.37766 57.2343 3.16443C55.752 2.9512 54.2416 3.04647 52.7979 3.44428C51.3542 3.84208 50.0086 4.5338 48.8454 5.47598C47.6823 6.41816 46.7268 7.59043 46.0391 8.91912C45.1041 10.8312 44.6181 12.931 44.6181 15.0589C44.6181 17.1868 45.1041 19.2866 46.0391 21.1987C46.9291 22.9393 48.2863 24.3984 49.9589 25.4131C51.6905 26.4349 53.6744 26.9513 55.6852 26.9034Z" fill="#F4EBE4"/>
      <path d="M105.929 30.204C103.938 30.2248 101.964 29.844 100.124 29.0844C98.376 28.3597 96.7997 27.2762 95.4976 25.904C94.1789 24.5104 93.15 22.8696 92.4703 21.0763C91.0197 17.1653 91.0197 12.8647 92.4703 8.95367C93.15 7.16042 94.1789 5.51955 95.4976 4.126C96.8026 2.75185 98.3777 1.6618 100.124 0.924198C103.847 -0.597129 108.019 -0.597129 111.741 0.924198C113.489 1.66685 115.068 2.75611 116.382 4.126C117.712 5.51633 118.751 7.15756 119.438 8.95367C120.879 12.8664 120.879 17.1636 119.438 21.0763C118.751 22.8724 117.712 24.5137 116.382 25.904C115.071 27.2719 113.491 28.3546 111.741 29.0844C109.899 29.8435 107.922 30.2242 105.929 30.204ZM105.929 26.9023C107.913 26.9498 109.871 26.4404 111.58 25.4319C113.289 24.4235 114.681 22.9564 115.597 21.1975C116.545 19.2895 117.039 17.1881 117.039 15.0578C117.039 12.9275 116.545 10.8261 115.597 8.91802C114.692 7.16098 113.324 5.68402 111.641 4.64657C109.907 3.63884 107.936 3.10798 105.929 3.10798C103.922 3.10798 101.952 3.63884 100.217 4.64657C98.5498 5.67705 97.1948 7.14131 96.2973 8.88236C95.3623 10.7944 94.8763 12.8942 94.8763 15.0221C94.8763 17.15 95.3623 19.2499 96.2973 21.1619C97.2055 22.9223 98.5923 24.3914 100.298 25.4004C102.005 26.4095 103.961 26.9177 105.943 26.8667L105.929 26.9023Z" fill="#F4EBE4"/>
      <path d="M141.629 30.204V0.560547H144.985V26.9451H159.229V30.204H141.629Z" fill="#F4EBE4"/>
      <path d="M191.215 30.2038C189.067 30.2712 186.937 29.781 185.035 28.7812C183.133 27.7813 181.523 26.3059 180.362 24.499L182.697 21.9176C183.741 23.5366 185.14 24.8972 186.788 25.8967C188.227 26.6702 189.839 27.0653 191.472 27.0448C192.669 27.0631 193.857 26.8475 194.971 26.4101C195.922 26.0417 196.763 25.4352 197.413 24.6487C198 23.9096 198.313 22.9897 198.298 22.0459C198.317 21.3232 198.141 20.6087 197.786 19.9784C197.432 19.3481 196.913 18.8255 196.284 18.4662C194.534 17.4669 192.638 16.7452 190.665 16.3269C187.781 15.6518 185.584 14.6701 184.075 13.3818C182.566 12.0935 181.809 10.2513 181.805 7.85531C181.782 6.36973 182.235 4.91569 183.097 3.70508C184 2.47155 185.205 1.48956 186.595 0.852694C189.12 -0.426215 192.035 -0.704779 194.756 0.0728637C197.477 0.850507 199.803 2.62686 201.268 5.0457L198.891 7.42032C198.082 6.1036 196.999 4.97724 195.713 4.11868C194.449 3.31126 192.973 2.8968 191.472 2.9278C189.855 2.86261 188.264 3.34788 186.96 4.30408C186.399 4.71141 185.945 5.2487 185.638 5.86975C185.331 6.49081 185.179 7.17707 185.196 7.86957C185.169 8.51149 185.302 9.15005 185.584 9.72767C185.866 10.3053 186.287 10.8038 186.81 11.1783C187.881 11.9627 189.666 12.6045 192.108 13.1679C194.621 13.6579 197.004 14.6658 199.105 16.1272C199.94 16.7386 200.612 17.5452 201.063 18.4764C201.513 19.4075 201.729 20.4349 201.689 21.4683C201.719 23.0889 201.262 24.6812 200.376 26.0393C199.47 27.3938 198.2 28.4663 196.713 29.1341C194.981 29.89 193.104 30.2552 191.215 30.2038Z" fill="#F4EBE4"/>
    </svg>
  );
}

function LogoSVG({
  circleProgressMV,
  dotOpacityMV,
  width,
  height,
  startSweep,
}: {
  circleProgressMV: MotionValue<number>;
  dotOpacityMV: MotionValue<number>;
  width: number;
  height: number;
  startSweep: boolean;
}) {
  const fill = "#F4EEDF";

  return (
    <div style={{ position: "relative", width, height, flexShrink: 0, overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveGpuKeyframeSweep {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }
        .pure-gpu-wave-draw {
          animation: waveGpuKeyframeSweep 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: clip-path, opacity;
          transform: translateZ(0);
        }
      `}} />

      <div
        className={startSweep ? "pure-gpu-wave-draw" : ""}
        style={{
          position: "absolute",
          inset: 0,
          clipPath: startSweep ? undefined : "inset(0 100% 0 0)",
          opacity: startSweep ? undefined : 0,
        }}
      >
        <svg
          viewBox="385 0 206 178.21"
          width={width}
          height={height}
          style={{ display: "block", flexShrink: 0 }}
          aria-hidden
        >
          <path
            fill={fill}
            d="M571.87,92.4c-.07,2-.22,3.99-.44,5.96l-5.78,1.33h-.03l-.44.11c-.72.17-1.45.35-2.19.53-3.36.82-6.84,1.67-10.32,1.82-9.97.45-17.17-3.48-21.46-11.64-.6-1.17-1.14-.98-2.21-.49l-.14.07c-3.17,1.46-6.3,3.11-9.3,4.91-6.34,4.01-13.21,7.11-20.43,9.19-6.63,1.89-12.93.55-19.84-4.22-6.1-4.2-9.44-10.49-10.22-19.21-.1-1.21-.18-2.43-.26-3.65-.07-1.2-.15-2.41-.26-3.61-.07-.43-.18-.88-.31-1.33-.5.23-.96.51-1.39.84-.99,1.02-2.04,2.08-3.09,3.15-3.56,3.61-7.25,7.35-10.72,11.17-9.08,10.01-19.09,19.3-29.75,27.62-2.34,1.87-4.86,3.56-7.47,5.04,0,0-.01.01-.04.02-.32.18-2.48,1.39-5.07,2.34-.73-1.69-1.41-3.41-2.02-5.16,2.42-.97,4.73-2.32,5.02-2.49h.01l.02-.02c6.65-3.88,12.79-8.61,18.25-14.04,6.33-6.09,12.56-12.42,18.59-18.53,2.92-2.96,5.84-5.92,8.77-8.86l1.29-1.31c2.78-2.83,5.65-5.76,8.43-8.68.71-.75,1.41-1.09,2.06-1,.62.08,1.16.54,1.59,1.36.53.99.86,2.06.98,3.18.11,1.26.09,2.52.07,3.74-.01.49-.02.98-.02,1.46-.13,7.23.86,12.62,3.19,17.49,3.65,7.6,13.25,11.5,21.84,8.89,7.84-2.5,15.38-5.94,22.41-10.22,2.51-1.39,5.12-2.58,7.79-3.57,3.55-1.45,4.56-1.05,6.34,2.47,1.61,3.54,4.46,6.29,8.03,7.76,4.3,1.63,8.96,2.02,13.48,1.12,3.01-.57,6.16-1.26,9.37-2.06h.02l5.65-1.48h0Z"
          />
        </svg>
      </div>

      <svg
        viewBox="385 0 206 178.21"
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, display: "block", overflow: "visible", pointerEvents: "none" }}
        aria-hidden
      >
        <motion.g style={{ opacity: circleProgressMV }}>
          <path
            fill={fill}
            d="M487.9,5.01c-46.42,0-84.04,37.63-84.04,84.05,0,9.87,1.7,19.34,4.83,28.13.61,1.75,1.29,3.47,2.02,5.16,12.9,29.86,42.6,50.75,77.19,50.75,43.27,0,78.9-32.71,83.53-74.74.22-1.97.37-3.96.44-5.96.05-1.11.07-2.22.07-3.34,0-46.42-37.63-84.05-84.04-84.05h0ZM565.65,99.69c-5.18,38.3-38.02,67.83-77.75,67.83-32.35,0-60.12-19.57-72.12-47.51-.76-1.74-1.44-3.51-2.06-5.31h-.01c-2.77-8.04-4.28-16.66-4.28-25.64,0-43.34,35.13-78.47,78.47-78.47s78.47,35.13,78.47,78.47c0,1.62-.05,3.22-.15,4.81-.11,1.96-.3,3.9-.57,5.82h0Z"
          />
          <path
            fill={fill}
            d="M410.71,122.35s-.07.03-.1.04c-1.34.48-2.72.87-4.11,1.17-5.63,1.17-10.97-.73-16.32-5.81-3.98-3.78-5.17-8.95-3.55-15.38.29-.92.67-1.77,1.13-2.58.08-.21.18-.42.32-.6.75-1,2.17-1.21,3.18-.46.53.27.89.66,1.04,1.14.21.7-.11,1.42-.44,2.03-1.13,2.15-1.38,4.62-.7,6.96.17.7.4,1.37.68,2.02,2.08,4.79,6.83,7.61,11.75,7.5,1.58-.03,3.14-.44,4.7-1.03l.39-.15c.62,1.74,1.29,3.46,2.03,5.15h0Z"
          />
          <path
            fill={fill}
            d="M589.72,89.97c-.82,1.99-2.38,3.48-4.33,4.16-4.47,1.74-9.13,3.16-13.84,4.2l-.12.03c.22-1.96.37-3.95.44-5.95l.11-.03c1.2-.33,2.38-.66,3.57-.99,2.47-.71,4.92-1.68,7.29-2.61,1.34-.53,2.68-1.06,4.03-1.55.81-.21,1.59-.32,2.37-.35l.44-.02.07.43c.16.89.15,1.79-.03,2.68h0Z"
          />
        </motion.g>

        <motion.path
          fill={fill}
          style={{ opacity: dotOpacityMV }}
          d="M591.28,107.71l-1.42-1.6h0c-.97-1.06-2.56-1.27-3.77-.53l-.18.09c-.26.18-.49.4-.68.65-.99,1.3-.74,3.17.55,4.16,1.03.82,2.16,1.53,3.32,2.09.12.07.25.1.4.1.36,0,.81-.21,1.38-.63.06-.04.11-.09.16-.14,1.22-1.09,1.33-2.97.25-4.19,0,0-.01,0-.01,0Z"
        />
      </svg>
    </div>
  );
}

type Phase = "idle" | "wave-draw" | "circle-appear" | "text-reveal" | "hold" | "fly-out" | "done";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    let remaining = ms;
    let startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handler);
      resolve();
    };

    const schedule = () => {
      timer = setTimeout(finish, remaining);
      startedAt = Date.now();
    };

    const handler = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        remaining -= Date.now() - startedAt;
        if (remaining <= 0) { finish(); return; }
      } else {
        schedule();
      }
    };

    document.addEventListener("visibilitychange", handler);
    if (document.visibilityState !== "hidden") schedule();
  });

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(true);
  const [startSweep, setStartSweep] = useState(false);

  const rScale  = useResponsiveScale();
  const iconW   = LOGO_ICON_W * rScale;
  const iconH   = LOGO_ICON_H * rScale;
  const grandW  = GRAND_SVG_W * rScale;
  const grandH  = GRAND_SVG_H * rScale;
  const poolsW  = POOLS_SVG_W * rScale;
  const poolsH  = POOLS_SVG_H * rScale;
  const logoGap = 12;

  const grandRef    = useRef<HTMLDivElement>(null);
  const iconRef     = useRef<HTMLDivElement>(null);
  const poolsRef    = useRef<HTMLDivElement>(null);
  const grandSvgRef = useRef<HTMLDivElement>(null);
  const iconSvgRef  = useRef<HTMLDivElement>(null);
  const poolsSvgRef = useRef<HTMLDivElement>(null);

  const targetsRef = useRef<{
    gTx: number; gTy: number; gScale: number;
    iTx: number; iTy: number; iScale: number;
    pTx: number; pTy: number; pScale: number;
  }>({
    gTx: -300, gTy: -300, gScale: 0.28,
    iTx: 0, iTy: -300, iScale: 0.28,
    pTx: 300, pTy: -300, pScale: 0.28
  });

  const circleProgressMV = useMotionValue(0);
  const dotOpacityMV     = useMotionValue(0);

  const slideAmt   = 400;
  const textProgress = useMotionValue(0);
  const textX_left   = useTransform(textProgress, [0, 1], [-slideAmt, 0]);
  const textX_right  = useTransform(textProgress, [0, 1], [slideAmt,  0]);
  const textOpacity  = useTransform(textProgress, [0, 0.1, 1], [0, 1, 1]);

  const fullPreloaderOpacity = useMotionValue(1);

  const grandX = useMotionValue(0); const grandY = useMotionValue(0); const grandS = useMotionValue(1);
  const iconX  = useMotionValue(0); const iconY  = useMotionValue(0); const iconS  = useMotionValue(1);
  const poolsX = useMotionValue(0); const poolsY = useMotionValue(0); const poolsS = useMotionValue(1);

  const preCalculateLayout = () => {
    const hGrand = document.getElementById("h-grand-svg");
    const hIcon  = document.getElementById("h-icon-svg");
    const hPools = document.getElementById("h-pools-svg");

    if (
      !hGrand || !hIcon || !hPools ||
      !grandRef.current || !iconRef.current || !poolsRef.current ||
      !grandSvgRef.current || !iconSvgRef.current || !poolsSvgRef.current
    ) {
      return true;
    }

    const hGR = hGrand.getBoundingClientRect();
    const hIR = hIcon.getBoundingClientRect();
    const hPR = hPools.getBoundingClientRect();
    const gFR = grandRef.current.getBoundingClientRect();
    const iFR = iconRef.current.getBoundingClientRect();
    const pFR = poolsRef.current.getBoundingClientRect();
    const gSR = grandSvgRef.current.getBoundingClientRect();
    const iSR = iconSvgRef.current.getBoundingClientRect();
    const pSR = poolsSvgRef.current.getBoundingClientRect();

    const gScale = hGR.width / (gSR.width || 1);
    const iScale = hIR.width / (iSR.width || 1);
    const pScale = hPR.width / (pSR.width || 1);

    const gCx = gFR.left + gFR.width  / 2; const gCy = gFR.top + gFR.height / 2;
    const iCx = iFR.left + iFR.width  / 2; const iCy = iFR.top + iFR.height / 2;
    const pCx = pFR.left + pFR.width  / 2; const pCy = pFR.top + pFR.height / 2;

    const gSCx = gSR.left + gSR.width  / 2; const gSCy = gSR.top + gSR.height / 2;
    const iSCx = iSR.left + iSR.width  / 2; const iSCy = iSR.top + iSR.height / 2;
    const pSCx = pSR.left + pSR.width  / 2; const pSCy = pSR.top + pSR.height / 2;

    const ghCx = hGR.left + hGR.width  / 2; const ghCy = hGR.top + hGR.height / 2;
    const ihCx = hIR.left + hIR.width  / 2; const ihCy = hIR.top + hIR.height / 2;
    const phCx = hPR.left + hPR.width  / 2; const phCy = hPR.top + hPR.height / 2;

    targetsRef.current = {
      gTx: ghCx - (gCx + (gSCx - gCx) * gScale),
      gTy: ghCy - (gCy + (gSCy - gCy) * gScale),
      gScale,
      iTx: ihCx - (iCx + (iSCx - iCx) * iScale),
      iTy: ihCy - (iCy + (iSCy - iCy) * iScale),
      iScale,
      pTx: phCx - (pCx + (pSCx - pCx) * pScale),
      pTy: phCy - (pCy + (pSCy - pCy) * pScale),
      pScale
    };
    return true;
  };

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (document.visibilityState === "hidden") {
        await new Promise<void>((r) => {
          const check = () => {
            if (document.visibilityState === "visible") {
              document.removeEventListener("visibilitychange", check);
              r();
            }
          };
          document.addEventListener("visibilitychange", check);
        });
      }

      await wait(100);
      if (!active) return;

      // 1. Hardware GPU keyframe sweep
      setPhase("wave-draw");
      setStartSweep(true);
      await wait(1250);
      if (!active) return;

      // 2. Outer circle and accents reveal
      setPhase("circle-appear");
      animate(circleProgressMV, 1, { duration: 0.9, ease: "easeOut" });
      animate(dotOpacityMV,     1, { duration: 0.7, ease: "easeOut" });
      await wait(800);
      if (!active) return;

      // 3. Text entrance
      setPhase("text-reveal");
      animate(textProgress, 1, { duration: 1.1, ease: [0.25, 1, 0.5, 1] });
      await wait(1100);
      if (!active) return;

      setPhase("hold");

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!active) return;

      preCalculateLayout();

      const ease = [0.76, 0, 0.24, 1] as const;
      const dur  = 0.85;
      const { gTx, gTy, gScale, iTx, iTy, iScale, pTx, pTy, pScale } = targetsRef.current;

      setPhase("fly-out");

      // Animate flying logo up to header
      const flyAnimations = [
        animate(grandX, gTx, { duration: dur, ease }),
        animate(grandY, gTy, { duration: dur, ease }),
        animate(grandS, gScale, { duration: dur, ease }),

        animate(iconX,  iTx, { duration: dur, ease }),
        animate(iconY,  iTy, { duration: dur, ease }),
        animate(iconS,  iScale, { duration: dur, ease }),

        animate(poolsX, pTx, { duration: dur, ease }),
        animate(poolsY, pTy, { duration: dur, ease }),
        animate(poolsS, pScale, { duration: dur, ease })
      ];

      await Promise.all(flyAnimations);
      if (!active) return;

      // Fade header logo in
      const headerLogoEl = document.getElementById("header-logo-inner");
      if (headerLogoEl) {
        headerLogoEl.style.transition = "opacity 0.2s ease";
        headerLogoEl.style.opacity    = "1";
      }

      // Unlock homepage content instantly before fading out overlay
      document.body.classList.remove("preloading");
      document.documentElement.classList.remove("preloading", "show-brand-preloader");
      onComplete?.();

      // Smoothly fade out preloader overlay over the revealed page
      await animate(fullPreloaderOpacity, 0, { duration: 0.35, ease: "easeInOut" });
      if (!active) return;

      setPhase("done");
      setMounted(false);
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  if (!mounted) return null;

  const layerStyle = { backfaceVisibility: "hidden", transformStyle: "preserve-3d" } as const;

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] h-full overflow-hidden pointer-events-none" 
      style={{ opacity: fullPreloaderOpacity, ...layerStyle }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, ...layerStyle }}
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ background: "linear-gradient(145deg, #0A2B1E 0%, #0E3A28 100%)" }}
        >
          <video
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.15, mixBlendMode: "screen" }}
          >
            <source src="/videos/pool-water-hq.webm" type="video/webm"/>
            <source src="/videos/pool-water-hq.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          ...layerStyle
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: logoGap,
            width: "100%",
            maxWidth: "100vw",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            ref={grandRef}
            style={{
              x: grandX, y: grandY, scale: grandS,
              transformOrigin: "center center",
              display: "flex", alignItems: "center",
              willChange: "transform",
              ...layerStyle
            }}
          >
            <motion.div
              ref={grandSvgRef}
              style={{
                x: textX_left,
                opacity: textOpacity,
                marginRight: logoGap,
                display: "flex",
                alignItems: "center",
                willChange: "transform",
                ...layerStyle
              }}
            >
              <GrandSVG width={grandW} height={grandH} />
            </motion.div>
          </motion.div>

          <motion.div
            ref={iconRef}
            style={{
              x: iconX, y: iconY, scale: iconS,
              transformOrigin: "center center",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform",
              ...layerStyle
            }}
          >
            <div ref={iconSvgRef} style={{ display: "flex", ...layerStyle }}>
              <LogoSVG
                circleProgressMV={circleProgressMV}
                dotOpacityMV={dotOpacityMV}
                width={iconW}
                height={iconH}
                startSweep={startSweep}
              />
            </div>
          </motion.div>

          <motion.div
            ref={poolsRef}
            style={{
              x: poolsX, y: poolsY, scale: poolsS,
              transformOrigin: "center center",
              display: "flex", alignItems: "center",
              willChange: "transform",
              ...layerStyle
            }}
          >
            <motion.div
              ref={poolsSvgRef}
              style={{
                x: textX_right,
                opacity: textOpacity,
                marginLeft: logoGap,
                display: "flex",
                alignItems: "center",
                willChange: "transform",
                ...layerStyle
              }}
            >
              <PoolsSVG width={poolsW} height={poolsH} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
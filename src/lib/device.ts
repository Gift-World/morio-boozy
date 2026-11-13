import type { MouseEvent } from "react";

/** Stand-in for the original `href="javascript:void(0)"` links. */
export const noop = (e: MouseEvent) => e.preventDefault();

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Port of the theme's `isMobile()`: touch user agents and viewports up to
 * 1024px get `body.disable-cursor` and no custom cursor.
 */
export function isMobile(): boolean {
  return MOBILE_UA.test(navigator.userAgent) || document.documentElement.clientWidth <= 1024;
}

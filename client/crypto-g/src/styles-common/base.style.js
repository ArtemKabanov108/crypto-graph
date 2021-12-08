import { sizeWindow } from './sizeWindow.style'

export const media_breakpoint_down = (size) => {
  return `@media (max-width: ${sizeWindow[size]})`
}

export const media_breakpoint_up = (size) => {
  return `@media (min-width: ${sizeWindow[size]})`
}

export const media_breakpoint_range = (sizeMax, sizeMin) => {
  return `@media only screen
          and (min-device-width: ${sizeWindow[sizeMin]})
          and (max-device-width: ${sizeWindow[sizeMax]})
          `
}

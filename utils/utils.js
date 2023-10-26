// Check if view port is desktop ...else mobile
const isDesktopViewport = (page) => {
  return page.viewportSize().width >= 600
}

export { isDesktopViewport }

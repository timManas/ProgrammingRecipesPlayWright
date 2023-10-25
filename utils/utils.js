const isDesktopViewport = (page) => {
  return page.viewportSize().width >= 600
}

export { isDesktopViewport }

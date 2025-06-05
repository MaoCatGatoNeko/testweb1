function disableExternalLinks() {
  const links = document.getElementsByTagName('a');
  const currentHost = window.location.host;

  for (let i = 0; i < links.length; i++) {
    let href = links[i].getAttribute('href');
    if (!href) continue;

    // Normalize href: add protocol if missing for parsing
    if (href.startsWith('//')) {
      href = window.location.protocol + href; // e.g., https://archive.org
    } else if (href.startsWith('www.')) {
      href = window.location.protocol + '//' + href;
    }

    // Now check if href looks like an external link
    if (
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      try {
        const linkHost = new URL(href).host;

        if (linkHost !== currentHost) {
          // External link: disable it
          links[i].style.color = 'gray';
          links[i].style.pointerEvents = 'none';
          links[i].style.cursor = 'default';
          links[i].title = 'External links are disabled';
        }
      } catch (e) {
        // Invalid URL — skip
        continue;
      }
    }
  }
}

window.onload = disableExternalLinks;






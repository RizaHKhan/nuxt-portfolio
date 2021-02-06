---
title: Static Pages
description: Created a number of static pages that showcase my CSS abilities
previewImage: static-sites/broadstreet-landing-page.png
---

# Static Pages

Building a static site, is always fun. You get to enhance your layout skills and it allows you to also understand responiveness.

Below are a couple of examples where I used my skills to build a solid layout using CSS (Grid/Flexbox) and Javascript.

### Landing Page

Another great project. The subtless of some of the test, the colors is all something I enjoy incorporating. Was a fun project. The arrows disappear in mobile, but their position remains at a certain width based on Javascript.

<dynamic-image filename="static-sites/broadstreet-landing-page.png"></dynamic-image>

### Demo page

<dynamic-image filename="static-sites/demo-page.png"></dynamic-image>

Another small landing page, with some basic responsive elements. Elements disappear and re-align as the viewport changes.

### Gallery Page

<dynamic-image filename="static-sites/gallery-page.png"></dynamic-image>

That browser you see, is actually CSS. This is one of my favorite because I made it with CSS Grid and there wasn't that much actual layout code. It was primarily all styling for that mocked browser.

Below is a zoomed out image:

<dynamic-image filename="static-sites/gallery-page-zoomed-out.png"></dynamic-image>

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
```

That is you need to make the above layout. No media queries or anything. Incredible.

### Self-Demo Page

This page is a mix of PHP and Javascript. Video information is in a PHP array, but the main video changes using Javascript.

Most of the layout is done using Grid.

<dynamic-image filename="static-sites/self-demo-page.png"></dynamic-image>

Again, a super fun project.

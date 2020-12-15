---
title: Automated Slider
description: SEO Purposes
previewImage: generic/js-logo.png
categories:
  - Javascript
published: true
featured: true
---

# Automated Slider

In this tutorial, we will learn how to create a automated slider(carousel). Please feel free to checkout this sliders **[Codepen](https://codepen.io/riza-khan/pen/dyMveop)** which shows a rudiemntary version of the slider.

My main focus would be to understand the reasoning behind doing what we are doing. Practicing the concepts, will allows us to build more and more complex projects as we practice them.

This is what we will build (sorry for the jumpy gif):

<dynamic-image filename="slider/slider-gif.gif"></dynamic-image>

Here, we have three 'cards' that show on `slide-container` at one time. Part of the feature in the slider is the ability to change the number of images shown. We can change it to just one, or three or a hundred (for arguments sake).

## HTML

Here is the minimum HTML you will need:

```html
<body>
  <div class="slide-container"></div>
</body>
```

Believe it or not, that is all you need. There are additional components we can add (ie, navigation buttons), but we won't worry about that complexity for the time being.

<dynamic-image filename="slider/slider.png"></dynamic-image>

## CSS

Since this is an example, we will try to keep the CSS to a minimum. All that matters right now is that the `.slide-container` is centered on the screen. The internal `slides` will dynamically conform to the size of their container depending on a few criterias that we will get to in the Javascript.

```css
body {
  display: flex;
  height: 100vh; /* helps center the .slider vertically */
}

.slider {
  margin: auto;
  width: 600px;
  height: 300px;
  border: solid 1px black;
  border-radius: 10px;
  display: flex; /* This will put the slides next to each other */
  overflow: hidden; /* This rule is disabled in the codepen and once you read through the article you will find out why. */
}

.slide {
  height: 100%;
  border: solid 1px red;
  transition: all 0.5s ease; /* This is important to display a smooth transition vs a quick jump of the slides */
  position: absolute; /* This is critical! The animation will not work without it. CSS properties like left, right, top, bottom only work with elements with this property */
}
```

## Javascript

### Data

We will need to insert some data into the slider, we can initalize that first. This could be anything. Lets start with something very simple:

```javascript
const data = [
  { number: 1, name: 'One' },
  { number: 2, name: 'Two' },
  { number: 3, name: 'Three' },
  { number: 4, name: 'Four' },
  { number: 5, name: 'Five' },
]
```

### Slider Variables

Lets setup all the variables needed for this animation:

```javascript
const sliderContainer = document.querySelector('.slide-container') // select the slider div
const slidesInContainer = 3 // how many slides do you want to show in the slide container at one time?
const timer = 3000 // seconds between the slider animation
const slideWidth = sliderContainer.offsetWidth / slidesInContainer // determine the width of each slide depending on the width of the sliderContainer
```

### Setting Up `SlideContainer`

Let us add the internal cuts of the `slideContainer`. We want to create a `for` loop that will allow us add the number of slides we want to add to the container. Hint, the `slidesInContainer` variable above.

```javascript
for (let x = 0; x < slidesInContainer; x++) {
  const slide = document.createElement('div')
  slide.classList.add('slide')
  slide.style.width = `${slideWidth}px`
  slide.style.left = `${slideWidth * x}px`
  setupSlide(slide, x)
  sliderContainer.appendChild(slide)
}
```

If you inspect the HTML in the browser, you will see something like this:

```html
<div class="slide-container">
  <div class="slide"></div>
  <div class="slide"></div>
  <div class="slide"></div>
</div>
```

We wanted to see three slides, and there they are!

### Setting Up Each Individual Slide

When we were setting up the slides in the `for` loop, you will also notice that we added a function, `setupSlide`, to which we passed the `slide` object. That function will help us add the content inside the slide that is available in our `data` array.

```javascript
function setupSlide(element, dataPosition) {
  let header = document.createElement('h3')
  header.innerText = data[dataPosition].name

  let number = document.createElement('p')
  number.innerText = data[dataPosition].number

  element.appendChild(header)
  element.appendChild(number)
}
```

Basically, creates a `h3` and `p` element and addes the informatoin from the `data` array above.

### Slider Animation

Now that we have our slides setup, its time to implement the sliding animation. But before we do that, lets step back and think about what we need to do.

As programmers, stripping the problem to small parts is essential to solving the whole thing:

1. We create another `div` and append as the first-child of the `.slide-container`.
2. We then add the content to that div from the array. Now since we are already showing three slides with number 1, 2, 3 from the data array, the next item will slide in from the left would be number 4.
3. Start the slide animation.
4. Delete the last slide

The above steps should look something like this. I've removed the CSS property `overflow: hidden` and you should see whats going on behind the screens. A slide is being created, appended the the beginning of the `slide-container` and then the animation starts. And as soon as the animation is over, the last slide is deleted.

<dynamic-image filename="slider/showoverflow.gif"></dynamic-image>

Lets illustrate the above in the markup below:

```html
<div class="slide-container">
  <div class="slide"></div>
  <!-- this would be the newly appended div, and add contents of data[4] to it BEFORE the animation is started -->
  <div class="slide"></div>
  <div class="slide"></div>
  <div class="slide"></div>
  <!-- this div gets deleted after the animation is complete -->
</div>
```

The following function will take care of steps **1** and **2**.

```javascript
function createSlide(parentElement) {
  const newSlide = document.createElement('div')
  newSlide.classList.add('slide')
  newSlide.style.width = `${slideWidth}px`
  newSlide.style.left = `-${slideWidth}px` // This is important. Position the new slide outside of the container so that the user does not see it.

  parentElement.insertAdjacentElement('afterbegin', newSlide)
  setupSlide(newSlide, data[1]) // We will talk more about why we are specifically passing data[1] to the setupSlide function.

  setTimeout(() => {
    move()
  }, 500)
}
```

Just to recap, we created a slide and then we added it to the DOM via the `insertAdjacentElement` method, _but positioned it outside the element, where `overflow: none;` will hide it from view_. We then used the `setupSlide` method we wrote above to add the contents from the `data` array to it. We are ready to tackle steps **3** and **4**.

But a very important element of this is the `setTimeout` method we are using to prevent that `move` function from running to fast. This is how we achieve that smooth transition from slide to slide.

```javascript
function move() {
  let slides = document.querySelectorAll('.slide')
  slides.forEach((slide) => {
    slide.style.left = `${
      parseInt(slide.style.left.split('px')[0]) + slideWidth
    }px`
  })

  setTimeout(() => {
    slides[slides.length - 1].remove()
  }, 500)
}
```

That is really it. You have yourself a automated slider. Now you have many options on what features you may want to add to this slider. Sit back and think about what you want implemented and eventually it will come to you!

Thank you for reading and please don't hesitate to reach out with any and all questions/comments.

# Project Simply
![screen shot of task](https://res.cloudinary.com/drldpyegp/image/upload/c_scale,h_556,q_auto/v1558117501/Screen_Shot_2019-05-17_at_19.19.38.webp)

By Matthew Glen

## Setup

Clone / download & extract this repository, In the root directory type the following command

```
npm install
```

Once installed you're now able to use the package

## Compile for development

```
npm run dev
```

### Compile for production

```
npm run build
```

Start dev server & hot reloading

```
npm run start
```


### Targets

1. Design infinite animation for active state.

2. When button is selected create a line animation connecting the player to the focused button.

3. Add hover animation to unfocused buttons.


### Planning and Challenges

To begin with I forked a Webpack boilerplate which included SCSS and Babel, this allowed me to follow the MVC (Modal, View, controller) pattern to structure the code. I planned to use modern CSS rules, so I included PostCSS with Autoprefixer in the project to provide cross browser compatibility.

One of the first challenges faced was to figure out how to create the line from A to B and include the turns.
After looking through some similar examples I decide to create the line using the SVG path element. A course on SVG's and the MDN documentation helped me gain the knowledge needed to break down the problem and create the path in steps.

Next task was to animate the path like a line is being drawn. I'd researched GreenSock Animation library and found the DrawSVG plugin, this worked perfectly but it was a premium product. An article on CSS Tricks gave me the information needed to animate the path. Using stroke-dashoffset and stroke-dasharray to manipulate the stroke's length gives the impression that a line is being drawn.

I used the following technologies: HTML, SCSS, Webpack, Babel and JQuery.


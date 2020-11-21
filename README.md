# What is this?

This is a demo app that implements an infinitely scrolling grid of Giphy images from the Giphy API for trending GIFs.

It uses the new functional component approach to React and is wrapped with the new Redux.

It is bare-bones on the UI, the idea was to quickly create a React app that does something interesting.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How does it work?

The page loads the first page of images automatically.  After that, scrolling will bring in more content basically forever.

There is a text entry box at the top of the page, typing a search term in there will filter the list of images based on their title containing that text anywhere.

Clicking on an image will open that image in its full size, offering a close button to return to the main page.

# How can I see it in action?

Click [here](http://swe9.github.io/Functional-React-Demo).

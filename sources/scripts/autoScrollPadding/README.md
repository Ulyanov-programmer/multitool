# Instruction

Need to install `scroll-padding` and `scroll-behavior`, but too lazy to bother, or is the element constantly changing? Connect this script, it will do everything for you.

What can this script do?

- Set the `scroll-padding-*` value for the elements.
- Set the `scroll-behavior` value for those elements that will be scrolled.
- Set the _value_ of scroll-padding-\* to a `css custom property`.
- Set the `direction` for scroll-padding.
- Add a `gap` to the scroll-padding value.

## Using

1. Write the following code:

```html
<!-- styles are for demonstration purposes only -->
<div
  data-auto-scroll-padding
  style="position: sticky; top: 0; left: 0; background: whitesmoke;"
>
  <a href="#content">Link to the content block</a>
</div>

<hr style="display: block; height: 300px; background: gray;" />
<div id="content">Content</div>
<hr style="display: block; height: 300px; background: gray;" />
```

2. Click on the link with the text: _"Link to the content block"_.

### What happened?

The script set the _height_ of the block to which attribute `data-auto-scroll-padding` was set as the value for `scroll-padding-top` to the _root element_ (html element). Also installed `scroll-behavior: smooth`.

After clicking on _any link_ inside the block with the data-auto-scroll-padding attribute _starting with #_, it updates the scroll-padding value.

## Customization

You will be able to use all the features of this script using the following attributes:

```html
<!-- 
  You can increase the gap value between the element and the content.

  The default value - 5 (5px).
-->
<div data-auto-scroll-padding data-gap="15"></div>

<!-- 
  You can set scroll-padding-* not only for the root element, but also for any other.

  See the example below, pay attention to the data-scrollable-parent attribute.

  The default value - "" (the html element will be used).
-->
<div class="SELECTOR_OF_THE_ELEMENT" style="height: 400px; overflow-y: scroll;">
  <div
    data-auto-scroll-padding
    data-scrollable-parent=".SELECTOR_OF_THE_ELEMENT"
    style="position: sticky; top: 0; left: 0; background: whitesmoke;"
  >
    <a href="#content">Link to the content block</a>
  </div>

  <hr style="display: block; height: 300px; background: gray;" />
  <div id="content">Content</div>
  <hr style="display: block; height: 300px; background: gray;" />
</div>

<!-- 
  You can disable the scroll-behavior assignment by specifying data-scroll-behavior="arbitrary-value".

  The default value - "" (smooth will be assignment)
-->
<div data-auto-scroll-padding data-scroll-behavior="none"></div>

<!-- 
  You can put the scroll-padding value in a css variable by specifying the data-var-for-padding attribute.

  The variable will be assigned to the root element or the one specified via the data-scrollable-parent="" attribute.

  The default value - "" (a css variable will not be used).
-->
<div data-auto-scroll-padding data-var-for-padding="some-variable"></div>

<!-- 
  You can change the direction for scroll-padding by specifying the data-padding-direction attribute. 
  ? The attribute takes the following values: top bottom left right
  (accordingly, scroll-padding will be scroll-padding-top|bottom|left|right)

  Depending on the set direction, the scroll-padding value will be changed. 
  The height of the element will be used for top and bottom, and the width for others.

  The default value - top.
-->
<div data-auto-scroll-padding data-padding-direction="left"></div>
```

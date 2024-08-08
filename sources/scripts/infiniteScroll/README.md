# Instruction

## Initialization

1. To initialize, connect the script to your page:

```html
<script type="module" src="./scripts/infiniteScroll/index.js"></script>
```

2. Write the following markup:

```html
<infinite-scroll id="infinite-line-one">
  <div>item1</div>
  <div>item2</div>
  ...
</infinite-scroll>
```

3. Voila! That is all.

## WARNING!

1. Please note that the width of the `infinite-scroll` element must be equal to or less than the width of its contents.
2. The script is turning off if `prefers-reduced-motion` is `reduce`.
   In this case, your markup will not be subject to changes.

## Customization

The speed, the indentation between the elements and the direction are adjusted using css variables. <br>
Declare them in styles for your infinite line:

```css
infinite-scroll#your-infinite-line {
    /* Change the direction of the animation (corresponds to the animation-direction property) */

  --direction: normal;

  /* Set the animation speed. */
  --duration: 10s;

  /* 
    Set the gap between the elements. 
    It is important to set the gap here, because it will be taken into account when calculating the animation.
  */
  --gap: 15px;

  @media (prefers-reduced-motion: reduce) {
    /* If reduce animations is set */
  }
}
```

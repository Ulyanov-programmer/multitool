# Instruction.

For tabs to work, you need to connect scripts and styles: <br>
(If you use gulp\*multitool, you can connect them by switching `tabs=false` to `tabs=true` on the `sources/index.html` page)

```html
<script src="./path_to_tab_folder/index.js"></script>
<link rel="stylesheet" href="./path_to_tab_folder/index.css" />
```

After connecting, write the following HTML code:

```html
<tab-button aria-controls="tab-item1">The first item</tab-button>
<tab-button aria-controls="tab-item2">The second item</tab-button>

<tab-frame>
  <tab-item id="tab-item1">content 1</tab-item>
  <tab-item id="tab-item2">content 2</tab-item>
</tab-frame>
```

Don't be embarrassed by the look of custom html elements, their support: https://caniuse.com/custom-elementsv1 (the author did not use the modification of embedded elements, so watch with partial support))

- The _role_ attributes, _keyboard navigation_, and _aria-_ attributes are set automatically.
- `tab-button` reveal the element whose identifier is specified in `aria-controls` (the element must be a `tab-item`).
- The `expanded` attribute is assigned to the currently active buttons. The `current` attribute is assigned to the currently active tab-item.
- By default, the _first_ element and _its buttons_ are current and expanded.

You can use the following attributes for more fine-tuning:

```html
<!-- Enables fade mode. -->
<tab-frame fade></tab-frame>

<!-- Change the height of the tab-frame when changing the current tab-item. -->
<tab-frame auto-height></tab-frame>

<!-- 
  Set the current attribute for one of the tab-item so that it and its buttons are active during initialization. 

  If this attribute is not set for any tab-item, the first one in the parent tab-frame will be active.
-->
<tab-item id="some-id" current></tab-item>

<!-- Specify the hover attribute so that the button can be clicked using mouse hover (the mouseenter event). -->
<tab-button aria-controls="some-id" hover></tab-button>
```

# `<toggle-categories>` Web Component <small>(no Shadow DOM)</small>

"Toggles" that control categories of toggle switches with intermediary state for when only some subitems are active.

- Using **Light DOM** allows you to style everything with regular CSS
- Checkboxes fallback (for items only, category toggles need JS to show up at all)
- No dependencies

## Demo

[https://codepen.io/nonsalant/pen/OPJLJoL](https://codepen.io/nonsalant/pen/OPJLJoL)

## Usage

1. Grab the files from the <code>src</code> folder.

2. Load the style and the main script (adjust the paths as needed):
```html
<link rel="stylesheet" href="./src/toggle-categories.css">
<script src="./src/toggle-categories.js"></script>

The script can also be loaded as a module:
```html
<script src="./src/toggle-categories.js" type="module"></script>
```

3. Use it like this:
```html
<toggle-categories>
<ul>
    <li>
        <span>Category Name</span>
        <ul>
        <li><label><input type="checkbox"> Item 1</label></li>
        <li><label><input type="checkbox"> Item 2</label></li>
        </ul>
    </li>
    <li>
        <span>Other Category Name</span>
        <ul>
        <li><label><input type="checkbox"> Item 3</label></li>
        <li><label><input type="checkbox"> Item 4</label></li>
        <li><label><input type="checkbox"> Item 5</label></li>
        </ul>
    </li>
</ul>
</toggle-categories>
```
- 3.1 Use the `checked` attribute to have an item pre-selected:
```html
<li><label><input type="checkbox" checked> Item</label></li>
```
- 3.2 ID's are generated automatically for the checkboxes, but you can also set (some or all of) them manually:
```html
<li><label><input type="checkbox" id="item-1"> Item 1</label></li>
```

## Styling
You can override these CSS custom properties to change the appearance of the component by adding the following CSS anywhere:
```css
toggle-categories ul {
	--toggle-color: #018259;
	--toggle-height: 1rem;
	--toggle-categories-bg: #88888830;
	--toggle-category-color: light-dark(red, hotpink);
	--toggle-category-height: .8rem;
	--toggle-categories--heading-bg: #88888840;
}
```
Note: `ul` added in the selector above for extra specificity, to override the values set in toggle-categories.css.

## Other notes
The `setTimeout(()=>{...})` wrapping the insides of the `connectedCallback()` lifecycle method allows the script to be used as a non-module script tag (in addition to the module option) from anywhere on the page, including the header, by adding a ~4ms delay which should be enough for the DOM to be ready.
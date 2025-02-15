class ToggleCategories extends HTMLElement {
    constructor() {
        super();
        this.uid = this.generateRandomID();
    }

    connectedCallback() {
        setTimeout(() => {
            this.renderCatToggles();
            this.renderItemsAsToggles();
            this.afterFirstRender();
            this.attachEvents();
        });
    }

    renderCatToggles() {
        const categories = this.querySelectorAll('li:not(li li)');
        categories.forEach((cat, i) => {
            const div = cat.querySelector('span');
            const text = div.innerText;
            div.classList.add('toggle-input');
            div.innerHTML = `
					<label for="cat-${i}-${this.uid}">${text}</label>
					<label class="toggle"><input type="checkbox" id="cat-${i}-${this.uid}"><span class="toggle-slider"></span></label>
			`;
        });
    }

    renderItemsAsToggles() {
        const items = this.querySelectorAll('li li');
        items.forEach((item, i) => {
            const checkbox = item.querySelector('input');
            if (!checkbox.hasAttribute('id'))
                checkbox.id = `item-${i}-${this.uid}`;
            const text = item.querySelector('label').innerText;
            item.innerHTML = `
					<div class="toggle-input">
							<label class="toggle">
									<input type="checkbox" id="${checkbox.id}" ${checkbox.checked ? 'checked' : ''}>
									<span class="toggle-slider"></span>
							</label>
							<label for="${checkbox.id}">${text}</label>
					</div>
			`;
        });
    }

    attachEvents() {

        // categories control children
        const toggleCategories = this.querySelectorAll('li:not(li li)');
        toggleCategories.forEach(category => {
            const catCheckbox = category.querySelector('[type=checkbox]');
            catCheckbox.addEventListener('input', () => {
                this.updateItemCheckboxes(category, catCheckbox);
            });
        });

        // children control categories
        const toggleItems = this.querySelectorAll('li li');
        toggleItems.forEach(item => {
            const itemCheckbox = item.querySelector('[type=checkbox]');
            itemCheckbox.addEventListener('input', () => {
                this.updateCatCheckbox(item);
            });
        });

    }

    afterFirstRender() {
        const toggleItems = this.querySelectorAll('li:not(li li)');
        toggleItems.forEach(item => {
            this.updateCatCheckbox(item);
        });
    }

    updateItemCheckboxes(category, catCheckbox) {
        catCheckbox.classList.remove('only-some-active');
        const state = catCheckbox.checked;
        const items = category.querySelectorAll('li');
        items.forEach(item => {
            const itemCheckbox = item.querySelector('[type=checkbox]');
            itemCheckbox.checked = state;
        });
    }

    updateCatCheckbox(item) {
        const cat = item.closest('li:not(li li)');
        // console.log(cat)
        const catCheckbox = cat.querySelector('& > .toggle-input [type=checkbox]');
        const itemsInCat = cat.querySelectorAll('li ul [type=checkbox]');

        const arr = Array.from(itemsInCat);
        if (arr.every(i => i.checked === true)) {
            catCheckbox.checked = true;
            catCheckbox.classList.remove('only-some-active');
        }
        else if (arr.every(i => i.checked === false)) {
            catCheckbox.checked = false;
            catCheckbox.classList.remove('only-some-active');
        }
        else {
            catCheckbox.checked = false;
            catCheckbox.classList.add('only-some-active');
        }
    }

    generateRandomID(length = 6) {
        return Array.from({ length }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
        ).join('');
    }

}

customElements.define('toggle-categories', ToggleCategories);
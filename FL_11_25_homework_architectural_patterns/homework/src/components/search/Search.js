import {$, $c} from '../../utils/dom';
import changeFilter from '../../actions/filter';

export default class Search {
    constructor(store) {
        this.store = store;
    }

    createHeader() {
        const header = $c('header');
        const label = $c('label');
        const searchInput = $c('input');

        label.setAttribute('for', 'searchInput');
        label.textContent = 'Search by name:';

        searchInput.setAttribute('name', 'searchInput');
        searchInput.setAttribute('id', 'searchInput');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Enter user name ...');
        searchInput.addEventListener('input', (e) => {
            this.store.dispatch(changeFilter(e.target.value));
        });

        header.appendChild(label);
        header.appendChild(searchInput);
        header.classList.add('header');

        $('#root').appendChild(header);
    }

    init() {
        this.createHeader();
    }
}
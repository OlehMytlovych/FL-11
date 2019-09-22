import {$, $c} from '../../utils/dom';
import addMore from '../../actions/loadController';

export default class LoadController {
    constructor(store) {
        this.store = store;
    }

    createFooter() {
        const footer = $c('footer');
        const info = $c('p');
        const loadBtn = $c('button');

        info.textContent = `Displayed ${
            this.store.getState().usersToDisplayCounter} users out of ${
            this.store.getState().usersToDisplay.length}`;
        info.setAttribute('id', 'userCounter');

        loadBtn.textContent = 'LOAD MORE';
        loadBtn.addEventListener('click', () => {
            this.store.dispatch(addMore());
        });
        loadBtn.setAttribute('id', 'loadBtn');

        footer.appendChild(info);
        footer.appendChild(loadBtn);
        footer.classList.add('footer');

        $('#root').appendChild(footer);
    }

    updateCounterDisplay() {
        let usersToDisplayCounter = this.store.getState().usersToDisplayCounter;
        const usersToDisplay = this.store.getState().usersToDisplay.length;

        if (usersToDisplayCounter >= usersToDisplay) {
            usersToDisplayCounter = usersToDisplay;
            $('#loadBtn').style.display = 'none';
        } else {
            $('#loadBtn').style.display = 'inline-block';
        }

        $('#userCounter').textContent = `Displayed ${usersToDisplayCounter} users out of ${usersToDisplay}`;
    }

    init() {
        this.createFooter();
        this.store.subscribe(this.updateCounterDisplay.bind(this));
    }
}
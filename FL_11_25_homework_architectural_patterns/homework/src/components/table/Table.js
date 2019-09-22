import {$, $c} from '../../utils/dom';
import getUserRow from './userRow/UserRow';

export default class Table {
    constructor(store) {
        this.store = store;
    }

    createTable() {
        const table = $c('table');
        const thead = $c('thead');
        const tr = $c('tr');

        const th1 = $c('th');
        th1.textContent = 'Photo';

        const th2 = $c('th');
        th2.textContent = 'Name';

        const th3 = $c('th');
        th3.textContent = 'Address';

        const th4 = $c('th');
        th4.textContent = 'Email';

        const th5 = $c('th');
        th5.textContent = 'Phone number';

        const th6 = $c('th');
        th6.textContent = 'Timezone';

        const th7 = $c('th');
        th7.textContent = 'Actions';

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);

        thead.appendChild(tr);
        table.appendChild(thead);
        $('#root').appendChild(table);
    }

    updateTable() {
        const table = $('table');
        const usersToDisplayCounter = this.store.getState().usersToDisplayCounter;
        const usersToDisplay = this.store.getState().usersToDisplay;
        const usersToDisplayLocal = usersToDisplay.filter((user, index) => index < usersToDisplayCounter);

        if (usersToDisplayLocal.length) {
            if ($('tbody')) table.removeChild($('tbody'));
            const tbody = $c('tbody');

            usersToDisplayLocal.map((user) => {
                tbody.appendChild(getUserRow(this.store, user));
            });

            table.appendChild(tbody);
            if ($('#noUsersInfo')) {
                $('#root').removeChild($('#noUsersInfo'));
            }
        } else {
            if ($('tbody')) table.removeChild($('tbody'));

            if (!$('#noUsersInfo')) {
                const info = $c('p');

                info.textContent = 'No Users Are Found';
                info.setAttribute('id', 'noUsersInfo');

                table.insertAdjacentElement('afterend', info);
            }
        }
    }

    init() {
        this.createTable();
        this.store.subscribe(this.updateTable.bind(this));
        this.updateTable();
    }
}
import {$c} from '../../../utils/dom';
import removeUser from '../../../actions/remove';

const getUserRow = (store, user) => {
    const tr = $c('tr');
    const photoTd = $c('td');
    const photo = $c('img');
    const name = $c('td');
    const address = $c('td');
    const email = $c('td');
    const phone = $c('td');
    const timezone = $c('td');
    const actions = $c('td');
    const removeBtn = $c('button');

    photo.setAttribute('src', user.picture);
    photoTd.appendChild(photo);

    name.textContent = user.name;
    address.textContent = user.location;
    email.textContent = user.email;
    phone.textContent = user.phone;
    timezone.textContent = user.timezone;

    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => {
        store.dispatch(removeUser(user.id));
    });
    actions.appendChild(removeBtn);

    tr.appendChild(photoTd);
    tr.appendChild(name);
    tr.appendChild(address);
    tr.appendChild(email);
    tr.appendChild(phone);
    tr.appendChild(timezone);
    tr.appendChild(actions);

    return tr;
};

export default getUserRow;
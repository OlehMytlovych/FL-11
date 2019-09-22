import './style.scss';
import configureStore from './store/configureStore';
import Search from './components/search/Search';
import LoadController from './components/loadController/LoadController';
import Table from './components/table/Table';

const store = configureStore();
const search = new Search(store);
const loadController = new LoadController(store);
const table = new Table(store);

search.init();
loadController.init();
table.init();

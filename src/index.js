import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import Header from './components/header/header';
import Filter from './components/filter/filter';

const header = new Header();
export { header };
new Filter();

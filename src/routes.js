import List from './components/List';
import Create from './components/Create';
import Edit from "./components/Edit";
import _404 from "./components/_404";

export const routes = [
  {path: '/', component: List, name: 'list'},
  {path: '/create', component: Create, name: 'create'},
  {path: '/edit/:id', component: Edit, name: 'edit'},
  {path: '*', component: _404},
];

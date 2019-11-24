import List from './components/List';
import ListSelected from './components/ListSelected';
import Create from './components/Create';
import Edit from "./components/Edit";
import _404 from "./components/_404";

export const routes = [
  {path: '/', redirect: {name: 'list'}},
  {
    path: '/files',
    component: List,
    name: 'list',
    children: [
      {
        path: '/files/:filename',
        component: ListSelected,
        name: 'selected'
      },
    ]
  },
  {path: '/files/:filename/edit', component: Edit, name: 'edit'},
  {path: '/files/create', component: Create, name: 'create'},
  {path: '*', component: _404},
];

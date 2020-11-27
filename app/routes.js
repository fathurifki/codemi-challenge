import Dashboard from './containers/Dashboard';
import Customers from './containers/Customers';
import Account from './containers/Account';
import Products from './containers/Products';

const routes = [
  {
    path: '/home',
    component: Dashboard,
    layout: '/dashboard',
  },
  {
    path: '/customers',
    component: Customers,
    layout: '/dashboard',
  },
  {
    path: '/products',
    component: Products,
    layout: '/dashboard',
  },
  {
    path: '/account',
    component: Account,
    layout: '/dashboard',
  },
];

export default routes;

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Stations',
    path: '/dashboard/stations',
    icon: getIcon('eva:droplet-fill'),
  },



];

export default navConfig;

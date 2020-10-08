import Roster from '../pages/Roster.vue';
import MoreData from "../pages/MoreData";
import PageTransition from '../../../components/PageTransition/index.vue';

const routes =
  [
    {
      path: '/',
      component: PageTransition,
      children: [{
        name: 'Roster',
        path: '',
        component: Roster
      }]
    },
    {
      path: '/moreData',
      component: MoreData
    }
  ];
export default routes;

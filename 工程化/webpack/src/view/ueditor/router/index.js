window.UEDITOR_HOME_URL= UEDITOR_HOME_URL;
window.UEDITOR_INIT_URL= UEDITOR_INIT_URL;
import ueditor from '../pages/Editor';
let routes = [
  {
    path: '/',
    component: ueditor,
    name: 'editor',
    class: 'fa-plug'
  }
];
export default routes;

/**
 * Created by Henry Huang.
 */
import adminRoute from './admin/routesConfig';
import defaultRoute from './default/routesConfig';

const routes = defaultRoute.concat(adminRoute);

export default routes;

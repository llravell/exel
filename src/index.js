import './scss/index.scss';
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/Dashboard/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});

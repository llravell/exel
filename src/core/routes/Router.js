import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/activeRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.currentPage = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.currentPage) {
      this.currentPage.destroy();
      this.$placeholder.clear();
    }

    const [path] = ActiveRoute.path.split('/');
    const param = ActiveRoute.param;
    const Page = this.routes[path];

    if (!Page || (Page.paramsRequired && !param.length)) return;

    this.currentPage = new Page(param);
    this.$placeholder.append(this.currentPage.getRoot());
    this.currentPage.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}

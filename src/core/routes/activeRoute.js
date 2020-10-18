export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    const [, ...param] = ActiveRoute.path
        .split('/')
        .filter((v) => v);
    return param;
  }

  static push(route, params = []) {
    route = route[0] === '#' ? route : `#${route}`;

    const urlParams = params.map((param) => `/${param}`).join('');
    const url = window.location.origin + route + urlParams;

    window.location.href = url;
  }
}

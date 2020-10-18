import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {getInitialState} from '@/redux/initialState';

export class ExcelPage extends Page {
  static paramsRequired = true;

  getRoot() {
    const [id] = this.params;
    const storageName = `excel:${id}`;
    const store = createStore(rootReducer, getInitialState(storageName));

    const stateListener = debounce((state) => {
      console.log('State log', state);
      storage(storageName, state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}

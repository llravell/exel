import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecordsTable} from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const newId = Date.now().toString();

    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${newId}" class="db__create">Новая <br> таблица</a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `);
  }
}

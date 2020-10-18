export const createButtons = (buttons) => buttons
    .map(({icon, action}) => {
      const meta = `data-type="button" data-action="${action}"`;
      return `
        <div class="button" ${meta}>
          <span class="material-icons" ${meta}>
            ${icon}
          </span>
        </div>
      `;
    })
    .join('');

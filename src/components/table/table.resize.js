import {$} from '@core/dom';

const onResize = (e, $root) => {
  const {resize} = e.target.dataset;
  const isCol = resize === 'col';
  const $resizer = $(e.target);

  $resizer.$el.classList.add('active');
  $(document.body).css({userSelect: 'none'});

  const $parent = $resizer.closest('[data-type="resizable"]');
  const cells = isCol ? $root.findAll(`[data-col="${$parent.data.col}"]`) : [];

  const coords = $parent.getCoords();
  const resizeProp = isCol ? 'width' : 'height';
  const moveProp = isCol ? 'right' : 'bottom';

  let delta = 0;

  document.onmousemove = e => {
    delta = isCol
      ? e.pageX - coords.right
      : e.pageY - coords.bottom;

    $resizer.css({[moveProp]: -delta + 'px'});
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    $resizer.$el.classList.remove('active');
    $(document.body).css({userSelect: 'auto'});
    $resizer.css({[moveProp]: 0});

    const value = coords[resizeProp] + delta;
    isCol
      ? cells.forEach((el) => $(el).css({width: value + 'px'}))
      : $parent.css({height: value + 'px'});

    document.onmouseup = null;
  };
};

export {onResize};

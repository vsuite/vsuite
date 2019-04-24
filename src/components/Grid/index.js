import Grid from './Grid.jsx';
import Row from './Row.jsx';
import Col from './Col.jsx';

Grid.Row = Row;
Grid.Col = Col;

Grid.install = function(Vue) {
  Vue.component(Grid.name, Grid);
  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
};

export default Grid;

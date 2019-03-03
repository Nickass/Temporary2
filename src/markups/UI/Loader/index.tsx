import * as React from 'react';
import * as cn from 'classnames';

// assets
import './style.scss';
import { defaultMemoize } from 'reselect';
import { memoize } from 'lodash';

type Props = {
  className?: string;
  count: number;
  duration: number,
  figure: string;
  colors: string[];
};
type State = {
  offset: number;
};

class Loader extends React.Component<Props, State> {
  static defaultProps = {
    count: 26,
    duration: 700,
    colors: ['red', 'yellow', 'white', 'white', 'blue'],
    figure: 'square',
  };
  state = {
    offset: 0,
  };
  intervalId = 0;

  componentDidMount() {
    const { duration } = this.props;

    this.intervalId = setInterval(this.handleInterval, duration);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleInterval = () => {
    const { colors } = this.props;

    this.setState(({offset}) => {
      return {
        offset: (offset + 1 >= colors.length ? 0 : offset + 1)
      }
    });
  }

  calcPosition = memoize(({key, count, figure}) => {
    const radius = 8 * count;
    const rad = Math.PI / 180;
    const angle = (360 / count) * key;
    const sin = Math.sin(rad * angle);
    const cos = Math.cos(rad * angle);
    let bottom = radius * sin;
    let left = radius * cos;

    if (figure === 'square') {
      let side = (count / 4);
      
      let stickLeft = ((key + side / 2) % (side * 2) <= side);
      let stickBottom = ((key + side / 2) % (side * 2) >= side);
      let stickRadius = radius / 1.341592653;
      
      left = stickLeft ? left > 0 ? stickRadius : -stickRadius : left;
      bottom = stickBottom ? bottom > 0 ? stickRadius : -stickRadius : bottom;
    }
    
    return {
      left,
      bottom
    }
  }, (...args) => JSON.stringify(args))

  render() {
    const { colors, className, figure, count } = this.props;
    const { offset } = this.state;

    return (
      <div className={cn(className, 'loader')}>
        {new Array(parseInt(count + '')).fill('').map((item, key) => {
          const { left, bottom } = this.calcPosition({key, count, figure});
          const backgroundColor = colors[(key + offset) % colors.length];
          
          return (
            <span
              className="loader__item"
              key={key}
              style={{
                bottom,
                left,
                backgroundColor
              }} 
            />
          )
        })}
    </div>
    )
  }
}

export default Loader;
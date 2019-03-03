// modules
import * as React from 'react';

// custom
import Loader from 'markups/UI/Loader';

// assets
import './style.scss';


type HomeProps = {
  
};

type State = {
  count: number,
  figure: string,
}

class Home extends React.Component<HomeProps, State> {
  state = {
    figure: 'square',
    count: 12,
  }

  handleCounter = (e: any) => {
    this.setState({count: e.target.value});
  }

  handleFigure = (e: any) => {
    this.setState({figure: e.target.value});
  }

  render () {
    const { count, figure } = this.state;

    return (
      <div className="home">
        <div className="home__controls">
          <label className="home__control">
            Figure
            <select className="home__input" onChange={this.handleFigure} value={figure}>
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </label>
          <label className="home__control">
            Count
            <input className="home__input" type="number" min="1" onChange={this.handleCounter} value={count}/>
          </label>
        </div>
        <Loader className="home__loader" count={count} figure={figure}/>
      </div>
    )
  }
}

export default Home;
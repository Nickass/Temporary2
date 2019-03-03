// modules
import * as React from 'react';

// system
import book from 'system/book';

// custom

// assets
import { Header, Logo } from './assets/styles';


interface HeaderProps {
  className?: any;
};

export default class extends React.Component<HeaderProps> {
  render () {
    const { className } = this.props;

    return (
      <Header className={className}>
        <Logo to={book.home.root()}>
          Hi user!
        </Logo>
      </Header>
    )
  }
}
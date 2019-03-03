// modules
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

// system
import book from 'system/book';

// custom
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import ErrorBoundary from 'widgets/ErrorBoundary';

// assets
import {
  Container,
  centerStyle,
  Header,
  Footer
} from './assets/styles';
import styled from 'styled-components';

type AppProps = {
  
};
type State = {

};

class App extends React.Component<AppProps, State> {
  render () {
    return (
      <Container>
        <Header />
        <ErrorBoundary>
          <Switch>
            <Route path={book.home.root()} component={Home} exact/>
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
        <Footer />
      </Container>
    )
  }
}

export default App;
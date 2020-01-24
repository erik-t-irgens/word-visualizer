
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Container } from "semantic-ui-react";
import NotFound from './SharedComponents/NotFound'
import DataGraph from './views/DataGraph';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='App'
      >
        <Helmet>
          <title>Word Visualization</title>
        </Helmet>
        <BrowserRouter>
          <div>

            {/* <Header /> */}

            <Container fluid style={{ padding: '0 1em' }}>
              <Switch>
                <Route path={'/'} component={DataGraph} />
                <Route path={'/'} status={404} component={NotFound} />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}


export default App
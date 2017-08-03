import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h3>Welcome to React with Bootstrap (i.e., react-bootstrap)</h3>
          </Grid>
        </Jumbotron>
        <div className="vontainer">
          <BodyPane />
          <FooterPane />
        </div>
      </div>
    );
  }
}

export default App;

class BodyPane extends Component {
  render() {
    return (
      <div>
          <br/>
          <p>This is the section below the jumbotron</p>
          <br/>
          <Button bsStyle="primary">Primary</Button>
          <Button bsStyle="success">Success</Button>
          <Button bsStyle="info">Info</Button>
          <Button bsStyle="warning">Warning</Button>
      </div>
    );
  }
};

class FooterPane extends Component {
  render() {
    return (
      <div>
          <br/>
          <hr/>
          <p>This is the footer for page</p>
          <br/>
      </div>
    );
  }
};

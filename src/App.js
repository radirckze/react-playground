import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as db from './__mock__/sample-data';

//Design: using BodyPane (a test app) and TestPane (jemp test area) to test stuff out.
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
        <div>
          <BodyPane />
          <TestPane />
          <FooterPane />
        </div>
      </div>
    );
  }
}

export default App;

// Has 3 sections: member section (memberList), their publications, publication text.
class BodyPane extends React.Component {

  constructor() {
    super();
    this.state = {
      members: [], 
      posts: [],
      selectedPosts: [],
      selectedPost: "",
      //selectedMemberId: 0,
      //selectedPostId: 0,
    };
  }

  setSelectedMember(id) {
    const newSelectedPosts = this.state.posts.filter(post => post.memberId === id);
    this.setState({selectedPosts: newSelectedPosts, selectedPost: ""});
    //alert("new member selected " + this.state.selectedMemberId);
  }

  setSelectedPost(id) {
    const newSelectedPost = this.state.posts.find(post => post.id === id);
    this.setState({selectedPost: newSelectedPost});
  }

  //lets put the data in state
  componentWillMount(){
    this.setState({
      members: db.sampleData.members,
      posts: db.sampleData.posts,
      selectedPosts: [],
      selectedPost: "",
      //selectedMemberId: 0,
      //selectedPostId: 0,
    });
  }

  render() {
    return (
      <div className="container">
        <br/>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <MemberList members={this.state.members} onClick={i => this.setSelectedMember(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationList selectedPosts={this.state.selectedPosts} 
              onClick={i => this.setSelectedPost(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationText post={this.state.selectedPost}/>
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    );
  }
};

class MemberList extends Component {

  render() {
    return (
      <ListGroup>
         {this.props.members.map(function(member){
            return (
              <ListGroupItem key={member.id}
              onClick={() => this.props.onClick(member.id)}>
              {member.name}
              </ListGroupItem>
            );
          }, this)} 
      </ListGroup>
    );
  }
}

class PublicationList extends Component {
  render() {
    return (
       <ListGroup>
        {this.props.selectedPosts.map(function(post){
            return (
              <ListGroupItem key={post.id}
              onClick={() => this.props.onClick(post.id)}>
              {post.title}
              </ListGroupItem>
            );
          }, this)} 
      </ListGroup>
    );
  }
}

class PublicationText extends Component {
  render() {
    return (
      <p>
        {this.props.post.text}
      </p>
    );
  }
}


class TestPane extends Component {
  render() {
    return (
      <div>
        <hr/>
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
        <hr/>
        <br/>
        <p>This is the footer for page</p>
        <br/>
      </div>
    );
  }
};

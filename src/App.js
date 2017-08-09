import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as db from './__mock__/sample-data';
import { getMembers } from './api/restservice';
import { getPosts } from './api/restservice';

const renderLine = (user, key) => <li key={key}><b>{key}</b>: {user[key]}</li>


//structure: section for 2 version of a sample app and and TestPane
class App extends Component {

  constructor (props) {
    super(props)
  }

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
          <AppPaneFileData />
          <AppPaneRestData />
          <TestPane />
          <FooterPane />
        </div>
      </div>
    );
  }
}

export default App;

// The application is simple member / blog app. It has three sections:  
//member section (memberList), their publications, publication text.

//This pane contains the app which uses data from a local file.
class AppPaneFileData extends React.Component {

  constructor(props) {
    super(props);
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
    })
  }

  render() {
    return (
      <div className="container">
        <h4>Sample app using a local data file for data</h4>
        <br/>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <MemberListFD members={this.state.members} onClick={i => this.setSelectedMember(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationListFD selectedPosts={this.state.selectedPosts} 
              onClick={i => this.setSelectedPost(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationTextFD post={this.state.selectedPost}/>
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    );
  }
};

class MemberListFD extends Component {

  constructor (props) {
    super(props)
  }

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

class PublicationListFD extends Component {

  constructor (props) {
    super(props)
  }

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

class PublicationTextFD extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <p>
        {this.props.post.text}
      </p>
    );
  }
}

// ----------------------------
// REST API version of the application
class AppPaneRestData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      membersRD: [], 
      postsRD: [],
      selectedPostsRD: [],
      selectedPostRD: "",
    };
  }

  setSelectedMember(id) {
    const newSelectedPosts = this.state.postsRD.filter(post => post.memberId === id);
    this.setState({selectedPostsRD: newSelectedPosts, selectedPostRD: ""});
    //alert("new member selected " + this.state.selectedMemberId);
  }

  setSelectedPost(id) {
    const newSelectedPost = this.state.postsRD.find(post => post.id === id);
    this.setState({selectedPostRD: newSelectedPost});
  }

  //lets put the data in state
  componentWillMount(){

    getMembers().then(data => {
      this.setState({ membersRD: data.entity })
    });

    getPosts().then(data => {
      this.setState({ postsRD: data.entity })
    });

    this.setState({
      selectedPostsRD: [],
      selectedPostRD: "",
    })
  }

  render() {
    return (
      <div className="container">
        <br/>
        <hr />
        <h4>Sample app using REST API</h4>
        <br />
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <MemberListRD membersRD={this.state.membersRD} onClick={i => this.setSelectedMember(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationListRD selectedPostsRD={this.state.selectedPostsRD} 
              onClick={i => this.setSelectedPost(i)}/>
            </Col>
            <Col xs={6} md={4}>
              <PublicationTextRD postRD={this.state.selectedPostRD}/>
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    );
  }
};

class MemberListRD extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <ListGroup>
         {this.props.membersRD.map(function(member){
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

class PublicationListRD extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
       <ListGroup>
        {this.props.selectedPostsRD.map(function(post){
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

class PublicationTextRD extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <p>
        {this.props.postRD.text}
      </p>
    );
  }
}



class TestPane extends Component {
  
  render() {
    return (
      <div>
        <hr/>
        <h4>A temporary test area</h4>
        <br/>
        <p>This is the section below the jumbotron</p>
        <br/>
        <Button bsStyle="primary">Primary</Button>
        <Button bsStyle="success">Success</Button>
        <Button bsStyle="info">Info</Button>
        <Button bsStyle="warning">Warning</Button>
        <hr />
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

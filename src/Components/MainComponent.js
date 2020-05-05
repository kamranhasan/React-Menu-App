import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreator';


const mapStateToProps = (state) => {
  return {
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders,
    selectedDish : state.selectedDish,
  }
};
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});
class Main extends Component {
  
  constructor(props){
    super(props);
  }
 

  onDishSelect(dishId){
    this.setState({ selectedDish : dishId });
  }

  render(){
      const HomePage= () =>{
          return (
              <Home dish={this.props.dishes.filter((dish) => dish.featured)[0] }
              promotion={this.props.promotions.filter((promotion) => promotion.featured)[0] }
              leader={this.props.leaders.filter((leader) => leader.featured)[0] } />
          );
      }
      const DishWithId = ({match}) => {
        return(
            <DishDetail selectedDish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              addComment={this.props.addComment} />
        );
      };

  return (
    <div>
      <Header />
      <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} onClick={ (dishId) => this.onDishSelect(dishId) } />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
          <Route exact path='/contactus' component={Contact} />
          <Redirect to='/home' />
      </Switch>
      
      <DishDetail selectedDish={this.props.dishes.filter((dish) => dish.id === this.props.selectedDish)[0]}/>
      <Footer />
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

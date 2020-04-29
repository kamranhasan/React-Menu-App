import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from "./HeaderComponent";
import Contact from './ContactComponent';
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import { Switch,Route,Redirect } from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);

    this.state={
      dishes:DISHES,
      selectedDish: null,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }
  onDishSelect(dishId){
    this.setState({ selectedDish : dishId });
  }

  render(){
      const HomePage= () =>{
          return (
              <Home dish={this.state.dishes.filter((dish) => dish.featured)[0] }
              promotion={this.state.promotions.filter((promotion) => promotion.featured)[0] }
              leader={this.state.leaders.filter((leader) => leader.featured)[0] } />
          );
      }
      const DishWithId = ({match}) => {
        return(
            <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };
      // const DishWithId= ({match}) => {
      //   return (
      //     <DishDetail selectedDish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10) )} 
      //     comments={this.state.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))} />
      //   );
      // }

  return (
    <div>
      <Header />
      <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} onClick={ (dishId) => this.onDishSelect(dishId) } />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Redirect to='/home' />
      </Switch>
      
      <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] }/>
      <Footer />
    </div>
  );
}
}

export default Main;
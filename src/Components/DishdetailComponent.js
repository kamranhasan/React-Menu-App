import React, { Container, Component } from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }
    renderDish(dish){
        if (dish != null){
            return(
                <Card className='col-12 col-md-5 m-1'>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>   
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    renderComments(dish){
        if (dish != null){
        if (dish.comments != null ){
            return(
                <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {dish.comments.map(
                            (comment)=> {
                                return (
                                    <ul class="list-unstyled">
                                    <li>{comment.comment}</li>
                                    <ul><li>{comment.author}, {comment.date.split('T')[0]}</li></ul>
                                </ul>   
                                );
                            }
                        )}   
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }}
    render(){
       
        return (
            <div className='container'>
                <div className='row'>
                    {this.renderDish(this.props.selectedDish)}
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
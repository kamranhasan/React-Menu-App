import React from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';


function RenderDish({dish}){
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
function RenderComments({dish}){
    if (dish != null){
        if (dish.comments != null ){
            return (
                <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {dish.comments.map(
                            (comment)=> {
                                return (
                                    <ul class="list-unstyled">
                                    <li>{comment.comment}</li>
                                    <ul><li>{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li></ul>
                                </ul>   
                                );
                            }
                        )}   
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    else{
        return (
            <div></div>
        );
    }  
}

const DishDetail = (props) =>{
    return (
        <div className='container'>
            <div className='row'>
                <RenderDish dish={props.selectedDish} />
                <RenderComments dish={props.selectedDish} />
            </div>
        </div>
    );
}       

export default DishDetail;
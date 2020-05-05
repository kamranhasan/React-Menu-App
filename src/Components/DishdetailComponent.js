import React,{ Component } from 'react';
import { Row,Col,Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Label,Modal,ModalBody,ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required= (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<= len);
const minLength = (len) => (val) => (val) && (val.length>= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }
    toggleModal(){
        this.setState(
            {
                isModalOpen: !this.state.isModalOpen,
            }
            );
    }
    handleComment(values){
        this.toggleModal();
        // console.log(this.props.addComment(this.props.dishId, values.rating, values.author, values.comment));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <>
            <Button outline onClick={this.toggleModal} color='primary'>
                        <span className='fa fa-comments-o fa-lg' >Submit Comment</span>
            </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleComment(values)} >
                        <Row className='form-group'>
                        <Label htmlFor='rating' md={4}>Ratings</Label>
                        <Col md={{size:10, offset:0}}>
                                <Control.select  model='.rating' 
                                name='rating'
                                className='form-control' >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                        <Label htmlFor='author' md={4}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model='.author'
                                 className='form-control'
                                 id='author' name='author' 
                                 placeholder='Your Name' 
                                 validators={{
                                     required,minLength: minLength(3),maxLength:maxLength(15),
                                 }} />
                                 <Errors
                                 className='text-danger'
                                 model='.author'
                                 show='touched'
                                 messages={{
                                     required: 'Required: ',
                                     minLength: 'Must be greater than 2 characters ',
                                     maxLength: 'Must be 15 characters or less ',
                                 }}
                                 />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                        <Label htmlFor='feedback' md={4}>Your Feedback</Label>
                        <Col md={10}>
                                <Control.textarea  model='.message'
                                id='message' 
                                name='message' 
                                row='6'
                                className='form-control' />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col md={{size:10, offset:0}}>
                                <Button type='submit' color='primary' >
                                    Submit Comment
                                </Button>
                            </Col>        
                        </Row>                
                    </LocalForm>
            </ModalBody>
        </Modal>
            </>
        );
    }
}

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
function RenderComments({comments,addComment,dishId}){
        if (comments != null ){
            return (
                <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {comments.map(
                            (comment)=> {
                                return (
                                    <ul class="list-unstyled">
                                    <li>{comment.comment}</li>
                                    <ul><li>{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li></ul>
                                </ul>   
                                );
                            }
                        )}
                        <CommentForm addComment={addComment} dishId={dishId} />   
                </div>
            );
        }
        else{
            return (
                <div>
                    <CommentForm addComment={addComment} dishId={dishId} />
                </div>
            );
        }  
}

const DishDetail = (props) =>{
    if (props.selectedDish!=null){
    return (
        <div className='container'>
            <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.selectedDish.name}</h3>
                        <hr />
                    </div>
                </div>
            <div className='row'>
                <RenderDish dish={props.selectedDish} />
                <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.selectedDish.dishId} />
            </div>
        </div>
    );
}
else{
    return(
        <div></div>
    );
}

}       

export default DishDetail;
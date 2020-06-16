import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Media, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentFormComponent from './CommentFormComponent';
import { Loading } from './LoadingComponent';

function RenderDish({ dish }) {
  return (<Card>
    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
    <CardBody>
      <CardTitle>{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
    </CardBody>
  </Card>
  )
}

function RenderComments({ comments, addComment, dishId }) {
  return comments.map(comment => {
    const timestamp = new Date(comment.date);
    const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(timestamp);
    return (
      <div key="comment.id">
        <Media tag="li">
          <Media body>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {date}</p>
          </Media>
        </Media>
      </div>
    )
  });
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    const dish = props.dish;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
            <CommentFormComponent buttonLabel="Submit Feedback" addComment={props.addComment}
              dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;

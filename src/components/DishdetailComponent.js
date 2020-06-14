import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Media
} from 'reactstrap';
import { Link } from 'react-router-dom';

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

function RenderComments({ comments }) {
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
  console.log(props);
  const dish = props.dish;
  if (dish === null) {
    return (<div></div>);
  }

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
        </div>
      </div>
    </div>
  );
}

export default DishDetail;

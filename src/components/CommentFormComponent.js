/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentFormComponent extends Component {


  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rating: 1,
      comment: '',
      touched: {
        name: false,
      },
      isModalOpen: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(values) {
    this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);  
  }

  toggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {

    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <div className="form-group">
                <Label htmlFor="rating" className="bold">Rating</Label>
                <div>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="name" className="bold">Name</Label>
                <div>
                  <Control.text model=".name" id="name" name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="comment" className="bold">Comment</Label>
                <div>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className="form-control"
                  />
                </div>
              </div>
              <Button color="primary" type="submit" className="modal-footer">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }

}


export default CommentFormComponent;
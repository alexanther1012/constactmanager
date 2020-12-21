import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Consumer } from '../../context';

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  showOnClick = (e) => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  }

  deleteOnClick = async (id, dispatch) => {
    try {
      await axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    } catch(e) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    }
  }

  render() {
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {
          value => {
            const { dispatch } = value;
            return (
              <div className="card card-body mb-3">
                <h4>
                  {name + " "}
                  <FontAwesomeIcon
                    icon={showContactInfo ? faSortUp : faSortDown}
                    onClick={this.showOnClick}
                    style={{ cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => this.deleteOnClick(id,dispatch)}
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "red"
                    }}
                  />
                  <Link to={`contact/edit/${id}`}>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{
                        cursor: "pointer",
                        float: "right",
                        color: "black"
                      }}
                    />
                  </Link>
                </h4>
                {showContactInfo &&
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>}
            </div>
            )
          }
        }
      </Consumer>
      
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default Contact;
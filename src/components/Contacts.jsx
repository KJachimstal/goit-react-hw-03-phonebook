import { Component } from 'react';
import PropTypes from 'prop-types';

export class Contacts extends Component {
  render() {
    if (this.props.contacts.length === 0) {
      return <h4>No contacts avaliable</h4>;
    } else {
      return (
        <ul>
          {this.props.contacts.map(({ name, number, id }) => (
            <li key={id}>
              {name}: {number}{' '}
              <button type="submit" onClick={() => this.props.handleDelete(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

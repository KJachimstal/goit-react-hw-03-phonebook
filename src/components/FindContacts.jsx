import { Component } from 'react';
import PropTypes from 'prop-types';

export class FindContacts extends Component {
  render() {
    const { inputValue } = this.props.filter;
    return (
      <label htmlFor="find" className="form-label">
        Search by name:
        <input
          className="form-input"
          type="text"
          id="find"
          name="filter"
          value={inputValue}
          onChange={this.props.handleChange}
        />
      </label>
    );
  }
}

FindContacts.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

import { Component } from 'react';
import PropTypes from 'prop-types';

export class Section extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
  // placeholder="filter"
  />;
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilter : setFilter }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(VisibilityFilterInput);

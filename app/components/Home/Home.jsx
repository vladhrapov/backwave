import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import * as DataTypesActions from "../../actions/DataTypesActions";

// Components
import Canvas from "./Canvas/Canvas.jsx";

// Styles
import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";

@connect(
  ({ dataTypes }) => ({ dataTypes }),
  (dispatch) => ({
    dataTypesActions: bindActionCreators(DataTypesActions, dispatch)
  })
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dataTypesActions } = this.props;

    dataTypesActions.loadDataTypes();
  }


  render() {
    return (
      <div>
        <Canvas canvasSrv={this.props.canvasSrv} />
      </div>
    );
  }
}

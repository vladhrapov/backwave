import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";
import { compose, withHandlers } from 'recompose'

// Components
import Modal from "./Modal";
import Navigation from "./Navigation";
import Header from "./Header";
import Spinner from "./Spinner";

// Actions
import * as SettingsActions from "../../actions/SettingsActions";

// Services
import CanvasService from "../../services/CanvasService";

// Styles
import "./assets/_styles.scss";

const canvasSrv = new CanvasService();

const enhance = compose(
  withHandlers({
    onToggle: props => event => {
      const { settings, settingsActions } = props;
      const isDrawerOpened = !settings.isDrawerOpened;

      settingsActions.toggleDrawer({ isDrawerOpened });
    }
  })
)

ReactMixin(App.prototype, ReactFire);

function App({ children, onToggle }) {
  let childComponent = React.Children.map(children, child => {
    return React.cloneElement(child, { canvasSrv });
  });

  return (
    <div className="app">
      <Header
        canvasSrv={canvasSrv}
        onToggle={onToggle}
      />
      <Navigation
        canvasSrv={canvasSrv}
        onToggle={onToggle}
      />
      {childComponent}
      <Modal
        canvasSrv={canvasSrv}
      />
      <Spinner />
    </div>
  );
}

export default connect(
  ({ settings }) => ({ settings }),
  (dispatch) => ({
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)(
  enhance(({ children, onToggle }) => App({ children, onToggle }))
  );
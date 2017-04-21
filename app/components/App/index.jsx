import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";
import { compose, withHandlers } from 'recompose'

// Components
import CustomDialog from "./CustomDialog/CustomDialog.jsx";
import LeftDrawer from "./LeftDrawer/LeftDrawer.jsx";
import Header from "./Header/Header.jsx";

// Actions
import * as SettingsActions from "../../actions/SettingsActions";

// Services
import CanvasService from "../../services/CanvasService";

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
    <div>
      <Header
        canvasSrv={canvasSrv}
        onToggle={onToggle}
      />
      <LeftDrawer
        canvasSrv={canvasSrv}
        onToggle={onToggle}
      />
      {childComponent}
      <CustomDialog
        canvasSrv={canvasSrv}
      />
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
import React from 'react';
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";

// Components
import CustomDialog from "./CustomDialog/CustomDialog.jsx";
import LeftDrawer from "./LeftDrawer/LeftDrawer.jsx";
import Header from "./Header/Header.jsx";

// Services
import CanvasService from "../../services/CanvasService";

const canvasSrv = new CanvasService();

function App({ children }) {
  let childComponent = React.Children.map(children, child => {
    return React.cloneElement(child, { canvasSrv });
  });

  return (
    <div>
      <Header
        canvasSrv={canvasSrv}
      />
      <LeftDrawer
        canvasSrv={canvasSrv}
      />
      {childComponent}
      <CustomDialog
        canvasSrv={canvasSrv}
      />
    </div>
  );
}

ReactMixin(App.prototype, ReactFire);

export default App;
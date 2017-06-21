import React, { Component } from "react";

// import DataTypesTable from "./DataTypesTable";

import "./assets/_styles.scss";


import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { browserHistory } from 'react-router';

const recentsIcon = <FontIcon className="muidocs-icon-action-home">Global</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">Data types</FontIcon>;
const nearbyIcon = <IconLocationOn />;


export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedIndex: 0,
  };

  select = (segment) => {
    this.setState({ selectedIndex: segment });
    browserHistory.push(`/settings/${segment}`);
  }

  render() {
    return (
      <div>
        {this.props.children}

        <Paper zDepth={1} className="bottom-navigation">
          <BottomNavigation>
            <BottomNavigationItem
              icon={<ActionInfo />}
              label="Global"
              onTouchTap={(event) => this.select("global")}
            />
            <BottomNavigationItem
              icon={nearbyIcon}
              label="Data types"
              onTouchTap={() => this.select("data_types")}
            />
            {/*<BottomNavigationItem
              label="Logger"
              icon={nearbyIcon}
              onTouchTap={(event) => this.select("logger")}
            />*/}
          </BottomNavigation>
        </Paper>

      </div>
    );
  }
}
import React, { Component } from "react";

// import DataTypesTable from "./DataTypesTable";

import "./assets/_styles.scss";


import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import { browserHistory } from 'react-router';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;


export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedRoute: 0,
  };

  select = (segment) => {
    this.setState({ selectedRoute: segment });
    browserHistory.push(`/settings/${segment}`);
  }

  render() {
    return (
      <div>
        <div>HERE IS SETTINGS</div>
        {this.props.children}

        <Paper zDepth={1} className="bottom-navigation">
          <BottomNavigation selectedRoute={this.state.selectedRoute}>
            <BottomNavigationItem
              label="Data Types"
              icon={recentsIcon}
              onTouchTap={(event) => this.select("data_types")}
            />
            <BottomNavigationItem
              label="Favorites"
              icon={favoritesIcon}
              onTouchTap={() => this.select("favourites")}
            />
            <BottomNavigationItem
              label="Nearby"
              icon={nearbyIcon}
              onTouchTap={(event) => this.select("nearby")}
            />
          </BottomNavigation>
        </Paper>

      </div>
    );
  }
}
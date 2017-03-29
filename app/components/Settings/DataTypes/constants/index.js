import { orange500, blue500, cyan500 } from 'material-ui/styles/colors';

export const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  floatingLabelStyle: {
    color: cyan500,
  },
  floatingLabelFocusStyle: {
    color: cyan500,
  },
  widthAutoTextField: {
    width: "100%"
  },
  rowTextCenter: {
    textAlign: "center"
  },
  buttonsMargin: {
    margin: 12,
  }
};

export const headerRowData = [
  {
    columns: [
      {
        tooltip: "Super Header",
        contentText: "Super Header",
        colSpan: "8",
        style: styles.rowTextCenter
      }
    ]
  },
  {
    columns: [
      {
        tooltip: "The ID",
        contentText: "ID"
      },
      {
        tooltip: "The data type name",
        contentText: "Data type",
        colSpan: "2"
      },
      {
        tooltip: "The minimum amount of the type of data",
        contentText: "Minimum amount"
      },
      {
        tooltip: "The maximum amount of the type of data",
        contentText: "Maximum amount"
      },
      {
        tooltip: "The color of the packet",
        contentText: "Packet color"
      },
      {
        colSpan: "2",
        style: styles.rowTextCenter
      }
    ]
  }
];

export const footerColumnData = [
  {
    name: "id",
    floatingLabelText: "Id",
    disabled: true
  },
  {
    name: "type",
    floatingLabelText: "Data type",
    floatingLabelStyle: styles.floatingLabelStyle,
    floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
    style: styles.widthAutoTextField,
    colSpan: "2"
  },
  {
    name: "minAmount",
    floatingLabelText: "Minimum amount",
    floatingLabelStyle: styles.floatingLabelStyle,
    floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
    style: styles.widthAutoTextField
  },
  {
    name: "maxAmount",
    floatingLabelText: "Maximum amount",
    floatingLabelStyle: styles.floatingLabelStyle,
    floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
    style: styles.widthAutoTextField
  },
  {
    name: "color",
    floatingLabelText: "Packet color",
    floatingLabelStyle: styles.floatingLabelStyle,
    floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
    style: styles.widthAutoTextField
  },
  {
    label: "Add",
    primary: true,
    style: styles.buttonsMargin,
    columnStyle: styles.rowTextCenter,
    colSpan: "2"
  }
];
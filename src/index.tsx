import React from "react";
import ReactDom from "react-dom";
import { Routing } from "./components/Routing";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Dayjs } from "dayjs";
import Utils from "@date-io/dayjs";
import { BrowserRouter } from "react-router-dom";
import "dayjs/locale/ja";

class ExtendedUtils extends Utils {
  getCalendarHeaderText(date: Dayjs) {
    return date.format("YYYY年 MMM");
  }

  getDateTimePickerHeaderText(date: Dayjs) {
    return date.format("M/D");
  }
}

ReactDom.render(
  <MuiPickersUtilsProvider utils={ExtendedUtils} locale="ja">
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById("container"),
);

import * as React from "react";
import { ISpeedPointTestProps } from "./ISpeedPointTestProps";
import SpeedForm from "../new_component/SpeedForm";
require("speedpoint_core");
require("test");

export default class SpeedPointTest extends React.Component<ISpeedPointTestProps, {}> {
  public render(): React.ReactElement {
    return (
      <>
       <SpeedForm />
      </>
    );
  }
}
import _ from "lodash";
import { ParamType } from "./param-type";

export abstract class OldContainer {
  public readonly value: number;
  public readonly pretties: string;
  public readonly parentValues: OldContainer[];

  constructor(input: ParamType<OldContainer>) {
    this.value = input.value;
    this.pretties = input.pretties;
    this.parentValues = input.parentValues;
  }

  public depth(): number {
    return Math.max(0, ...this.parentValues.map(parent => parent.depth())) + 1;
  }

  public dice(): number {
    return this.dicePassthru();
  }

  protected dicePassthru(): number {
    return _.sum([0, ...this.parentValues.map(parent => parent.dice())]);
  }
}
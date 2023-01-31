import { Option } from './option.model';

export class OptionGroup {

  /**
   *
   * @param {number | string} value
   * @param {string} label
   * @param {Option[]} items
   */
  constructor(
    public value: number | string,
    public label: string,
    public items: Option[]
  ) {}

}

import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
    name: 'plainText'
})
export class PlainTextPipe implements PipeTransform {
  transform(target: any) {
    const text = _.isString(target) ? target : target.value;
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}

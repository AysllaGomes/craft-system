import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, ellipsis = '...') {
    const newValue = value.replace(/\s+/gm,' ').trim();

    return newValue.length > limit
      ? `${newValue.substr(0, limit)}${ellipsis}`
      : value;
  }

}

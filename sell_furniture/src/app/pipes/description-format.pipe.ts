import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionFormat',
  standalone: true
})
export class DescriptionFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Replace "- " with HTML line breaks
    return value.replace(/- /g, '<br> - ');
  }
}

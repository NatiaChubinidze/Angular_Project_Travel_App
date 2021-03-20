import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'htmldecoder'
})
export class HtmldecoderPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
     var doc = new DOMParser().parseFromString(value, "text/html");
     const newValue = doc.documentElement.textContent;
    return this.sanitized.bypassSecurityTrustHtml(newValue);
  }

}
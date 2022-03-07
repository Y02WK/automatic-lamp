import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxLength]',
})
export class MaxLengthDirective {
  @Input() appMaxLength!: string;

  constructor() {}

  @HostListener('keydown', ['$event']) onKeydown(event: {
    target: { value: any };
    which: any;
    keycode: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    const value = event.target.value;
    const maxLength = parseInt(this.appMaxLength);
    const keycode = event.which || event.keycode;
    const allowedKeycodes = [8, 13, 46, 37, 38, 39, 40];
    const keyCodeIndex = allowedKeycodes.indexOf(keycode);
    if (value.length > maxLength - 1 && keyCodeIndex === -1) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

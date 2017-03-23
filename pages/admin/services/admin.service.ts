import { Injectable } from '@angular/core';
@Injectable()
export class AdminService {
  hidden_xs_down = "hidden-xs-down";
  onClickMenuMore() {
      this.hidden_xs_down = this.hidden_xs_down ? null : 'hidden-xs-down';
  }
}
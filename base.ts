import { Api } from './api';
export class Base extends Api {
    constructor( public http ) {
      super( http );
    }
}

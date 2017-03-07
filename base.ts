import { Injectable } from '@angular/core';
import { Api } from './api';
export class Base extends Api {
    constructor( http ) {
      super( http );
    }
}
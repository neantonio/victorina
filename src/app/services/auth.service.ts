import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'YOUR_CLIENT_ID',
    domain: 'YOUR_AUTH0_DOMAIN',
    responseType: 'token id_token',
    audience: 'https://YOUR_AUTH0_DOMAIN/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  

  

}
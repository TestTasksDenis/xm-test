import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
  useValue: environment,
})
export class Environment {
  backendUrl = '';
  production = false;
}

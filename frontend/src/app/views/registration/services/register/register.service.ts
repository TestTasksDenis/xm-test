import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegistrationField } from '../../types/field-registration.interface';
import { Environment } from '../../../../tokens/environment.token';
import { RegistrationRequest } from '../../types/registration-request.interface';
import { Token } from '../../../../types/token.interface';

@Injectable()
export class RegisterService {
  private readonly url = `${this.environment.backendUrl}/register`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment,
  ) { }

  getRegistrationFields(): Observable<RegistrationField[]> {
    return this.httpClient.get<RegistrationField[]>(`${this.url}/rules`);
  }

  registerUser(body: RegistrationRequest): Observable<{user: RegistrationRequest, token: Token}> {
    return this.httpClient.post<{user: RegistrationRequest, token: Token}>(`${this.url}/register`, body);
  }
}

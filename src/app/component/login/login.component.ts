import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  httpService = inject(HttpServiceService);
  router = inject(Router);
  authToken: string | null = null;
  authForm = this.builder.group({
    url: ['', [Validators.required]],
    clientId: ['', [Validators.required]],
    clientSecret: ['', [Validators.required]],
  });

  GetAuthToken() {
    const url = this.authForm.value.url!;
    const clientId = this.authForm.value.clientId!;
    const clientSecret = this.authForm.value.clientSecret!;
    this.httpService.getAuthToken(url, clientId, clientSecret).subscribe((result) => {
      console.log(result);
      this.authToken = result.authToken;
      localStorage.setItem('authToken', result.authToken);
    });
  }
  copyToken() {
  if (this.authToken) {
    navigator.clipboard.writeText(this.authToken);
  }
}
}

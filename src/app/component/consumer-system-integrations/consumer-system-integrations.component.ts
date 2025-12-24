import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpServiceService } from '../../http-service.service';

@Component({
  selector: 'app-consumer-system-integrations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './consumer-system-integrations.component.html',
})
export class ConsumerSystemIntegrationsComponent implements OnInit {

  loading = false;

  rows: any[] = [];
  displayedColumns: string[] = [];

  // Cursor pagination
  endCursor = '';
  hasNextPage = false;

  form = this.fb.group({
    integrationId: [''],   // optional
    pageSize: [0],
    cursor: [''],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // Load all on page init
  // =============================
  ngOnInit(): void {
    this.loadIntegrations();
  }

  // =============================
  // Manual fetch
  // =============================
  getIntegrations(): void {
    const integrationId = this.form.value.integrationId?.trim() ?? '';
    this.loadIntegrations(integrationId, true);
  }

  // =============================
  // Load next page (cursor-based)
  // =============================
  loadNextPage(): void {
    this.form.patchValue({ cursor: this.endCursor });
    this.loadIntegrations(this.form.value.integrationId ?? '', false);
  }

  // =============================
  // Core loader
  // =============================
  private loadIntegrations(
    integrationId: string = '',
    reset: boolean = true
  ): void {
    const { pageSize, cursor } = this.form.value;

    this.loading = true;

    if (reset) {
      this.rows = [];
      this.displayedColumns = [];
      this.endCursor = '';
      this.hasNextPage = false;
    }

    this.httpService
      .getIntegrations(integrationId, pageSize!, cursor!)
      .subscribe({
        next: (res: any) => {
          const data = res?.systemIntegrations ?? [];
          const pageInfo = res?.pageInfo;

          // Append for pagination
          this.rows = reset ? data : [...this.rows, ...data];

          if (this.rows.length > 0) {
            this.displayedColumns = Object.keys(this.rows[0]);
          }

          // Cursor info
          this.endCursor = pageInfo?.endCursor ?? '';
          this.hasNextPage = pageInfo?.hasNextPage ?? false;
        },
        error: (err) => {
          console.error('Failed to load system integrations', err);
          this.rows = [];
          this.displayedColumns = [];
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpServiceService } from '../../http-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-get-connections',
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
  templateUrl: './get-connections.component.html',
})
export class GetConnectionsComponent implements OnInit {
loading = false;
  rows: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    connectionId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // Load all connections on page load
  // =============================
  ngOnInit(): void {
    this.loadConnections();
  }

  // =============================
  // Button click handler
  // =============================
  getConnections(): void {
    const connectionId = this.form.value.connectionId?.trim() ?? '';
    this.loadConnections(connectionId);
  }

  // =============================
  // Core loader
  // =============================
  private loadConnections(connectionId: string = ''): void {
    this.loading = true;
    this.httpService.getConnections(connectionId).subscribe({
      next: (res: any) => {

        // Case 1: List response
        if (Array.isArray(res?.data)) {
          this.rows = res.data;
        }
        // Case 2: Single connection response
        else if (res?.data) {
          this.rows = [res.data];
        }
        else {
          this.rows = [];
        }

        // Dynamic columns
        this.displayedColumns =
          this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
      },
      error: (err) => {
        console.error('Failed to load connections', err);
        this.rows = [];
        this.displayedColumns = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

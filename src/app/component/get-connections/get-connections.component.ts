import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpServiceService } from '../../http-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator,MatPaginatorModule  } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
    MatPaginatorModule,
  ],
  templateUrl: './get-connections.component.html',
})
export class GetConnectionsComponent implements OnInit {
  loading = false;
  rows: any[] = [];
  displayedColumns: string[] = [];
  displayedColumnsWithActions: string[] = [];
  showCreateForm = false;
 dataSource = new MatTableDataSource<any>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  form = this.fb.group({
    connectionId: [''],
  });

createForm = this.fb.group({
    connectionName: [''],
    description: [''],
    integrationId: [''],
    environmentId: [''],
    pluginType: [''],
    pluginId: [''],
    transportType: [''],
    serviceUrl: [''],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.loadConnections();
  }

  getConnections(): void {
    const connectionId = this.form.value.connectionId?.trim() ?? '';
    this.loadConnections(connectionId);
  }

  private loadConnections(connectionId: string = ''): void {
    this.loading = true;

    this.httpService.getConnections(connectionId).subscribe({
      next: (res: any) => {
        if (Array.isArray(res?.data)) {
          this.rows = res.data;
        } else if (res?.data) {
          this.rows = [res.data];
        } else {
          this.rows = [];
        }

        this.displayedColumns =
          this.rows.length > 0 ? Object.keys(this.rows[0]) : [];

        this.displayedColumnsWithActions = [
          ...this.displayedColumns,
          'actions',
        ];
      },
      error: (err) => {
        console.error('Failed to load connections', err);
        this.rows = [];
        this.displayedColumns = [];
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // =============================
  // View Connection
  // =============================
  viewConnection(connectionId: string): void {
    this.form.patchValue({ connectionId });
    this.loadConnections(connectionId);
  }

  // =============================
  // Delete Connection
  // =============================
  deleteConnection(connectionId: string): void {
    if (!confirm('Are you sure you want to delete this connection?')) {
      return;
    }

    this.loading = true;

    this.httpService.deleteConnection(connectionId).subscribe({
      next: () => {
        // Reload all connections after delete
        this.form.reset();
        this.loadConnections();
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.loading = false;
      },
    });
  }

   // =============================
  // Create Connection (FORM BASED)
  // =============================
  submitCreateConnection(): void {
    if (this.createForm.invalid) return;

    const payload = {
      connectionName: this.createForm.value.connectionName,
      description: this.createForm.value.description,
      integrationId: this.createForm.value.integrationId,
      environmentId: this.createForm.value.environmentId,
      transportType: this.createForm.value.transportType,
      serviceUrl: this.createForm.value.serviceUrl,
      pluginConfiguration: {
        type: this.createForm.value.pluginType,
        id: this.createForm.value.pluginId,
      },
    };

    this.loading = true;

    this.httpService.addConnection(payload).subscribe({
      next: () => {
        this.createForm.reset();
        this.showCreateForm = false;
        this.loadConnections(); // 👈 reload all
      },
      error: (err) => {
        console.error('Create failed', err);
        this.loading = false;
      },
    });
  }
}

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
  selector: 'app-consumer-data-object-queries',
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
  templateUrl: './consumer-data-object-queries.component.html',
})
export class ConsumerDataObjectQueriesComponent implements OnInit {

  loading = false;

  rows: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    offset: [0],
    pageSize: [10],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {

  }

  // =============================
  // API Call
  // =============================
  getQueries(): void {
    const { offset, pageSize } = this.form.value;

    this.loading = true;
    this.rows = [];
    this.displayedColumns = [];

    this.httpService
      .dataObjectQueries(offset!, pageSize!)
      .subscribe({
        next: (res: any) => {
          const items = res?.result?.items ?? [];

          // ✅ Flatten dataObjectType
          this.rows = items.map((item: any) => ({
            id: item.id,
            systemName: item.systemName,
            localizedName: item.localizedName,

            // Flattened fields
            dataObjectTypeId: item.dataObjectType?.id,
            dataObjectTypeSystemName: item.dataObjectType?.systemName,
            dataObjectTypeLocalizedName: item.dataObjectType?.localizedName,
          }));

          this.displayedColumns =
            this.rows.length > 0
              ? Object.keys(this.rows[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load data object queries', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

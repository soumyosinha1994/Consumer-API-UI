import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpServiceService } from '../../http-service.service';

@Component({
  selector: 'app-consumer-execute-data-object-queries',
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
  templateUrl: './consumer-execute-data-object-queries.component.html',
})
export class ConsumerExecuteDataObjectQueriesComponent {

  loading = false;

  rows: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    queryId: ['', Validators.required],
    offset: [0],
    pageSize: [10],

    // Single query field (can be extended to dynamic list later)
    dataObjectFieldTypeId: ['', Validators.required],
    value: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // Execute Query
  // =============================
  executeQuery(): void {
    if (this.form.invalid) return;

    const {
      queryId,
      offset,
      pageSize,
      dataObjectFieldTypeId,
      value,
    } = this.form.value;

    const payload = {
      queryFields: [
        {
          dataObjectFieldTypeId,
          value,
        },
      ],
    };

    this.loading = true;
    this.rows = [];
    this.displayedColumns = [];

    this.httpService
      .executeDataObjectsQueries(payload, queryId!, offset!, pageSize!)
      .subscribe({
        next: (res: any) => {
          const items = res?.result?.items ?? [];

          // =============================
          // FLATTEN RESPONSE
          // =============================
          const flattenedRows: any[] = [];
          const columnSet = new Set<string>();

          items.forEach((item: any) => {
            const row: any = {
              id: item.id,
              dataObjectTypeId: item.dataObjectTypeId,
            };

            columnSet.add('id');
            columnSet.add('dataObjectTypeId');

            item.dataObjectFields?.forEach((field: any) => {
              const columnName =
                field.dataObjectFieldType?.systemName ??
                `field_${field.dataObjectFieldType?.id}`;

              row[columnName] = field.value;
              columnSet.add(columnName);
            });

            flattenedRows.push(row);
          });

          this.rows = flattenedRows;
          this.displayedColumns = Array.from(columnSet);
        },
        error: (err) => {
          console.error('Failed to execute data object query', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

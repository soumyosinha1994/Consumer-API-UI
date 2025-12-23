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
  selector: 'app-consumer-data-object-queries-by-id',
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
  templateUrl: './consumer-data-object-queries-by-id.component.html',
})
export class ConsumerDataObjectQueriesByIdComponent {

  loading = false;

  rows: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    queryId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // API Call
  // =============================
  getQueryById(): void {
    if (this.form.invalid) return;

    const { queryId } = this.form.value;

    this.loading = true;
    this.rows = [];
    this.displayedColumns = [];

    this.httpService
      .getDataObjectsQueriesById(queryId!)
      .subscribe({
        next: (res: any) => {
          const result = res?.result;
          if (!result) return;

          const queryMeta = {
            queryId: result.id,
            querySystemName: result.systemName,
            queryLocalizedName: result.localizedName,
          };

          const dataObjectType = {
            dataObjectTypeId: result.dataObjectType?.id,
            dataObjectTypeSystemName: result.dataObjectType?.systemName,
            dataObjectTypeLocalizedName: result.dataObjectType?.localizedName,
          };

          const fieldTypes = result.dataObjectQueryFieldTypes ?? [];

          // ✅ FULLY FLATTENED ROWS
          this.rows = fieldTypes.map((item: any) => ({
            ...queryMeta,
            ...dataObjectType,

            // Flatten dataObjectFieldType
            fieldTypeId: item.dataObjectFieldType?.id,
            fieldSystemName: item.dataObjectFieldType?.systemName,
            fieldLocalizedName: item.dataObjectFieldType?.localizedName,
            fieldDataType: item.dataObjectFieldType?.dataType,

            // Constraints
            minValue: item.minValue,
            maxValue: item.maxValue,
          }));

          this.displayedColumns =
            this.rows.length > 0
              ? Object.keys(this.rows[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load data object query by id', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

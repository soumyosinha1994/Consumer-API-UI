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
  selector: 'app-consumer-fields',
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
  templateUrl: './consumer-fields.component.html',
})
export class ConsumerFieldsComponent {

  loading = false;

  response: any;
  simpleFields: any[] = [];
  displayedColumns: string[] = [];
  flattenedSimpleFields: any[] = [];

  form = this.fb.group({
    contentId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private consumerService: HttpServiceService
  ) {}

  // =============================
  // Get Fields
  // =============================
  getFields(): void {
    if (this.form.invalid) return;

    this.loading = true;

    // Reset state
    this.response = null;
    this.simpleFields = [];
    this.flattenedSimpleFields = [];
    this.displayedColumns = [];

    this.consumerService
      .getConsumerFields(this.form.value.contentId!)
      .subscribe({
        next: (res: any) => {
          const simpleFields = res?.result?.simpleFields ?? [];

          this.response = res;
          this.simpleFields = simpleFields;
          this.flattenedSimpleFields = this.flattenSimpleFields(simpleFields);

          this.displayedColumns =
            this.flattenedSimpleFields.length > 0
              ? Object.keys(this.flattenedSimpleFields[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load consumer fields', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private flattenSimpleFields(simpleFields: any[]): any[] {
    return simpleFields.map((field) => ({
      // Root
      id: field.id,
      value: field.values?.join(', '),

      // Definition
      localizedName: field.definition?.localizedName,
      systemName: field.definition?.systemName,
      isMasked: field.definition?.isMasked,
      dataType: field.definition?.dataTypeInfo?.dataType,

      // Context
      isRequired: field.definition?.contextProperties?.isRequired,
      isReadOnly: field.definition?.contextProperties?.isReadOnly,

      // Constraints
      maxLength: field.definition?.dataTypeInfo?.maxCharLength,
      minLength: field.definition?.dataTypeInfo?.minCharLength,
    }));
  }
}

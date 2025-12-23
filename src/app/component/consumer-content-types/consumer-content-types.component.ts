import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpServiceService } from '../../http-service.service';

@Component({
  selector: 'app-consumer-content-types',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './consumer-content-types.component.html',
})
export class ConsumerContentTypesComponent {

  loading = false;

  // Header info
  contentTypeInfo: any = null;

  // Tables
  simpleFieldTypes: any[] = [];
  complexFieldTypes: any[] = [];

  simpleDisplayedColumns: string[] = [];
  complexDisplayedColumns: string[] = [];

  form = this.fb.group({
    contentTypeId: ['', Validators.required],
    operation: ['Search', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // API Call
  // =============================
  getContentType(): void {
    if (this.form.invalid) return;

    const { contentTypeId, operation } = this.form.value;

    this.loading = true;
    this.resetData();

    this.httpService
      .getContentType(operation!, contentTypeId!)
      .subscribe({
        next: (res: any) => {
          const result = res?.result;

          if (!result) return;

          // Header info
          this.contentTypeInfo = {
            id: result.id,
            localizedName: result.localizedName,
            systemName: result.systemName,
          };

          // Simple Field Types
          this.simpleFieldTypes = result.simpleFieldTypes ?? [];
          this.simpleDisplayedColumns =
            this.simpleFieldTypes.length > 0
              ? Object.keys(this.simpleFieldTypes[0])
              : [];

          // Complex Field Types
          this.complexFieldTypes = result.complexFieldTypes ?? [];
          this.complexDisplayedColumns =
            this.complexFieldTypes.length > 0
              ? Object.keys(this.complexFieldTypes[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load content type', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private resetData(): void {
    this.contentTypeInfo = null;
    this.simpleFieldTypes = [];
    this.complexFieldTypes = [];
    this.simpleDisplayedColumns = [];
    this.complexDisplayedColumns = [];
  }
}

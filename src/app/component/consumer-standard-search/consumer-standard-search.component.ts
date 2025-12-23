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
  selector: 'app-consumer-standard-search',
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
  templateUrl: './consumer-standard-search.component.html',
})
export class ConsumerStandardSearchComponent {

  loading = false;

  rows: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    contentTypeGroupId: ['', Validators.required],
    contentTypeId: ['', Validators.required],
    minCreationDate: ['', Validators.required],
    maxCreationDate: ['', Validators.required],
    offset: [0],
    pageSize: [10],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // Standard Search
  // =============================
  search(): void {
    if (this.form.invalid) return;

    const {
      contentTypeGroupId,
      contentTypeId,
      minCreationDate,
      maxCreationDate,
      offset,
      pageSize,
    } = this.form.value;

    const payload = {
      contentTypeGroupId,
      contentTypeId,
      minCreationDate,
      maxCreationDate,
    };

    this.loading = true;
    this.rows = [];
    this.displayedColumns = [];

    this.httpService
      .standardSearch(payload, offset!, pageSize!)
      .subscribe({
        next: (res: any) => {
          const items = res?.result?.items ?? [];

          // ✅ FLATTEN contentProperties
          this.rows = items.map((item: any) => ({
            id: item.id,
            name: item.name,

            createdBy: item.contentProperties?.createdBy,
            createdOn: item.contentProperties?.createdOn,
            lastModifiedBy: item.contentProperties?.lastModifiedBy,
            lastModifiedOn: item.contentProperties?.lastModifiedOn,
          }));

          this.displayedColumns =
            this.rows.length > 0
              ? Object.keys(this.rows[0])
              : [];
        },
        error: (err) => {
          console.error('Standard search failed', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

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
  selector: 'app-consumer-content-type-groups',
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
  templateUrl: './consumer-content-type-groups.component.html',
})
export class ConsumerContentTypeGroupsComponent {

  loading = false;

  // Table state
  items: any[] = [];
  displayedColumns: string[] = [];

  // Form
  form = this.fb.group({
    operation: ['Search', Validators.required],
    offset: [0],
    pageSize: [16],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // API Call
  // =============================
  getContentTypeGroups(): void {
    if (this.form.invalid) return;

    const { operation, offset, pageSize } = this.form.value;

    this.loading = true;

    // Reset state
    this.items = [];
    this.displayedColumns = [];

    this.httpService
      .getContentTypeGroups(operation!, offset!, pageSize!)
      .subscribe({
        next: (res: any) => {
          // 🔑 ONLY extract items[]
          this.items = res?.result?.items ?? [];

          this.displayedColumns =
            this.items.length > 0
              ? Object.keys(this.items[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load content type groups', err);
          this.items = [];
          this.displayedColumns = [];
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

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
  selector: 'app-consumer-content-type-groups-by-id',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './consumer-content-type-groups-by-id.component.html',
})
export class ConsumerContentTypeGroupsByIdComponent {

  loading = false;

  contentTypes: any[] = [];
  displayedColumns: string[] = [];

  form = this.fb.group({
    contentTypeGroupId: ['', Validators.required],
    operation: ['Search'],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  // =============================
  // API Call
  // =============================
  getContentTypesGroupsById(): void {
    if (this.form.invalid) return;

    const { contentTypeGroupId, operation } = this.form.value;

    this.loading = true;
    this.contentTypes = [];
    this.displayedColumns = [];

    this.httpService
      .getContentTypeGroupsById(operation!,contentTypeGroupId!)
      .subscribe({
        next: (res: any) => {
          this.contentTypes = res?.result?.contentTypes ?? [];

          this.displayedColumns =
            this.contentTypes.length > 0
              ? Object.keys(this.contentTypes[0])
              : [];
        },
        error: (err) => {
          console.error('Failed to load content types', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

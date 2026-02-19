import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeLast, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  })

  public categoriesDatas: Array<GetCategoriesResponse> = [];
  public selectedCategory: Array<{ name: string, code: string }> = [];

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categoriesDatas = response;
        },
        // error: (err) => {
        //   console.error('Error fetching categories:', err);
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load categories.' });
        // }
      });
  }

  handleSubmitAddProduct(): void {

  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

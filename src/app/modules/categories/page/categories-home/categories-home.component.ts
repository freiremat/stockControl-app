import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categoriesDatas: Array<GetCategoriesResponse> = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao buscar categorias.'
            });
          this.router.navigate(['/dashboard'])
        },
      })
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir a categoria: ${event?.category_name}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCategory(event?.category_id)
      });
    }
  }

  deleteCategory(category_id: string): void {
    if (category_id) {
      this.categoriesService.deleteCategory({ category_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Categoria excluída com sucesso.',
                life: 2000,
              });

          },
          error: (err) => {
            console.log(err);
            this.messageService.add(
              {
                severity: 'error',
                summary: 'Error',
                detail: 'Erro ao excluir categoria.'
              });
          },
        })
      // Refresh the categories list after deletion
      this.getAllCategories();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

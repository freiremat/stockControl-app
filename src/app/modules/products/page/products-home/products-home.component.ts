import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private messaegeService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  getServiceProductsData() {
    const productsLoaded = this.productsDataTransferService.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsList = productsLoaded;
    } else {
      this.getAPIProductsDatas();
    }
  }

  getAPIProductsDatas() {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productsList = response;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.messaegeService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao carregar produtos. Redirecionando para tela de dashboard.',
            life: 2500,
          })
          this.router.navigate(['/dashboard']);
        }
      });
  }

  handleProductAction(event: EventAction): void {
    console.log('teste', event)
  }

  handleDeleteProductAction(event: { product_id: string, product_name: string }): void {
    console.log('sucesso o delete', event)
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.product_name}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.DeleteProduct(event?.product_id)
      })
    }
  }

  DeleteProduct(product_id: string) {
    if (product_id) {
      this.productsService.deleteProduct(product_id)
        .pipe(
          takeUntil((this.destroy$))
        ).subscribe({
          next: (response) => {
            if (response) {
              this.messaegeService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso',
                life: 2500,
              })
              // chamar para atualizar a lista, do contrario apos a remocao, o dado ainda permaneceria em tela
              this.getAPIProductsDatas();
            }
          }, error: (err) => {
            this.messaegeService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto',
              life: 2500
            })
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

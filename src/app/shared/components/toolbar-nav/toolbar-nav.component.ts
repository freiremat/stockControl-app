import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductEvent } from 'src/app/models/enums/products/productEvent';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';

@Component({
  selector: 'app-toolbar-nav',
  templateUrl: './toolbar-nav.component.html',

})
export class ToolbarNavComponent {

  constructor(private cookie: CookieService, private router: Router, private dialogService: DialogService) { }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/home'])
  }

  handleSaleProduct(): void {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

    this.dialogService.open(ProductFormComponent, {
      header: saleProductAction,
      width: '70%',
      contentStyle: { overflwow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductAction }
      }
    })
  }

}
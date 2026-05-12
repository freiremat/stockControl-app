import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavComponent } from './components/toolbar-nav/toolbar-nav.component';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';


@NgModule({
  declarations: [ToolbarNavComponent, ShortenPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //primeng
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  exports: [ToolbarNavComponent, ShortenPipe],
  providers: [DialogService, CurrencyPipe]
})

export class SharedModule { }

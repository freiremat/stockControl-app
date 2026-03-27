import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
@Input() public categories: Array<GetCategoriesResponse> = [];
@Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
@Output() public deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>();

public categorySelected!: GetCategoriesResponse;
public  addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  constructor() { }

  handleDeleteCategory(category_id: string, category_name: string): void {
    if(category_id !== '' && category_name !== '') {
      this.deleteCategoryEvent.emit({category_id, category_name});
    }
  }
}

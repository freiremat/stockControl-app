import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-nav',
  templateUrl: './toolbar-nav.component.html',

})
export class ToolbarNavComponent {

  constructor(private cookie: CookieService, private router: Router) { }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/home'])
  }

}

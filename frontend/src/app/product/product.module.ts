import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared';
import { ProductRoutingModule } from './product-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { UserProductComponent } from './myProduct/userproduct.component';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
  ProductComponent,
  UserProductComponent
  ],
  providers: [

  ]
})
export class ProductModule {}

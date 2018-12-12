import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }

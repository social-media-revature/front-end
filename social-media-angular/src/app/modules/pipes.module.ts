import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObscenityPipe } from '../pipes/obscenity.pipe';

@NgModule({
  declarations: [ObscenityPipe],
  imports: [
    CommonModule,

  ],
  exports: [
    ObscenityPipe
  ]
})
export class PipesModule { }
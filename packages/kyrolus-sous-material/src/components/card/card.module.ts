import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CardActionsComponent } from './card-actions.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';
import { CardTitleComponent } from './card-title.component';
import { CardSubtitleComponent } from './card-subtitle.component';
import { CardHeaderComponent } from './card-header.component';

const components = [
  CardComponent,
  CardActionsComponent,
  CardContentComponent,
  CardFooterComponent,
  CardTitleComponent,
  CardSubtitleComponent,
  CardHeaderComponent,
];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class CardModule {}

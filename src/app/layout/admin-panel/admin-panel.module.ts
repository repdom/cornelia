import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule,
        MatPaginatorModule,
        MatSortModule, MatListModule, MatSelectModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UrlService } from '../../services/url/url.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpModule,
    MatListModule,
    Ng2Charts,
    MatSelectModule,
    NgxQRCodeModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})

  ],
  providers: [
    UsuarioService,
    CookieService,
    UrlService
  ]
})
export class AdminPanelModule { }

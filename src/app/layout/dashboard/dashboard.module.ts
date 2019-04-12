import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AcortadorComponent } from './acortador/acortador.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule,
        MatPaginatorModule,
        MatSortModule, MatListModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AcortarService } from '../../services/acortador/acortar.service';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { TablaurlComponent } from './tablaurl/tablaurl.component';
import { StatsService } from '../../services/services/stats.service';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
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
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent, AcortadorComponent, TablaurlComponent],
    providers: [
        AcortarService,
        StatsService,
        DatePipe
    ]
})
export class DashboardModule {}

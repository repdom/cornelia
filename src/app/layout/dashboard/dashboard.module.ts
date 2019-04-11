import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AcortadorComponent } from './acortador/acortador.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent, AcortadorComponent]
})
export class DashboardModule {}

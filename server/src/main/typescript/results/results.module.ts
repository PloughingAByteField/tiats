import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateModule } from 'ng2-translate';

import { Ng2PaginationModule } from 'ng2-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RacesService } from '../races/races.service';
import { RacesHttpService } from '../races/races-http.service';
import { EntriesService } from '../entries/entries.service';
import { EntriesHttpService } from '../entries/entries-http.service';
import { TimesService } from '../times/times.service';
import { TimesHttpService } from '../times/times-http.service';
import { ConfigService } from '../config/config.service';
import { ConfigHttpService } from '../config/config-http.service';
import { PositionsService } from '../positions/positions.service';
import { PositionsHttpService } from '../positions/positions-http.service';
import { PenaltiesService } from '../penalties/penalties.service';
import { PenaltiesHttpService } from '../penalties/penalties-http.service';
import { DisqualificationService } from '../disqualification/disqualification.service';
import { DisqualificationHttpService } from '../disqualification/disqualification-http.service';

import { ENV_PROVIDERS } from './environment';
import { resultsRoutes } from './results.routes';
import { ResultsComponent } from './results.component';
import { LandingComponent } from './landing';

import { RaceResultsComponent } from './race_results';

import { FooterModule } from '../components/footer/footer.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TitlebarModule } from '../components/titlebar/titlebar.module';
import { NoContentModule } from '../components/no-content/no-content.module';

@NgModule({
  bootstrap: [ ResultsComponent ],
  declarations: [
    ResultsComponent,
    LandingComponent,
    RaceResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FooterModule,
    SidebarModule,
    TitlebarModule,
    NoContentModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot(),
    RouterModule.forRoot(resultsRoutes, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ENV_PROVIDERS,
    RacesService,
    RacesHttpService,
    EntriesService,
    EntriesHttpService,
    PositionsService,
    PositionsHttpService,
    TimesService,
    TimesHttpService,
    ConfigService,
    ConfigHttpService,
    PenaltiesService,
    PenaltiesHttpService,
    DisqualificationService,
    DisqualificationHttpService,
    Title
  ]
})
export class ResultsModule {
}

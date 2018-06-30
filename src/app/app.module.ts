import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {DataGridModule} from 'primeng/components/datagrid/datagrid';
import {PanelModule} from 'primeng/components/panel/panel';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {TabViewModule} from 'primeng/components/tabview/tabview';
import {CodeHighlighterModule} from 'primeng/components/codehighlighter/codehighlighter';
import {DataViewModule} from 'primeng/components/dataview/dataview';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';
import { RulebaseService } from './services/rulebase.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/components/slider/slider';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { RulebaseComponent } from './rulebase/rulebase.component';
import { CellFilterComponent } from './cell-filter/cell-filter.component';
import { CellActionComponent } from './cell-action/cell-action.component';
import { CellMatchComponent } from './cell-match/cell-match.component';
import { CellSourceComponent } from './cell-source/cell-source.component';
import { ListboxModule} from 'primeng/components/listbox/listbox';
import { TieredMenuModule } from 'primeng/components/tieredmenu/tieredmenu';
import { SplitButtonModule } from 'primeng/components/splitbutton/splitbutton';
import { GrowlModule } from 'primeng/components/growl/growl';
import { FormsModule } from '@angular/forms';
import { BasicHighLightDirective } from './highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './highlight/better-highlight.directive';
import { HighLightGreenDirective } from './highlight/highlight-green.directive';
import { RecorderSubMenuComponent } from './recorder/recorder-sub-menu/recorder-sub-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { RecorderComponent } from './recorder/recorder.component';
import { ResponderComponent } from './responder/responder.component';
import { ResponderSubMenuComponent } from './responder/responder-sub-menu/responder-sub-menu.component';
import { MessagesComponent } from './messages/messages.component';
import { AddRuleComponent } from './rulebase/add-rule/add-rule.component';
import { AddRuleService } from './services/add-rule.service';

@NgModule({
  declarations: [
    AppComponent,
    RulebaseComponent,
    BasicHighLightDirective,
    HighLightGreenDirective,
    CellFilterComponent,
    CellActionComponent,
    CellMatchComponent,
    CellSourceComponent,
    BetterHighlightDirective, RecorderSubMenuComponent,
    RecorderComponent,
    ResponderComponent,
    ResponderSubMenuComponent,
    MessagesComponent,
    AddRuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    CodeHighlighterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    SliderModule,
    MultiSelectModule,
    ListboxModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    FormsModule,
    SplitButtonModule,
    TieredMenuModule,
    GrowlModule,
  ],
  providers: [HttpClient, RulebaseService, AddRuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }


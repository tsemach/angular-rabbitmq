import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
// import { MainMenuComponent } from './main-menu/main-menu.component'
import { RecorderComponent } from "./recorder/recorder.component";
import { ResponderComponent } from './responder/responder.component';
import { MessagesComponent } from './messages/messages.component';

const appRoutes: Routes = [
  { path: '', 'component': RecorderComponent },
  { path: 'recorder', 'component': RecorderComponent },
  { path: 'responder', 'component': ResponderComponent },
  { path: 'messages', 'component': MessagesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
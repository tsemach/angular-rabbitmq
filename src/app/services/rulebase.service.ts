//import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rule } from './rule';

@Injectable()
export class RulebaseService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private http: HttpClient) {
    console.log("carService is called");
  }

  // getRulebase(mode) {
  //   return this.http.get<any>('assets/showcase/data/rulebase-' + mode + '.json')
  //     .toPromise()
  //     .then(res => <Rule[]>res.data)
  //     .then(data => { return data; });
  // }

  // getRulebase() {
  //   return this.http.get('http://localhost:3001/recorder/rulebase/load');
  // }

  getRulebase(mode) {
    return this.http.get<any>('http://localhost:3001/' + mode + '/rulebase/load')
      .toPromise()
      .then(res => <Rule[]>res.data)
      .then(data => { return data; });
  }

  // putRulebase(mode, rulebase) {
  //   return this.http.post<any>('http://localhost:3001/' + mode + '/rulebase/save')
  //     .toPromise()
  //     .then(res => <Rule[]>res.data)
  //     .then(data => { return data; });
  // }

  putRulebase(mode: string, rulebase: Rule[]) {
    /**
     * Angular using observable behind the scenes.
     * The http.post just return an observable that need to subscribe.
     *
     * No mesage is sent to the server yet. Only until the observer is subscribe.
     */
    //return this.http.post('https://udemy-ng-http.firebaseio.com/data.json', servers);
    return this.http.post('http://localhost:3001/' + mode + '/rulebase/save', {data: rulebase}, this.httpOptions);
  }

}





import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpConfig} from "./config.service";
import {WpHelper} from "./helper.service";

/*
 * WpCollection Service
 */

@Injectable()
export class WpCollection {

  /** WP query args */
  private args:any;

  /** The final request URL */
  private actionUrl:string;

  /** collection pagination properties */
  public currentPage:number = 1;
  public totalPages:number = 1;
  public totalObjects:number = 0;

  constructor(private http:Http, private config:WpConfig) {
  }

  /** must be set before making a request */
  public setEndpoint(endpoint:string) {
    this.actionUrl = this.config.baseUrl + endpoint;
  }

  /*
   * get() : get collection
   */

  public get(args?:any):Observable<any> {
    this.args = args;
    return this.fetch();
  }

  /*
   * more() : get the next page if available
   */

  public more():Observable<any> {
    if (this.hasMore()) {
      /** increment currentPage then set page argument */
      this.args.page = ++this.currentPage;
      return this.fetch();
    }
  }

  /*
   *  hasMore() : check if the next page available
   */

  public hasMore():boolean {
    return this.currentPage < this.totalPages;
  }

  /*
   * fetch() : request the final url
   */

  private fetch():Observable<any>{
    return this.http.get(WpHelper.generateUrl(this.actionUrl, this.args)).map(
      res => {
        /** set totalObject and totalPages from response's headers */ 
        this.totalObjects = +res.headers.get('X-WP-Total');
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        return res.json();
      }
    );
  }

}

/*
 * PS: Handle request errors from "subscribe" function
 */
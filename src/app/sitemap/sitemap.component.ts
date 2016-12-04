import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArticleService} from "../services/article.service";

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Sitemap` component loaded asynchronously');

@Component({
  selector: 'sitemap',
  styles: [`
  `],
  template: `
    <div class="resize-font-size">
      响应式字体
    </div>
    <div class="size-half">
        永远都一半
    </div>
    <div class="iphone6plus-size-half">
        iphone6plus一半
    </div>
    <div [(ngModel)]="model" ngbRadioGroup name="radioBasic">
      <label class="btn btn-primary">
        <input type="radio" [value]="1"> Left (pre-checked)
      </label>
      <label class="btn btn-primary">
        <input type="radio" value="middle"> Middle
      </label>
      <label class="btn btn-primary">
        <input type="radio" [value]="false"> Right
      </label>
    </div>
    <hr>
    <pre>this.localState = {{ localState | json }}</pre>
  `,
  providers: [
    ArticleService
  ]
})
export class SitemapComponent {
  localState: any;
  model = 1;

  constructor(public route: ActivatedRoute,
              public articleService: ArticleService) {
    console.dir(articleService);
      articleService.all({})
      .then(function (json) {
        // console.dir(json);
      });
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.dir(this.route);

    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then(json => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}

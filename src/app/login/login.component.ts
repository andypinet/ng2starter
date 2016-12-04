import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArticleService} from "../services/article.service";

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`login` component loaded asynchronously');

@Component({
  selector: 'login',
  styles: [`
  `],
  template: `
    登录
  `,
  providers: [
    ArticleService
  ]
})
export class loginComponent {
  localState: any;
  model = 1;

  constructor(public route: ActivatedRoute,
              public articleService: ArticleService) {
      articleService.all({})
      .then(function (json) {
        console.dir(json);
      });
  }

  ngOnInit() {
    this.asyncDataWithWebpack();
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

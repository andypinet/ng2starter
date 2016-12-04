import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

let getParams = require('jquery-param');

class NetService {
  protected settings;
  constructor(settings = {}) {
    this.settings = Object.assign({
      apiProtol: "",
      apiAddress: "",
      apiVersion: ""
    }, settings);
  }
  resolveUrl(controller, params = {}, expand = '') {
    return this.buildUrl(controller, params, expand);
  }
  buildUrl(controller, params = {}, expand = '') {
    return `${this.settings.apiProtol}://${this.settings.apiAddress}/${this.settings.apiVersion}/${controller}${expand}?${getParams(params)}`;
  }
  request(controller, params, expand) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(10);
      }, 3000);
    });
  }
}

class CommonNetService extends NetService {
  protected lastRequest;
  private injectHttp;
  constructor(http: Http) {
    super({
      apiProtol: "http",
      apiAddress: "",
      apiVersion: ""
    });
    this.lastRequest = {
      url: "",
      method: "",
      time: ""
    };
    this.injectHttp = http;
  }
  afterResponse(res) {
  }
  handleServerError(code, json) {
  }
  handleError(e){
    console.log(e);
  }
  handleController(controller) {
    return "";
  }
  handleRequest(request = {}) {
    var self = this;
    self.lastRequest = Object.assign(self.lastRequest, request);
  }
  all(params, expand = '', controller?) {
    var self = this;
    var expandStr = expand;
    var json = {};
    var resController = controller;
    if (!resController) {
      resController = this.handleController(controller);
    }
    var requestUrl = self.resolveUrl(resController, params, expandStr);
    this.handleRequest({
      url: requestUrl,
      method: "all",
      time: Date.now()
    });
    return this.injectHttp.get(requestUrl).toPromise()
      .then(response => response.json())
      .then(json => {
        if (json.code) {
          this.handleServerError(json.code, json);
        }
        return Promise.resolve(json)
      })
      .catch(function (e) {
        self.handleError(e);
      });
  }
}

export class MyNetService extends CommonNetService {
  protected controller;
  constructor(http: Http, controller = "") {
    super(http);
    this.controller = controller;
  }
  handleServerError(code, json) {
  }
  handleController(controller) {
    return this.controller;
  }
  handleRequest(request) {
    super.handleRequest(request);
  }
  handleError(e) {
    var self = this;
    console.log(`在${new Date(self.lastRequest.time)} 用${self.lastRequest.method}请求${self.lastRequest.url}错误`);
  }
}

class RestService extends MyNetService {
  constructor(controller) {
    super(controller);
    this.settings = {
      apiAddress: "api.console.aunbox.cn.hankin:80",
      apiVersion: "v1"
    };
  }
}

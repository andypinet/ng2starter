import {MyNetService} from "../lib/MyNetService";
import {Http} from "@angular/http";

export class RestService extends MyNetService {
  constructor(public resolvehttp: Http, controller) {
    super(resolvehttp, controller);
    var self = this;
    self.settings = Object.assign(self.settings, {
      apiAddress: "localhost:7400",
      apiVersion: "index"
    });
  }
}


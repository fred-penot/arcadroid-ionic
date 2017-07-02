import { Injectable } from '@angular/core';
import { CommonService } from '../providers/common-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {
    private routeList: any = '/game/list';
    private routeListFull: any = '/game/list/full';
    private routeOne: any = '/game/one';
    private routeOneFull: any = '/game/one/full';

    constructor(public http: Http, public commonService: CommonService) {
        
    }

    getList() {
        return new Promise(resolve => {
            this.getInfo().then(info => {
                resolve(info);
            });
        });
    }

    getListFull() {
        return new Promise(resolve => {
            this.getInfo(true).then(info => {
                resolve(info);
            });
        });
    }

    getOne(id) {
        return new Promise(resolve => {
            this.getInfo(false, id).then(info => {
                resolve(info);
            });
        });
    }

    getOneFull(id) {
        return new Promise(resolve => {
            this.getInfo(true, id).then(info => {
                resolve(info);
            });
        });
    }

    getInfo(full=false, id=null) {
        return new Promise(resolve => {
            this.commonService.getToken().then(token => {
                let route:any = '';
                let request: any = {
                    "token": token
                };
                if (id) {
                    request.id = id;
                    if (full) {
                        route = this.routeOneFull;
                    } else {
                        route = this.routeOne;
                    }
                } else {
                    if (full) {
                        route = this.routeListFull;
                    } else {
                        route = this.routeList;
                    }
                }
                let param:any = JSON.stringify(request);
                this.http.post(this.commonService.getUrlApi()+route, param)
                    .map(res => res.json())
                    .subscribe(
                        response => {
                            this.commonService.setToken(response.token);
                            resolve(response.data);
                        },
                        err => {
                            resolve(this.commonService.errorApiReturn(err));
                        }
                    );
            });
        });
    }

}


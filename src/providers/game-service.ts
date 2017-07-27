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
    private routeLaunch: any = '/game/launch';
    private routeStop: any = '/game/stop';
    private routeGetCurrent: any = '/game/current';
    private routeGetEmulator: any = '/game/get/emulator';
    private routeListEmulator: any = '/game/list/emulator';

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

    launch(id) {
        this.commonService.getToken().then(token => {
            let request: any = {
                "token": token,
                "id": id
            };
            let param:any = JSON.stringify(request);
            this.http.post(this.commonService.getUrlApi()+this.routeLaunch, param)
                .map(res => res.json())
                .subscribe(
                    response => {
                        this.commonService.setToken(response.token);
                        //resolve(response.data);
                    },
                    err => {
                        //resolve(this.commonService.errorApiReturn(err));
                    }
                );
        });
    }

    stop() {
        return new Promise(resolve => {
            this.commonService.getToken().then(token => {
                let request: any = {
                    "token": token
                };
                let param:any = JSON.stringify(request);
                this.http.post(this.commonService.getUrlApi()+this.routeStop, param)
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

    getCurrent() {
        return new Promise(resolve => {
            this.commonService.getToken().then(token => {
                let request: any = {
                    "token": token
                };
                let param:any = JSON.stringify(request);
                this.http.post(this.commonService.getUrlApi()+this.routeGetCurrent, param)
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

    getEmulator() {
        return new Promise(resolve => {
            this.commonService.getToken().then(token => {
                let request: any = {
                    "token": token
                };
                let param:any = JSON.stringify(request);
                this.http.post(this.commonService.getUrlApi()+this.routeGetEmulator, param)
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

    getEmulatorList(emulatorId) {
        return new Promise(resolve => {
            this.commonService.getToken().then(token => {
                let request: any = {
                    "token": token,
                    "emulatorId": emulatorId
                };
                let param:any = JSON.stringify(request);
                this.http.post(this.commonService.getUrlApi()+this.routeListEmulator, param)
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


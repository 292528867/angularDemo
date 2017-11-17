/*
/!**
 * Created by Administrator on 2017/11/14.
 *!/
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoodsType} from './goodsType';

@Injectable()
export class AppService {

  private baseUrl = 'http://hs.kbparking.com/wrsh-service/';

  constructor(private http: HttpClient) { }

  getAllTypes(): Promise<GoodsType[]> {
    return this.http.get(this.baseUrl + 'goods/findGoodsTypeDescList.do')
      .toPromise()
      .then(response =>  )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
*/

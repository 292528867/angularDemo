import {Component, OnInit} from '@angular/core';
import {GoodsType} from './goodsType';
import {HttpClient} from '@angular/common/http';
import {Goods} from './goods';
import {Page} from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  goodsTypes: GoodsType[]; // 商品类别列表
  selectGoodsType: Goods[]; // 某个商品类型下的商品列表
  allPrice = 0; // 选中所有的商品的总价
  allDiscountPrice = 0; // 选中的所有商品的总优惠价
  allSelectedGoodsNumber = 0; // 选中的所有的商品数目
  isShowMarketNum: Boolean = false; // 购物车中是否显示
  private baseUrl = 'http://hs.kbparking.com/wrsh-service/'; // 后台服务器地址

  constructor(private http: HttpClient) {
  }

  getAllTypes(): void {   // 获取所有的商品类型
    this.http.get<GoodsTypeResponse>(this.baseUrl + 'goods/findGoodsTypeDescList.do')
      .subscribe(data => {
          this.goodsTypes = data.data;
        }
      );
  }

  onSelectGoodType(goodsType: GoodsType): void { // 某个类别下的商品列表
    const param = '?page=1&rows=6&goodsTypeId=' + goodsType.id + '&shopId=1ec6f4cadab54412a9dd6b3af7660447&goodName=';
    this.http.get<GoodsResponse>(this.baseUrl + 'goods/findGoodsList.do' + param)
      .subscribe(result => {
          this.selectGoodsType = result.data.rows;
        }
      );
  }

  onSelectGoods(goods: Goods): void {
    console.log(goods.isShow);
    // goods.isShow = true;
    console.log(goods.isShow);
    this.allPrice += goods.price;
    this.allDiscountPrice += goods.discountPrice;
    this.allSelectedGoodsNumber++;
    if (this.allSelectedGoodsNumber > 0) {
      this.isShowMarketNum = true;
    }
    if (typeof goods.selectedCurrentGoodsNum === 'undefined') {
      goods.selectedCurrentGoodsNum = 0;
    }
    goods.selectedCurrentGoodsNum++;
  }

  deleteSelectedShop(goods: Goods): void {
    goods.selectedCurrentGoodsNum = goods.selectedCurrentGoodsNum - 1;
    console.log('所选商品的数量', goods.selectedCurrentGoodsNum);
    if (goods.selectedCurrentGoodsNum === 0) {
      this.isShowMarketNum = false;
      goods.isShow = false;
    }
    this.allSelectedGoodsNumber--;
    this.allPrice -= goods.price;
    this.allDiscountPrice -= goods.discountPrice;
  }

  ngOnInit(): void {
    this.getAllTypes();
  }


}

interface GoodsTypeResponse {
  data: GoodsType[];
}

interface GoodsResponse {
  data: Page<Goods>;
}

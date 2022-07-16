<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--商品的名字的面包屑的地方  -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑的地方 -->
            <li class="with-x" v-show="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 商品属性值面包屑的地方 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTradeMark="getTradeMark"
          @getAttrAndAttrValue="getAttrAndAttrValue"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="sort(1)">
                  <a>综合 </a>
                </li>
                <li :class="{ active: isTwo }" @click="sort(2)">
                  <a>价格 </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goodsList in goodsList"
                :key="goodsList.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goodsList.id}`"
                      ><img :src="goodsList.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goodsList.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goodsList.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ goodsList.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      //带给服务器的数据
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyWord: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //在组件挂载请求数据前，改变相关参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  methods: {
    //根据参数获取服务器数据
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      //搜索条件商品名字清空
      this.searchParams.categoryName = undefined;
      //骚操作:路由自己跳自己
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //面包屑移出关键字的回调
    removeKeyWord() {
      //清空关键字
      this.searchParams.keyWord = undefined;
      //修改URL
      this.$router.push({ name: "search", query: this.$route.query });
      this.$bus.$emit("clearKeyWord");
      //为什么这里没有调用发请求函数？
    },
    //子组件给父组件传递数据的自定义事件的回调
    getTradeMark(tmId, tmName) {
      //整理品牌相关的搜索条件
      this.searchParams.trademark = `${tmId}:${tmName}`;
      //再次发请求即可
      this.getData();
    },
    //面包屑清除品牌回调
    removeTradeMark() {
      //清空品牌的搜索条件
      this.searchParams.trademark = "";
      //再次发请求获取最新的数据展示
      this.getData();
    }, //子组件给父组件传递商品属性与属性值的自定义事件的回调
    getAttrAndAttrValue(attrId, attrName, attrsValue) {
      //整理最新的搜索的条件
      //整理为字符串
      let newProps = `${attrId}:${attrsValue}:${attrName}`;

      if (this.searchParams.props.indexOf(newProps) == -1) {
        this.searchParams.props.push(newProps);
        //再次发请求，获取最新的数据展示即可
        this.getData();
      }
    },
    //商品属性值面包屑删除回调
    removeAttr(index) {
      //删除对应的数组里面元素
      this.searchParams.props.splice(index, 1);
      //在发一次请求
      this.getData();
    },
    sort(flag) {
      //获取每一次order初始值,与用户点击传递进来的flag进行判断
      let originFlag = this.searchParams.order.split(":")[0];
      let originSortType = this.searchParams.order.split(":")[1];
      //准备一个新的数值，将来赋值给order
      let newOrder = "";
      //高亮的判断
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSortType == "desc" ? "asc" : "desc"}`;
      } else {
        //不是高亮的按钮
        newOrder = `${flag}:desc`;
      }
      //重新给order赋予新的数值
      this.searchParams.order = newOrder;
      //重新发一次请求
      this.getData();
    },
    getPageNo(pageNo) {
      //父组件整理参数
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapGetters(["trademarkList"]),
    ...mapGetters(["attrsList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  watch: {
    //监听组件VC的$route属性
    //$route:{},应该用深度监听呀?
    //$route，是vue-router提供的
    $route() {
      //再次整理最新的商品名字参数

      //先把用户前面存储的1|2|3级别ID清除
      //发ajax的时候,属性值为undefind,甚至参数K都不携带了【10个搜索条件,可有可无的】
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.pageNo = 1;
      //路由变化整理参数：手机最新的商品名字、商品1|2|3ID
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
'use strict';

var apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json'; //將apiUrl設定為常數不再變動。

var app = new Vue({
  el: '#app',
  data: function data() {
    return {
      area: '全部',
      disasterData: [], // 原始資料
      newList: [], // 第一次整理後的資料
      pageList: [], // 每頁的資料
      showinfo: [],
      countOfPage: 20, // 一頁顯示50筆
      currPage: 0, // 當前頁數
      totalPages: 0 // 總頁數的數字
    };
  },

  created: function created() {
    //執行
    this.callData();
  },
  computed: {
    // 整理要顯示頁數的資料
    showPageList: function showPageList() {
      var vm = this;
      vm.pageList = [];
      // console.log(vm.newList,vm.pageList)
      // 計算總頁數(無條件捨棄)=總資料/每頁顯示幾筆
      vm.totalPages = Math.floor(vm.newList.length / vm.countOfPage);
      var start = vm.currPage * vm.countOfPage;
      var end = vm.currPage * vm.countOfPage + vm.countOfPage;
      // console.log(start,end,vm.totalPages); 0,10,X
      vm.newList.forEach(function (item, i) {
        // 0~9筆資料
        if (i >= start && i < end) {
          vm.pageList.push(item);
        }
      });
      // console.log(vm.newList, vm.pageList);
      return vm.pageList;
    }
  },
  methods: {
    callData: function callData() {
      var vm = this;

      // GET /someUrl
      this.$http.get(apiUrl).then(function (response) {
        // 獲取災害資訊，取得資料
        vm.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        vm.showinfo = response.status;
        vm.getList();
        initMap(vm.disasterData);
      }, function (response) {
        vm.showinfo = response.status;
      });
    },
    // 整理剛得到的資料
    getList: function getList() {
      var vm = this;
      vm.newList = [];
      var selectData = vm.area;
      // 篩選forEach寫法
      if (selectData === '全部') {
        vm.newList = vm.disasterData;
      } else {
        // item是陣列的內容元素,i是索引
        vm.disasterData.forEach(function (item, i) {
          if (item.CaseLocationDistrict == selectData) {
            vm.newList.push(item);
          }
        });
      }
      // console.log(newList);
      return vm.newList;
    },
    // 控制上下頁的變換
    setPage: function setPage(idx) {
      // idx就是html的n
      var vm = this;
      if (idx <= 0 || idx > vm.totalPages) {
        return;
      }
      vm.currPage = idx;
    },
    // 起始顯示的頁數
    reSetPage: function reSetPage() {
      var vm = this;
      vm.currPage = 1;
    }
    /*https://github.com/pagekit/vue-resource*/
    /*VUE RESOURCE*/
  } });

// Google Map API

function initMap(data) {
  // 設定中心點座標
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 25.0329636,
      lng: 121.5654268
    },
    zoom: 13
  });
  for (var i = 0; i < data.length; i++) {
    var str = {};
    var place = {};

    place.lat = parseFloat(data[i].Wgs84Y);
    place.lng = parseFloat(data[i].Wgs84X);

    str.map = map;
    str.title = data[i].Name;
    str.position = place;
    str.icon = 'https://developers.google.com/maps/documentation/javascript/images/circle.png';
    // console.log(place);
    new google.maps.Marker(str);
  }
}

$("#gotop").on("click", function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $("html").offset().top
  }, 500);
});
"use strict";
//# sourceMappingURL=all.js.map

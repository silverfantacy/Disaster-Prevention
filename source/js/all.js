const apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json'; //將apiUrl設定為常數不再變動。

var app = new Vue({
  el: '#app',
  data: {
    area: '全部',
    disasterData: [],
    countOfPage: 10, //一頁顯示50筆
    currPage: 1 //第一頁
  },
  created: function () {
    //執行
    this.callData()
  },
  computed: {
    showList: function (a) {
      // a是html裡的area
      var newList = [];
      var selectData = this.area;
      // 篩選forEach寫法
      this.disasterData.forEach(function (item, i) {
        if (item.CaseLocationDistrict == selectData) {
          newList.push(item)
        }
      });
      // console.log(newList);
      return newList;

    },
    //filteredRows
    pageStart: function () {
      return (this.currPage - 1) * this.countOfPage;
    }, //End of pageStart
    totalPage: function () {
      return Math.ceil(this.showList.length / this.countOfPage);
      //資料數除以一頁顯示幾筆等於總頁數
    }
  },
  methods: {
    callData: function () {
      // GET /someUrl
      this.$http.get(apiUrl).then(response => {

        // 獲取災害資訊，取得資料
        this.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        initMap(this.disasterData);
        this.showinfo = response.status;

      }, response => {
        this.showinfo = response.status;
      });
    },
    setPage: function (idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.currPage = idx;
    }, //End of setPage
    reSetPage: function () {
      this.currPage = 1;

     //End of reSetPage
    }
  }
/*https://github.com/pagekit/vue-resource*/
/*VUE RESOURCE*/
})

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

$("#gotop").on("click", function (e) { // gotop start
  e.preventDefault();

  $('html, body').animate({
    scrollTop: $("html").offset().top
  }, 500);

});
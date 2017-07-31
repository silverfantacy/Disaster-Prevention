'use strict';

var apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json'; //將apiUrl設定為常數不再變動。

var app = new Vue({
  el: '#app',
  data: {
    area: '全部',
    disasterData: null,
    showinfo: null
  },
  created: function created() {
    //執行
    this.callData();
  },
  methods: {
    filterArea: function filterArea(item) {
      if (this.area == '全部') {
        return true;
      } else if (item.CaseLocationDistrict == this.area) {
        return true;
      }
    },
    callData: function callData() {
      var _this = this;

      // GET /someUrl
      this.$http.get(apiUrl).then(function (response) {

        // 獲取災害資訊
        _this.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;

        _this.showinfo = response.status;
      }, function (response) {
        _this.showinfo = response.status;
      });
    }

    /*https://github.com/pagekit/vue-resource*/
    /*VUE RESOURCE*/

  } });
//# sourceMappingURL=all.js.map

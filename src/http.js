import { request } from "../src/utils/request";
var token= wx.getStorageSync('token');
var number = null;
function reLog(res){
  if(res.code==3){
    wx.showToast({
      title: '登录失效，请重新登录',
      icon: 'none',
      duration: 2000
    });
  }
}

var getInfo= function() {
  request('get', 'opinionList',null,token).then(res=>{
    reLog(res)
    console.log(res)
  })
};
var getCode= function(number,fn) {
  request('get', 'code?phone='+number).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getCarList= function(fn) {
  request('get', 'carsList',null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getMessageList= function(fn) {
  request('get', 'messageList',null,token)
    .then(res=>{
      reLog(res)
      fn(res);
  })
    .catch(res=>{
      console.log(res);
    })
};
var getMessageDetial= function(id,fn) {
  request('get', 'messageDetail?id='+id,null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var addCar= function(data,fn) {
  request('post', 'carUpdate',data,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var login= function(data,fn) {
  //+'&code='+data.code+'&openId='+data.openId
  number=data.phone;
  request('get', 'login?phone='+data.phone+'&code='+data.code,null,token).then(res=>{
    reLog(res)
    if(res.code==0){
      token =res.data.key;
      wx.setStorageSync('token',res.data.key);
    }
    fn(res)
  })
};
var opinionSave= function(data,fn) {
  request('post', 'opinionSave',data,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var messageSave= function(data) {

  request('post', 'messageSave',data,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getOpinionList= function(fn) {
  request('get', 'opinionList',null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var moneyPay= function(fn) {
  request('get', 'moneyPay',null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getAgreement= function(type,fn) {
  request('get', 'agreement?type='+type,null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getTrackDetialList= function(data,fn) {
  request('get', 'trackDetailList',data,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var getTrackDetial= function(imeiId,date,fn) {
  let data ={
    imeiId:imeiId,
    // date: Date.parse(date)/1000
    date: date
  };
  request('get', 'trackDetail',data,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var delRollator= function(imeiId,fn) {

  request('get', 'delRollator?id='+imeiId,null,token).then(res=>{
    reLog(res)
    fn(res)
  })
};
var defLocateInfo= function(fn) {
  request('get', 'defLocateInfo',null,token).then(res=>{

    reLog(res)
    fn(res)
  })
};

var clear= function() {
  token= null;
}
export default {
  clear,
  getInfo,
  moneyPay,
  getCarList,
  getMessageDetial,
  getMessageList,
  addCar,
  login,
  opinionSave,
  getOpinionList,
  getAgreement,
  getTrackDetialList,
  getTrackDetial,
  delRollator,
  messageSave,
  defLocateInfo,
  getCode  }

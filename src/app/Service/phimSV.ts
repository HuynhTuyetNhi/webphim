 
 import  $ from 'jquery';
 declare let $: any ;
 export class PhimService{
    layDanhSachPhim(){
        return $.ajax({
            type:'GET',
            url: `http://sv2.myclass.vn/api/QuanLyPhim/LayDanhSachPhim?MaNhom=GP01`
        })
    }
 }

 // phạm vi của let nhỏ hơn var , let tồn tại trong 1 cặp ngoặc nhọn, var phạm vi trong một hàm
 // vòng lặp for, biến i sd var và let khác nhau ở 

//  for(var i=0;i<5;i++)
//  {
//      function(i){
//          setTimeout(function(){
//             console.log(i);
//          },1000)
//      }
//  }

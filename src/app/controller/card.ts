
import '../../assets/css/card.css';
import {Phim} from '../models/phim';
let danhSachGioHang : Phim[] = [];
window.onload =() =>{
   if(localStorage.getItem('cardList'))
   {
       danhSachGioHang =JSON.parse(localStorage.getItem('cardList'));
   }
   taoBang();
   
}
let taoBang =() =>
{
    let content =``;
    for(let i in danhSachGioHang)
    {
        let {TenPhim,NgayKhoiChieu,HinhAnh,DanhGia,MaPhim} = danhSachGioHang[i];
        content +=
        `
        <tr>
            <td>${parseInt(i)+1}</td>
            <td>${TenPhim}</td>
            <td><img src="${HinhAnh}" style= "width:100px;"></td>
            <td>${DanhGia}</td>
            <td>${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</td>
            <td>
            <button data-maphim="${MaPhim}" class ="btn btn-info btnXoa">Xóa</button>
            </td>
        </tr>
        `
    }
    (<HTMLTableElement>document.getElementById('tbody')).innerHTML = content;
    xoaPhim('btnXoa');
    thanhToan('buy_movie');
}
let xoaPhim = (btnClass:string) =>
{
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns)
    {
        btn.addEventListener ('click',() =>{
            let maPhim = btn.getAttribute('data-maphim');
            let index = timPhimTheoMa(danhSachGioHang, maPhim);
            if(index !== -1)
            {
                danhSachGioHang.splice(index,1);
            }
            taoBang();
          localStorage.setItem('cardList',JSON.stringify(danhSachGioHang));
    })
}
let timPhimTheoMa =(movieArr:Phim[],maPhim:string) =>
{
    for(let i in movieArr){
       if(movieArr[i].MaPhim ===maPhim)
       return parseInt(i);
    }
}
    return -1;

}
let thanhToan =(btnAdd:string) =>{
    
    let buy:any = <HTMLCollection>document.getElementsByClassName(btnAdd);
    for(let btn of buy )
    {
        btn.addEventListener ('click',function(){
           danhSachGioHang.splice(0,danhSachGioHang.length);
            taoBang();
            localStorage.setItem('carList',JSON.stringify(danhSachGioHang));
        })
    }
}


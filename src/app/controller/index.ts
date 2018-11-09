import '../../assets/css/index.css';
import { PhimService } from '../Service/phimSV';
import { Phim } from '../models/phim';
import { NguoiDung } from '../models/nguoidung';
import {NguoiDungService} from '../Service/nguoiDungSV';
import * as $ from 'jquery';

const phimSV = new PhimService();
// khi html load rồi thì này mới load 
const nguoiDungSV = new NguoiDungService();
let danhSachPhim:Phim[] = [];
let danhSachGioHang:Array<Phim> =[];


window.onload = function () {
    phimSV.layDanhSachPhim().done(function (res) {
        danhSachPhim = res;
        renderMovieItem();

    }).fail(function (err) {
        console.log(err);
    })
    getUser();
}
//substr cat chuoi
//movie.NgayKhoiChieu ? movie.NgayKhoiChieu.substr(0,10):'2018-20-10'
// if neu movie.NgayDoiChieu != null =true, thi in tien hanh cat chuoit,, con neu false thi gan mac dinh la 20-10-2018
let renderMovieItem = () => {
    
   
    let content: string = ' ';
    for (let movie of danhSachPhim) {
        //destructering : lay thuoc tinh cua object ra
        let {MaPhim,TenPhim,Trailer,HinhAnh,MoTa,MaNhom,NgayKhoiChieu,DanhGia} = movie;
        content +=
            `
        <div class="col-sm-6 col-md-3 text-center">
                    <div class="movie__item">
                        <img src="${movie.HinhAnh}" onerror="this.onerror === null ;this.src='https://picsum.photos/200/300/?random'"style="height:350px" class="img-fluid w-100">
                        <div class="movie__overlay"></div>
                        <div class="movie__detail w-100 text-center text-white">
                            <i class="fa fa-play d-block mx-auto mb-3 video-play venobox " href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                           <p>
                           <a href="#" class="movie_icon "><i class="fa fa-file"></i></a>
                           <a 
                           data-maphim =${MaPhim}
                           data-tenphim =${TenPhim}
                           data-trailer =${Trailer}
                           data-hinhanh =${HinhAnh}
                           data-mota = ${MoTa}
                           data-manhom =${MaNhom}
                           data-ngaychieu =${NgayKhoiChieu}
                           data-danhgia = ${DanhGia}
                           class="movie_icon btnAdd"><i class="fa fa-cart-plus"></i></a>
                           </p>
                            <span>Released:${movie.NgayKhoiChieu ? movie.NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</span>
                        </div>
                    </div>
                    <p class="movie__name text-center my-3">${movie.TenPhim}</p>
                    ${renderStart(parseInt(movie.DanhGia))}
                </div>
        `
    }
    (<HTMLDivElement>document.getElementById('movieList')).innerHTML = content;
    themPhimVaoGioHang('btnAdd');
}
// k dung arrow fuction k dung trong doi tuong
//for in. of duyet theo mang
let renderStart = (num: number) => {
    let starts = '';
    if (num) {
        for (let i = 0; i < num; i++) {
        starts +=
        `
        <i class="fa fa-star movie__star"></i>
        `
        }
        for(let k = 5 ; k > num ; k-- )
        {
            starts +=
            `
            <i class="fa fa-star-o movie__star"></i>
            `
        }
    }
    else {
        for (let i = 0; i < 5; i++) {
            starts +=
            `
            <i class="fa fa-star movie__star"></i>
            `
        }
    }
    return starts;
}
let themPhimVaoGioHang =(btnClass) =>
{
    let btns:any = <HTMLCollection> document.getElementsByClassName(btnClass);

    for(let btn of btns )
    {
        btn.addEventListener('click',()=>{
            let maPhim = btn.getAttribute('data-maphim');
            let tenPhim = btn.getAttribute('data-tenphim');
            let trailer = btn.getAttribute('data-trailer');
            let hinhAnh = btn.getAttribute('data-hinhanh');
            let moTa = btn.getAttribute('data-mota');
            let maNhom = btn.getAttribute('data-manhom');
            let ngayChieu = btn.getAttribute('data-ngaychieu');
            let danhGia = btn.getAttribute('data-danhgia');

            let PhimIteam = new Phim(maPhim,tenPhim,trailer,hinhAnh,moTa,maNhom,ngayChieu,danhGia);
            // console.log(PhimIteam);
            //spread  operator
            let index = timPhimTheoMa(PhimIteam.MaPhim);
            if(index === -1)
            {
                danhSachGioHang = [...danhSachGioHang,PhimIteam];   
            }
        
            // console.log(danhSachGioHang);
            // lưu danh sách giỏ hàng xuống local để chuyển sang trang html ms r load lên
            localStorage.setItem('cardList',JSON.stringify(danhSachGioHang));
            (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();
            //tostring chuyen so thanh chuoi
        })
    }
}
let timPhimTheoMa =(maPhim:string) =>
{
    for(let movie of danhSachGioHang){
        if(movie.MaPhim === maPhim)
        {
            return 1;
        }
    }
    return -1;

}
// Hàm đăng ký:
let dangKy =() =>
{
    let taiKhoan = (<HTMLInputElement>document.getElementById('taiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('matKhau')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('hoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let soDT = (<HTMLInputElement>document.getElementById('soDT')).value;
    let maNhom ='GP01';
    let maLoaiNguoiDung ='KhachHang';

    let nguoiDung = new NguoiDung(taiKhoan,matKhau,email,soDT,maNhom,maLoaiNguoiDung,hoTen);

    let service = nguoiDungSV.DangKy(nguoiDung);
    // service.done(function(kq){
    //     if(typeof(kq) !=='string')
    //         alert('success');
    // })
    service.done(function(){
       alert('success');
    })
    .fail(function(){
        alert('fail');
    })
    // let btns:any = (<HTMLElement> document.getElementById('DangKy'));
    // btns.addEventListener('click',dangKy());
}
(<HTMLButtonElement>document.getElementById('DangKy')).addEventListener('click',dangKy);
let danhNhap =() =>
{
    let taiKhoan = (<HTMLInputElement>document.getElementById('txttaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('txtmatKhau')).value;
    
    // let DangNhap = new NguoiDung (taiKhoan,matKhau);
    let ajaxDangNhap = nguoiDungSV.DangNhap(taiKhoan,matKhau);

    ajaxDangNhap.done(function(kq){
        if(typeof(kq)!=='string'){
            (<HTMLButtonElement>document.getElementById('btnClose')).click();
            localStorage.setItem('NguoiDung',JSON.stringify(kq));
            getUser();
        }
    }).fail(function(){
        alert('fail');
    })

}
(<HTMLButtonElement>document.getElementById('btnDangNhap')).addEventListener('click',danhNhap);
let getUser =() =>
{
    let localUser = JSON.parse(localStorage.getItem('NguoiDung'));
    if(localUser)
    {
        (<HTMLSpanElement>document.getElementById('userInfo')).style.display ='inline';
        (<HTMLSpanElement>document.getElementById('username')).innerHTML = localUser.TaiKhoan;

     }
}

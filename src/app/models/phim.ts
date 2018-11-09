
export class Phim {
    public MaPhim: string;
    public TenPhim: string;
    public Trailer: string;
    public HinhAnh: string;
    public MoTa: string;
    public MaNhom: string;
    public NgayKhoiChieu: string;
    public DanhGia: string;
    constructor(maphim:string, tenphim:string, trailer:string, hinhanh:string, mota:string, manhom:string, ngaykhoichieu:string, danhgia:string) {
        this.MaPhim = maphim;
        this.TenPhim = tenphim;
        this.Trailer = trailer;
        this.HinhAnh = hinhanh;
        this.MoTa = mota;
        this.MaNhom = manhom;
        this.NgayKhoiChieu = ngaykhoichieu;
        this.DanhGia = danhgia;
    }
}
// gọi ntn thì hàm contructor chạy, tham số truyền vào contructor 
// var phimMoi = new Phim('1','a','b','img','asdad','asd','eqae','weqwe');

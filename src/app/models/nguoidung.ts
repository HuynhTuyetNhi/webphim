
export class NguoiDung {
    // mặc định là public 
    TaiKhoan: string;
    MatKhau: string;
    Email: string;
    SoDT: string;
    MaNhom: string;
    MaLoaiNguoiDung: string;
    HoTen: string;
    // Truyền vào phải giống như backend đưa lên. khi them xóa sửa mới hiều

    constructor(taiKhoan: string, matKhau: string, email: string, soDT: string, maNhom: string, maLoaiNguoiDung: string, hoTen: string) {
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.Email = email;
        this.SoDT = soDT;
        this.MaNhom = maNhom;
        this.MaLoaiNguoiDung = maLoaiNguoiDung;
        this.HoTen = hoTen;
    }

}




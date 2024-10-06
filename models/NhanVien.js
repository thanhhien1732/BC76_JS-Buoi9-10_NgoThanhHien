class NhanVien {
    constructor(tknv, name, email, ngaylam, luongCB, chucvu, gioLam) {
        this.tknv = tknv;
        this.name = name;
        this.email = email;
        this.ngaylam = ngaylam;
        this.luongCB = luongCB;
        this.chucvu = chucvu;
        this.gioLam = gioLam;
    }

    // Phương thức tính tổng lương
    tinhTongLuong() {
        let heSoChucVu = this.chucvu === "Giám đốc" ? 3 : this.chucvu === "Trưởng phòng" ? 2 : 1;
        return this.luongCB * heSoChucVu;
    }

    // Phương thức xếp loại nhân viên dựa trên giờ làm
    xepLoaiNhanVien() {
        if (this.gioLam >= 192) {
            return "Xuất sắc"; 
        } else if (this.gioLam >= 176) {
            return "Giỏi";     
        } else if (this.gioLam >= 160) {
            return "Khá";      
        } else {
            return "Trung Bình"; 
        }
    }
}

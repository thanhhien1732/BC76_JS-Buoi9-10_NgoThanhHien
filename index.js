let arrNhanVien = [];

// ---------------- Thêm nhân viên ---------------------
document.getElementById("btnThemNV").onclick = function (event) {
    event.preventDefault();
    let nhanVien = getValueForm();
    if (!nhanVien) {
        return; // Nếu thông tin không hợp lệ, dừng lại
    }
    arrNhanVien.push(nhanVien);
    setLocalStorage("arrNhanVien", arrNhanVien);
    renderDataNhanVien();
    document.getElementById("formQLNV").reset();
    clearErrors(); // Xóa thông báo lỗi sau khi thêm thành công

    // Đóng modal sau khi thêm thành công
    $('#myModal').modal('hide'); // Sử dụng jQuery để ẩn modal
};

// --------------- Hiển thị thông tin nhân viên lên table và lọc theo xếp loại -------------
function renderDataNhanVien(arr = arrNhanVien) {
    let content = "";
    let selectedXepLoai = document.getElementById("searchName").value.trim(); // Lấy giá trị hiển thị từ dropdown

    for (let nhanVien of arr) {
        let newNhanVien = new NhanVien(
            nhanVien.tknv,
            nhanVien.name,
            nhanVien.email,
            nhanVien.ngaylam,
            nhanVien.luongCB,
            nhanVien.chucvu,
            nhanVien.gioLam
        );

        // Lọc nhân viên theo xếp loại (nếu có chọn từ dropdown)
        let xepLoaiNhanVien = newNhanVien.xepLoaiNhanVien();
        if (selectedXepLoai !== "Loại nhân viên" && selectedXepLoai !== xepLoaiNhanVien) {
            continue; // Bỏ qua nhân viên không thuộc loại đã chọn
        }

        // Chuyển đổi giá trị chức vụ thành tên hiển thị
        let chucVuHienThi = "";
        switch (newNhanVien.chucvu) {
            case "GiamDoc":
                chucVuHienThi = "Giám đốc";
                break;
            case "TruongPhong":
                chucVuHienThi = "Trưởng phòng";
                break;
            case "NhanVien":
                chucVuHienThi = "Nhân viên";
                break;
            default:
                chucVuHienThi = "Không xác định";
        }

        content += `
        <tr>
            <td>${newNhanVien.tknv}</td>
            <td>${newNhanVien.name}</td>
            <td>${newNhanVien.email}</td>
            <td>${newNhanVien.ngaylam}</td>
            <td>${chucVuHienThi}</td> 
            <td>${newNhanVien.tinhTongLuong()}</td>
            <td>${xepLoaiNhanVien}</td> <!-- Hiển thị tên xếp loại -->
            <td>
                <button onclick="deleteNhanVien('${newNhanVien.tknv}')" class="btn btn-danger">Xóa</button>
                <button onclick="getInfoNhanVien('${newNhanVien.tknv}')" class="btn btn-warning">Sửa</button>
            </td>
        </tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

// Lọc nhân viên khi thay đổi lựa chọn trong dropdown
document.getElementById("searchName").addEventListener("change", function () {
    renderDataNhanVien(arrNhanVien); // Gọi lại hàm renderDataNhanVien để áp dụng lọc
});


// ------------------- Load dữ liệu khi trang được load -------------------
window.onload = function () {
    let dataLocal = getLocalStorage("arrNhanVien");
    if (dataLocal) {
        arrNhanVien = dataLocal;
        renderDataNhanVien();
    }

    // Lắng nghe sự kiện nhập liệu để kiểm tra ngay lập tức
    setupLiveValidation();
};

// ----------------- Local storage -----------------------
function setLocalStorage(key, value) {
    let dataString = JSON.stringify(value);
    localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
    let dataLocal = localStorage.getItem(key);
    return dataLocal ? JSON.parse(dataLocal) : null;
}

// ----------------- Xóa nhân viên -----------------------
function deleteNhanVien(taiKhoan) {
    let index = arrNhanVien.findIndex((item) => item.tknv === taiKhoan);
    if (index !== -1) {
        arrNhanVien.splice(index, 1);
        renderDataNhanVien();
        setLocalStorage("arrNhanVien", arrNhanVien);
    }
}

// -------------- Get info NhanVien -----------------------
function getInfoNhanVien(taiKhoan) {
    let nhanVien = arrNhanVien.find((item) => item.tknv === taiKhoan);
    if (nhanVien) {
        // Điền các giá trị vào form
        document.getElementById("tknv").value = nhanVien.tknv;
        document.getElementById("password").value = nhanVien.password;
        document.getElementById("name").value = nhanVien.name;
        document.getElementById("email").value = nhanVien.email;
        document.getElementById("datepicker").value = nhanVien.ngaylam;
        document.getElementById("luongCB").value = nhanVien.luongCB;
        document.getElementById("chucvu").value = nhanVien.chucvu;
        document.getElementById("gioLam").value = nhanVien.gioLam;

        // Đặt nút "Sửa" (tức là "Cập nhật") để hiển thị
        document.getElementById("tknv").readOnly = true; // Không cho phép sửa tài khoản (primary key)
        document.getElementById("password").readOnly = true; // Không cho phép sửa mật khẩu (primary key)
        $('#myModal').modal('show'); // Hiển thị modal để sửa thông tin
    }
}


// ------------------- Cập nhật nhân viên ---------------------
document.getElementById("btnCapNhat").onclick = function () {
    let nhanVien = getValueForm();
    if (nhanVien) {
        // Tìm nhân viên trong mảng dựa trên tài khoản (tài khoản là duy nhất)
        let index = arrNhanVien.findIndex((item) => item.tknv === nhanVien.tknv);
        if (index !== -1) {
            arrNhanVien[index] = nhanVien; // Cập nhật thông tin nhân viên
            renderDataNhanVien();          // Cập nhật lại bảng dữ liệu hiển thị
            setLocalStorage("arrNhanVien", arrNhanVien); // Lưu lại dữ liệu
            document.getElementById("tknv").readOnly = false;
            document.getElementById("password").readOnly = false;
            document.getElementById("formQLNV").reset(); // Xóa form sau khi cập nhật
            $('#myModal').modal('hide'); // Ẩn modal sau khi cập nhật
            clearErrors(); // Xóa thông báo lỗi sau khi cập nhật thành công
        }
    }
};


// --------------- Get value Form with Validation -----------------
function getValueForm() {
    let tknv = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let ngaylam = document.getElementById("datepicker").value;
    let luongCB = document.getElementById("luongCB").value;
    let chucvu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;
    let password = document.getElementById("password").value;

    let valid = true;

    // Kiểm tra tài khoản
    if (!checkEmptyValue(document.getElementById("tbTKNV"), tknv) || !checkMinMax(document.getElementById("tbTKNV"), tknv, 4, 6)) {
        valid = false;
    }

    // Kiểm tra tên
    if (!checkEmptyValue(document.getElementById("tbTen"), name) || !checkName(document.getElementById("tbTen"), name)) {
        valid = false;
    }

    // Kiểm tra email
    if (!checkEmptyValue(document.getElementById("tbEmail"), email) || !checkEmail(document.getElementById("tbEmail"), email)) {
        valid = false;
    }

    // Kiểm tra mật khẩu
    if (!document.getElementById("tknv").readOnly) {
        if (!checkEmptyValue(document.getElementById("tbMatKhau"), password) || !checkPassword(document.getElementById("tbMatKhau"), password)) {
            valid = false;
        }
    }

    // Kiểm tra ngày làm
    if (!checkEmptyValue(document.getElementById("tbNgay"), ngaylam) || !checkDate(document.getElementById("tbNgay"), ngaylam)) {
        valid = false;
    }

    // Kiểm tra lương cơ bản
    if (!checkEmptyValue(document.getElementById("tbLuongCB"), luongCB) || !checkSalary(document.getElementById("tbLuongCB"), luongCB)) {
        valid = false;
    }

    // Kiểm tra chức vụ
    if (!checkEmptyValue(document.getElementById("tbChucVu"), chucvu) || (chucvu !== "GiamDoc" && chucvu !== "TruongPhong" && chucvu !== "NhanVien")) {
        document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ hợp lệ";
        document.getElementById("tbChucVu").style.display = "block";
        valid = false;
    } else {
        document.getElementById("tbChucVu").style.display = "none";
    }

    // Kiểm tra giờ làm
    if (!checkEmptyValue(document.getElementById("tbGiolam"), gioLam) || !checkWorkingHours(document.getElementById("tbGiolam"), gioLam)) {
        valid = false;
    }

    if (!valid) {
        return null;
    }

    // Khởi tạo đối tượng NhanVien mới
    return new NhanVien(tknv, name, email, ngaylam, luongCB, chucvu, gioLam);
}

// Hàm xóa thông báo lỗi sau khi nhập thành công
function clearErrors() {
    let errorSpans = document.querySelectorAll(".sp-thongbao");
    errorSpans.forEach(span => {
        span.innerHTML = "";
        span.style.display = "none";
    });
}

// Thiết lập kiểm tra ngay lập tức khi người dùng nhập liệu
function setupLiveValidation() {
    document.getElementById("tknv").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbTKNV"), this.value) && checkMinMax(document.getElementById("tbTKNV"), this.value, 4, 6);
    });

    document.getElementById("name").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbTen"), this.value) && checkName(document.getElementById("tbTen"), this.value);
    });

    document.getElementById("email").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbEmail"), this.value) && checkEmail(document.getElementById("tbEmail"), this.value);
    });

    document.getElementById("password").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbMatKhau"), this.value) && checkPassword(document.getElementById("tbMatKhau"), this.value);
    });

    document.getElementById("datepicker").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbNgay"), this.value) && checkDate(document.getElementById("tbNgay"), this.value);
    });

    document.getElementById("luongCB").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbLuongCB"), this.value) && checkSalary(document.getElementById("tbLuongCB"), this.value);
    });

    document.getElementById("chucvu").addEventListener("change", function () {
        checkEmptyValue(document.getElementById("tbChucVu"), this.value);
    });

    document.getElementById("gioLam").addEventListener("input", function () {
        checkEmptyValue(document.getElementById("tbGiolam"), this.value) && checkWorkingHours(document.getElementById("tbGiolam"), this.value);
    });
}

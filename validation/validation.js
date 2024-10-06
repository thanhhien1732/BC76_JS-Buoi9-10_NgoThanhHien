// Kiểm tra dữ liệu rỗng
function checkEmptyValue(theThongBao, value) {
    if (value.trim() === "") {
        theThongBao.innerHTML = "Vui lòng không bỏ trống";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra trong khoảng min max (sử dụng cho số hoặc chuỗi)
function checkMinMax(theThongBao, value, min, max) {
    let length = value.length;
    if (length < min || length > max) {
        theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} đến ${max} ký tự`;
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra tên nhân viên (chỉ chứa chữ cái)
function checkName(theThongBao, value) {
    let regexName = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!regexName.test(value)) {
        theThongBao.innerHTML = "Họ tên chỉ chứa chữ cái";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra email
function checkEmail(theThongBao, value) {
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(value)) {
        theThongBao.innerHTML = "Email không đúng định dạng";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra mật khẩu (6-10 ký tự, ít nhất 1 chữ số, 1 in hoa, 1 ký tự đặc biệt)
function checkPassword(theThongBao, value) {
    let regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    if (!regexPassword.test(value)) {
        theThongBao.innerHTML = "Mật khẩu phải bao gồm 6-10 ký tự, ít nhất 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra định dạng ngày làm
function checkDate(theThongBao, value) {
    let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // Định dạng mm/dd/yyyy
    if (!regexDate.test(value)) {
        theThongBao.innerHTML = "Ngày làm phải theo định dạng mm/dd/yyyy";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra lương cơ bản trong khoảng từ 1,000,000 đến 20,000,000
function checkSalary(theThongBao, value) {
    let salary = Number(value);
    if (isNaN(salary) || salary < 1000000 || salary > 20000000) {
        theThongBao.innerHTML = "Lương cơ bản phải nằm trong khoảng 1,000,000 đến 20,000,000";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

// Kiểm tra số giờ làm từ 80 - 200 giờ
function checkWorkingHours(theThongBao, value) {
    let hours = Number(value);
    if (isNaN(hours) || hours < 80 || hours > 200) {
        theThongBao.innerHTML = "Số giờ làm phải nằm trong khoảng 80 đến 200 giờ";
        theThongBao.style.display = "block";
        return false;
    } else {
        theThongBao.innerHTML = "";
        theThongBao.style.display = "none";
        return true;
    }
}

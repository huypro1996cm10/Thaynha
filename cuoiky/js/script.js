
// Hiển thị input Mã bảo mẫu khi chọn Giáo viên
function toggleMaBaoMau() {
    let role = document.getElementById("role").value;
    let maBaoMauInput = document.getElementById("maBaoMau");
    maBaoMauInput.style.display = (role === "teacher") ? "block" : "none";
}

// Xử lý đăng ký
function register() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value.trim();
    let role = document.getElementById("role").value;
    let maBaoMau = document.getElementById("maBaoMau").value;

    if (role === "teacher" && maBaoMau !== "BAOMAU123") {
        alert("Mã bảo mẫu không hợp lệ!");
        return;
    }

    if (username && password) {
        localStorage.setItem(username, JSON.stringify({ password: password, role: role }));
        alert("Đăng ký thành công! Hãy đăng nhập.");
        window.location.href = "../Index_loginform.html";
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
    }
}

// Danh sách tài khoản mẫu
const accounts = {
    "admin": { password: "admin123", role: "admin" },
    "teacher": { password: "teacher123", role: "teacher" },
    "parent": { password: "parent123", role: "parent" }
};

// Xử lý đăng nhập
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let selectedRole = document.getElementById("loginRole").value; // Vai trò chọn từ dropdown

    if (accounts[username]) {
        let user = accounts[username];

        // Kiểm tra mật khẩu
        if (user.password === password) {
            //Kiểm tra vai trò có khớp không
            if (user.role !== selectedRole) {
                alert("Bạn đã chọn sai vai trò! Hãy chọn đúng vai trò của bạn.");
                return;
            }

            // Lưu vào localStorage nếu đúng
            localStorage.setItem("loggedInUser", JSON.stringify({ username, role: user.role }));
            alert("Đăng nhập thành công!");

            // Chuyển hướng theo vai trò
            switch (user.role) {
                case "admin":
                    window.location.href = "./html/formhomeA.html";
                    break;
                case "teacher":
                    window.location.href = "./html/formhomeC.html";
                    break;
                case "parent":
                    window.location.href = "./html/formhomeB.html";
                    break;
                default:
                    window.location.href = "index.html";
            }
        } else {
            alert("Sai mật khẩu!");
        }
    } else {
        alert("Người dùng không tồn tại!");
    }
}


function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "../Index_loginform.html";
}


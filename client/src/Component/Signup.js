import '../css/Signup.css';
function Signup() {
  return (
    <div class="Signup  d-flex align-items-center">
        <div class="container d-flex justify-content-end align-items-center ">
            <div class="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
                <h1 class="text-center mb-5">Đăng ký ngay</h1>
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập họ tên" />
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập số điện thoại" />
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập email" />
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập mật khẩu (8 - 12 kí tự)" />
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Xác nhận lại mật khẩu" />
                <button type="button" class="btn btn-primary rounded-pill w-100 my-4">Đăng ký</button>
                <div class="text-center">Bạn đã có tài khoản?<a href="https://www.facebook.com/">Đăng nhập</a></div>

            </div>
        </div>
    </div>  
  );
}

export default Signup;

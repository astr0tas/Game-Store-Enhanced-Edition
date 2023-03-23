import '../css/CreateNewPassword.css';
function CreateNewPassword() {
  return (
    <div class="CreateNewPassword  d-flex align-items-center">
        <div class="container d-flex justify-content-end align-items-center ">
            <div class="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
                <h1 class="text-center mb-5">Tạo mật khẩu mới</h1>
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập mật khẩu" />
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập lại mật khẩu" />
                <button type="button" class="btn btn-primary rounded-pill w-100 my-4">Hoàn tất</button>

            </div>
        </div>
    </div>  
  );
}

export default CreateNewPassword;

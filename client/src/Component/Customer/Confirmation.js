import '../../css/Customer/Confirmation.css';
function Confirmation() {
  return (
    <div class="Confirmation  d-flex align-items-center">
        <div class="container d-flex justify-content-end align-items-center ">
            <div class="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
                <h1 class="text-center mb-5">Xác nhận</h1>
                <input type="text" class="form-control mb-4 rounded-pill" placeholder="Nhập mã xác nhận" />
                <button type="button" class="btn btn-primary rounded-pill w-100 my-4">Xác nhận</button>
            </div>
        </div>
    </div>  
  );
}

export default Confirmation;

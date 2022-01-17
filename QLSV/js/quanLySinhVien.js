var dssv = [];
var localStorages = "dssvLocal";

function renderTable(dssv) {
  var contentHTML = "";

  for (let index = 0; index < dssv.length; index++) {
    const sv = dssv[index];
    contentHTML += `
<tr>
  <td>${sv.ma}</td>
  <td>${sv.ten}</td>
  <td>${sv.mail}</td>
  <td>${sv.ngaySinh}</td>
  <td>${sv.khoaHoc}</td>
  <td>${sv.tinhDtb}</td>
  <td>
  <button class="btn btn-success" onclick="suaSV(${sv.ma})">Sửa</button></td>
  <td><button class="btn btn-danger" onclick="xoaSV(${sv.ma})">Xóa</button>
 </td>
</tr>
`;
    document.getElementById("tbodySinhVien").innerHTML = contentHTML;
  }
}

function kiemTraMaSV(newSV, arrSV) {
  var maNewSV = newSV.ma;
  for (let index = 0; index < arrSV.length; index++) {
    var svHienTai = arrSV[index];
    if (svHienTai.ma == maNewSV) {
      return false;
    }
  }
  return true;
}
function layThongTin() {
  var maValue = document.getElementById("txtMaSV").value;
  var tenValue = document.getElementById("txtTenSV").value;
  var mailValue = document.getElementById("txtEmail").value;
  var matKhauValue = document.getElementById("txtPass").value;
  var ngaySinhValue = document.getElementById("txtNgaySinh").value;
  var khoaHocValue = document.getElementById("khSV").value;
  var toanValue = document.getElementById("txtDiemToan").value * 1;
  var lyValue = document.getElementById("txtDiemLy").value * 1;
  var hoaValue = document.getElementById("txtDiemHoa").value * 1;

  var sinhVien = new SinhVien(
    maValue,
    tenValue,
    mailValue,
    matKhauValue,
    ngaySinhValue,
    khoaHocValue,
    toanValue,
    lyValue,
    hoaValue
  );
  return sinhVien;
}

function themSv() {
  //   var maValue = document.getElementById("txtMaSV").value;
  //   var tenValue = document.getElementById("txtTenSV").value;
  //   var mailValue = document.getElementById("txtEmail").value;
  //   var matKhauValue = document.getElementById("txtPass").value;
  //   var ngaySinhValue = document.getElementById("txtNgaySinh").value;
  //   var khoaHocValue = document.getElementById("khSV").value;
  //   var toanValue = document.getElementById("txtDiemToan").value * 1;
  //   var lyValue = document.getElementById("txtDiemLy").value * 1;
  //   var hoaValue = document.getElementById("txtDiemHoa").value * 1;

  //   var sinhVien = new SinhVien(
  //     maValue,
  //     tenValue,
  //     mailValue,
  //     matKhauValue,
  //     ngaySinhValue,
  //     khoaHocValue,
  //     toanValue,
  //     lyValue,
  //     hoaValue
  //   );
  var sinhVien = layThongTin();

  let checkMaSv = kiemTraMaSV(sinhVien, dssv);
  checkMaSv && dssv.push(sinhVien);
  var dssvJSON = JSON.stringify(dssv);
  localStorage.setItem(localStorages, dssvJSON);
  renderTable(dssv);
}

function timViTri(maSV, arr) {
  console.log(maSV, arr);
  var viTri = -1;

  for (let index = 0; index < arr.length; index++) {
    const sv = arr[index];
    if (sv.ma.toString() === maSV.toString()) {
      viTri = index;
    }
  }
  return viTri;
}

function suaSV(maSV) {
  console.log(maSV);
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    console.log(dssv[viTri]);

    var currentSv = dssv[viTri];

    document.getElementById("txtMaSV").value = currentSv.ma;
    document.getElementById("txtMaSV").disabled = true;
    document.getElementById("txtTenSV").value = currentSv.ten;
    document.getElementById("txtEmail").value = currentSv.email;
    document.getElementById("txtPass").value = currentSv.matkhau;
    document.getElementById("txtNgaySinh").value = currentSv.ngaySinh;
    document.getElementById("khSV").value = currentSv.khoaHoc;
    document.getElementById("txtDiemToan").value = currentSv.toan;
    document.getElementById("txtDiemLy").value = currentSv.ly;
    document.getElementById("txtDiemHoa").value = currentSv.hoa;
  }
}

function capNhatSV() {
  var sinhVien = layThongTin();
  var viTri = timViTri(sinhVien.ma, dssv);
  if (viTri !== -1) {
    dssv[viTri] = sinhVien;

    renderTable(dssv);
    var newDssvJS = JSON.stringify(dssv);
    localStorage.setItem(localStorages, newDssvJS);
  }
}

function xoaSV(maSV) {
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    dssv.splice(viTri, 1);
    renderTable(dssv);
    var newDssvJS = JSON.stringify(dssv);
    localStorage.setItem(localStorages, newDssvJS);
  }
}
// function reSet() {
//   var sinhVien = layThongTin();
//   var viTri = timViTri(sinhVien.ma, dssv);
//   if (viTri !== -1) {
//     renderTable(dssv);
//     // var newDssvJSON = JSON.stringify(dssv);
//     localStorage.removeItem(localStorages);
//   }
// }

var dssvJs = localStorage.getItem(localStorages);

var newDssv = JSON.parse(dssvJs);

if (newDssv) {
  dssv = newDssv.map(function (item) {
    return new SinhVien(
      item.ma,
      item.ten,
      item.mail,
      item.matKhau,
      item.ngaySinh,
      item.khoaHoc,
      item.toan,
      item.ly,
      item.hoa
    );
  });
  renderTable(dssv);
}

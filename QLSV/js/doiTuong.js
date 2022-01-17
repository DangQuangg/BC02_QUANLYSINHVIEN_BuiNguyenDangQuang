var SinhVien = function (
  _ma,
  _ten,
  _mail,
  _matKhau,
  _ngaySinh,
  _khoaHoc,
  _toan,
  _ly,
  _hoa
) {
  this.ma = _ma;
  this.ten = _ten;
  this.mail = _mail;
  this.matKhau = _matKhau;
  this.ngaySinh = _ngaySinh;
  this.khoaHoc = _khoaHoc;
  this.toan = _toan;
  this.ly = _ly;
  this.hoa = _hoa;
  this.tinhDtb = (this.toan + this.ly + this.hoa) / 3;
};

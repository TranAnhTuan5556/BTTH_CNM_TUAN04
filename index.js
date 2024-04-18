// console.log("hello");
const express = require("express");
const PORT = 3000;
const app = express();
let courses = require("./data");

//register middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views"))  //cho phep dung tai nguyen tinh nhu css, javascript, images

//config view
app.set("view engine", "ejs"); //khai bap rang app se dung engine ejs de render trang web
app.set("views", "./views");      //Noi dung render trang web se nam trong thu muc ten views

app.get("/", (req, resp) => {
    return resp.render("index", { courses })  //send data to ejs
});

app.listen(PORT, () => {
    console.log(`server dang ket noi den port ${PORT}`);
});

app.post('/save', (req, resp) => {
    const id = Number(req.body.id);
    const name = req.body.name;
    const course_type = req.body.course_type;
    const semester = req.body.semester;
    const department = req.body.department;

    const params = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "semester": semester,
        "department": department,
    }
    courses.push(params);
    return resp.redirect('/');

});

app.post('/delete', (req, res) => {
    const listCheckboxSelected = Object.keys(req.body); //Lay ra tat ca checkboxes
    //req.body tra ve 1 object chua cac cap key &value dinh dang:
    //'123456': "on",
    //"123458": "on",
    //listcheckboxselected tra ve 1 array: ['123456', '123458', '96707133'],
    if (listCheckboxSelected.length <= 0) {
        return res.redirect('/');
    }

    function onDeleteItem(length) {  //Dinh nghia ham de quy xoa
        const maSanPhamCanXoa = Number(listCheckboxSelected[length]);   //lay ra maSP can xoa

        data = data.filter(item => item.maSanPham !== maSanPhamCanXoa);   //Dung ham filter hoac .split, hoac nhieu cach khac de xoa mang
        if (length > 0) {
            console.log('Data deleted::', JSON.stringify(data));

            onDeleteItem(length - 1);
        } else      //Neu length =0 tuc la ko con gi trong listCheckBox de xoa -> render lai trang de cap nhat data
            return res.redirect('/');

    }
    onDeleteItem(listCheckboxSelected.length - 1);    //Goi ham de quy xoa
});
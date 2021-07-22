document.addEventListener("DOMContentLoaded",function(){ //memanggil event dom content loaded untuk menjalankan event didalam DOM
    
    const submitForm=document.getElementById("inputBook"); //mendapakan ID FORM

    submitForm.addEventListener("submit",function(event){ //memanggil event submit
        event.preventDefault();                             //mencegah untuk kembali ke default atau refresh
        addBook();                                          //memanggil fungsi addTodo pada script dom js
    });

    if(isStorageExist()){
        loadDataStoraged();
    }
});

document.addEventListener("ondatasaved",()=>{
    console.log("data berhasil disimpan");
});

document.addEventListener("ondataloaded", () =>{
    console.log("otw refresh data ni");
    refreshdata();
 });
const sudahDibaca = "completeBookshelfList";
const belumDibaca = "incompleteBookshelfList";
const bookShelfItem = "itemId"

function addBook(){
    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku= document.getElementById("inputBookAuthor").value;
    const tahunBuku= document.getElementById("inputBookYear").value;
    const checkbox =  document.getElementById("inputBookIsComplete");

    if(checkbox.checked ==true){
        const bukuYangSudahDibaca= document.getElementById(sudahDibaca);
        const publish = pembuatanBuku(judulBuku,penulisBuku,tahunBuku,true);
        bukuYangSudahDibaca.append(publish);
        const publishObject= composeBookshelfObject(judulBuku,penulisBuku,tahunBuku,true);
        bukuYangSudahDibaca[bookShelfItem] =publishObject.id;
        shelfbook.push(publishObject);
        updateDataStorage();

    }else{
    const bukuYangBelumDibaca = document.getElementById(belumDibaca);
    const informasi = pembuatanBuku(judulBuku,penulisBuku,tahunBuku,false);
    const informasiObject = composeBookshelfObject(judulBuku,penulisBuku,tahunBuku,false)
    informasi[bookShelfItem]=informasiObject.id;
    shelfbook.push(informasiObject);

    bukuYangBelumDibaca.append(informasi);
    updateDataStorage();
    }
};


function pembuatanBuku(judul,penulis,tahun,isComplete){

    const inputJudul = document.createElement("h3");
    inputJudul.classList.add("title");
    inputJudul.innerText= judul;


    const inputPenulis=document.createElement("p");
    inputPenulis.innerText= penulis;
    inputPenulis.classList.add("writer");

    const inputTahun =document.createElement("p");
    inputTahun.innerText= tahun;
    inputTahun.classList.add("year");


    const newContainer= document.createElement("div");
    newContainer.classList.add ("action");

    const container= document.createElement ("article");
    container.classList.add ("book_item")
    container.append(inputJudul,inputPenulis,inputTahun,newContainer);

    if(isComplete){  //jika kondisi iscompleted terusih seperti true
        newContainer.append(tombolMerah(),undobutton()); //maka kontainer akan menambahkan button untuk undo dan sampah
    } else{
    newContainer.append(tombolMerah(),tombolHijau());
}
    return container;
};

function pembuatanTombol (buttonTypeClass,eventListener,text){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText=text;
    button.addEventListener("click",function(event){
        eventListener(event)
    });
    return button;
};

function selesaiDibaca(listSudahDibaca){
    const judulInputan = listSudahDibaca.querySelector(".book_item > h3").innerText;
    const penulisInputan = listSudahDibaca.querySelector(".book_item >.writer").innerText;
    const tahunInputan= listSudahDibaca.querySelector(".book_item>.year").innerText;
    const pembuatanBukuBaru =pembuatanBuku(judulInputan,penulisInputan,tahunInputan,true);
    const baru = findBookshelf(listSudahDibaca[bookShelfItem]);
    baru.isComplete = true;
    pembuatanBukuBaru[bookShelfItem]=baru.id;

    const telahDibaca= document.getElementById(sudahDibaca);
    telahDibaca.append(pembuatanBukuBaru);
    listSudahDibaca.remove();

    updateDataStorage();
}

function undo(listSudahDibaca){
    const belumSelesai = document.getElementById(belumDibaca);
    const judulInputan= listSudahDibaca.querySelector(".book_item> h3").innerText;
    const penulisInputan= listSudahDibaca.querySelector(".book_item>.writer").innerText;
    const tahunInputan= listSudahDibaca.querySelector(".book_item>.year").innerText;
    const pembuatanBukuBaru = pembuatanBuku(judulInputan,penulisInputan,tahunInputan,false);
    const baruu= findBookshelf(listSudahDibaca[bookShelfItem]);
    baruu.isComplete= false;
    pembuatanBukuBaru[bookShelfItem]=baruu.id;
    belumSelesai.append(pembuatanBukuBaru);
    listSudahDibaca.remove();
    updateDataStorage();
};

function hapus(listSudahDibaca){
    const  position = findBookiIndex (listSudahDibaca[bookShelfItem]);
    shelfbook.splice(position,1);
    listSudahDibaca.remove();
    updateDataStorage();

};

function tombolHijau(){
    return pembuatanTombol("green",function(event){
    selesaiDibaca(event.target.parentElement.parentElement);
    },"Selesai di baca")
};

function tombolMerah(){
    return pembuatanTombol("red",function(event){
        hapus(event.target.parentElement.parentElement.parentElement);},"Hapus")
    };

function undobutton(){
    return pembuatanTombol("green", function(event){
        undo(event.target.parentElement.parentElement);},"Undo")
    };

// function refreshdata(){
//     const uncompleted = document.getElementById(belumDibaca);
//     let completed = document.getElementById(sudahDibaca);

//     for(book of bookShelfItem){
//         const newbook = pembuatanBuku (book.judulBuku, book.penulisBuku, book.tahunBuku, book.isComplete);
//         newbook[bookShelfItem]=book.id;


//     if (book.isComplete){
//         completed.append(newbook);
//     }else{
//         uncompleted.append(newbook);
//     }
//     }
//     }

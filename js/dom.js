const sudahDibaca = "completeBookshelfList";
const belumDibaca = "incompleteBookshelfList";

function addBook(){
    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku= document.getElementById("inputBookAuthor").value;
    const tahunBuku= document.getElementById("inputBookYear").value;
    const checkbox =  document.getElementById("inputBookIsComplete");
    
    if(checkbox.checked ==true){
        const bukuYangSudahDibaca= document.getElementById(sudahDibaca);
        const publish = pembuatanBuku(judulBuku,penulisBuku,tahunBuku,true);
        bukuYangSudahDibaca.append(publish);

    }else{
    const bukuYangBelumDibaca = document.getElementById(belumDibaca);
    const informasi = pembuatanBuku(judulBuku,penulisBuku,tahunBuku,false);
    bukuYangBelumDibaca.append(informasi);
    }
};


function pembuatanBuku(judul,penulis,tahun,kondisi){
    const inputJudul = document.createElement("h3");
    inputJudul.classList.add("title");
    inputJudul.innerText= judul;

    const inputPenulis=document.createElement("p");
    inputPenulis.classList.add("writer");
    inputPenulis.innerText= penulis;

    const inputTahun =document.createElement("p");
    inputTahun.classList.add("year");
    inputTahun.innerText= tahun;

    const container= document.createElement ("article");
    container.classList.add ("book_item")
    container.append(inputJudul,inputPenulis,inputTahun);
    if(kondisi){  //jika kondisi iscompleted terusih seperti true
        container.append(tombolMerah(),undo()); //maka kontainer akan menambahkan button untuk undo dan sampah
    } else{
    container.append(tombolMerah(),tombolHijau());
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
    const pembuatanBukuBaru = pembuatanBuku(judulInputan,penulisInputan,tahunInputan,true);
    const telahDibaca= document.getElementById(sudahDibaca);
    telahDibaca.append(pembuatanBukuBaru);
    listSudahDibaca.remove();
}

function listBelumSelesai(listSudahDibaca){
    const belumSelesai = document.getElementById(belumDibaca);
    const judulInputan= listSudahDibaca.querySelector(".book_item> h3").innerText;
    const penulisInputan= listSudahDibaca.querySelector(".book_item>.writer").innerText;
    const tahunInputan= listSudahDibaca.querySelector(".book_item>.year").innerText;
    const pembuatanBukuBaru = pembuatanBuku(judulInputan,penulisInputan,tahunInputan,false);
    belumSelesai.append(pembuatanBukuBaru);
    listSudahDibaca.remove();
};

function hapus(listSudahDibaca){
    listSudahDibaca.remove();
};

function tombolHijau(){
    return pembuatanTombol("green",function(event){
    selesaiDibaca(event.target.parentElement);
    },"Selesai di baca")
};

function tombolMerah(){
    return pembuatanTombol("red",function(event){
        hapus(event.target.parentElement);},"Hapus")
    };

function undo(){
    return pembuatanTombol("green", function(event){
        listBelumSelesai(event.target.parentElement);},"Undo")
    };

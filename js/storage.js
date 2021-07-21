const STORAGE_KEY = "SHELFBOOK_APPS";

let shelfbook = [];

function isStorageExist(){
if (typeof(Storage)=== undefined){
    alert("browser kamu tidak mendukung local storage");
    return false;
};

return true;

}

function saveData(){
    const parsed= JSON.stringify(shelfbook);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event("ondatasaved"));

}

function loadDataStoraged(){
    const serializedData =  localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) shelfbook=data;
    document.dispatchEvent(new Event("ondataloaded"));
}


function updateDataStorage(){
if (isStorageExist())
saveData();
}

function composeBookshelfObject (judul,penulis,tahun,isComplete){
    return{
        id: +new Date(),
        judul,
        penulis,
        tahun: parseInt(tahun),
        isComplete:Boolean(isComplete)
    };
}

function findBookshelf(bookId){
    for (book of shelfbook){
        if (book.id===bookId)
            return book;
    }

    return null;
}

function findBookiIndex(bookId){
    let index = 0;
    for (book of shelfbook){
        if(book.id === bookId)
        return index;
        index++;
    }
    return -1;
}


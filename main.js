let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')
let mood = 'create'
let tmp;

// get total

function gettotal(){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value )- +discount.value
        total.innerHTML = result;
        total.style.background ='#040'

    }
    else{
        total.innerHTML= ''
                total.style.background ='rgba(174, 8, 19, 0.893);'

    }

    

}


// create product

let product;
if(localStorage.prod != null){
    product = JSON.parse(localStorage.prod) ;

}
else{
    product = [];
}



create.onclick = function(){
let pro = { 
    title : title.value,
    price : price.value,
    taxes : taxes.value,
    ads : ads.value,
    discount : discount.value,
    total : total.innerHTML,
    count : count.value,
    category : category.value,
    

}
if(title.value != ''){
if(mood === 'create'){
if(pro.count > 1){
    for(let i = 0 ; i < pro.count; i++){
        product.push (pro);

    }
   

}
 else{product.push (pro)}}
 else{
    product[ tmp ] = pro;
    mood='create'
    create.innerHTML = 'create'
    count.style.display='block'
 }
}

localStorage.setItem ('prod' , JSON.stringify(product))
getclear();
showdata();
}
// clear data

function getclear(){
    title.value = "";
    taxes.value = "";
    price.value = "";
    ads.value = "";
    total.innerHTML="";
    discount.value = "";
    count.value = "";
    category.value = "";
}

// show data 

function showdata(){
    
    let table = ''
    for(let i = 0; i < product.length; i++){
        table += `
        <tr>

                     <td>${i}</td>
                    
                     <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total} </td>
                    <td>${product[i].category}</td>
                     <td><button onclick ="updatedata(${i})" id="update">update</button> </td>
                    <td><button onclick = "deleteitem(${i})" id="delete">delete</button> </td>
                    </tr>
        `
       

    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete=document.getElementById('DeleteAll');
if(product.length > 0){
 btndelete.innerHTML =`<button onclick = "deleteall()" >Delete All (${product.length})</button> `;
}
else{
    btndelete.innerHTML='';
}
   
    

}

    
showdata();

// delete item

function deleteitem(i){
    product.splice(i,1);
    localStorage.prod = JSON.stringify(product);

    showdata();

}
// delete all 

function deleteall(){
    product.splice(0);
    localStorage.clear();

    showdata();

}


// updata data
function updatedata(i){

    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    category.value = product[i].category;
  count.style.display='none'
  create.innerHTML='Update'
  mood='update';
   tmp = i;

    gettotal();
    scroll({
        top:0,
        behavior:"smooth",
    })
}

// serarch
let moood='title';
let search = document.getElementById('search');
function searchbymood(id){
    if(id == 'searchtitle')
        {
            moood ='title';
        search.placeholder='search by title';}
            
            else{
                moood='category'
                search.placeholder='search by category';
            }
            search.focus()

            console.log(moood)
}

    function searchh(value){
        let table = '';
        for(let i = 0 ; i < product.length; i++){
            if(product[i].title.includes(value)){
                table +=
                 `
        <tr>

                     <td>${i}</td>
                    
                     <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total} </td>
                    <td>${product[i].category}</td>
                     <td><button onclick ="updatedata(${i})" id="update">update</button> </td>
                    <td><button onclick = "deleteitem(${i})" id="delete">delete</button> </td>
                    </tr>
        `
                
            }
            else{
                if(product[i].category.includes(value)){
                    table +=
                      `
        <tr>

                     <td>${i}</td>
                    
                     <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total} </td>
                    <td>${product[i].category}</td>
                     <td><button onclick ="updatedata(${i})" id="update">update</button> </td>
                    <td><button onclick = "deleteitem(${i})" id="delete">delete</button> </td>
                    </tr>
        `

                }

            }

        }
            document.getElementById('tbody').innerHTML = table;

    }

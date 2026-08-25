const cl = console.log;

const customerForm = document.getElementById('customerForm')
const name1 = document.getElementById('name')
const email = document.getElementById('email')
const contact = document.getElementById('contact')
const city = document.getElementById('city')
const addCustBtn = document.getElementById('addCustBtn')
const updateCustBtn = document.getElementById('updateCustBtn')
const customerTable = document.getElementById('customerTable')

let customersArr = [
    { id: "cust1", name: "Aarav", email: "aarav@gmail.com", contact: "9876500011", city: "Pune" },
    { id: "cust2", name: "Ananya", email: "ananya@gmail.com", contact: "9876500012", city: "Mumbai" },
    { id: "cust3", name: "Vihaan", email: "vihaan@gmail.com", contact: "9876500013", city: "Nashik" },
    { id: "cust4", name: "Isha", email: "isha@gmail.com", contact: "9876500014", city: "Nagpur" },
    { id: "cust5", name: "Arjun", email: "arjun@gmail.com", contact: "9876500015", city: "Pune" }
];

function onCreateCust(arr) {
    let res = '';

    arr.forEach((ele, i) => {
        res += `<tr id="${ele.id}">
                                    <td>${i + 1}</td>
                                    <td>${ele.name}</td>
                                    <td>${ele.email}</td>
                                    <td>${ele.contact}</td>
                                    <td>${ele.city}</td>
                                    <td><button type="button" onclick="onCustomerEdit(this)" class="btn btn-outline-success btn-sm">Edit</button></td>
                                    <td><button type="button" onclick="onCustomerRemove(this)" class="btn btn-outline-danger btn-sm">Remove</button></td>
                                </tr>`
    });

    customerTable.innerHTML = res
}

onCreateCust(customersArr)

function onSubmitCustHandler(eve) {
    eve.preventDefault();

    let newCustomer = {
        name: name1.value,
        email: email.value,
        contact: contact.value,
        city: city.value,
        id: Date.now().toString()
    }
    customerForm.reset()
    customersArr.push(newCustomer)

    let trs = document.createElement('tr')
    trs.id = newCustomer.id
    trs.innerHTML = `<td>${customersArr.length}</td>
                                    <td>${newCustomer.name}</td>
                                    <td>${newCustomer.email}</td>
                                    <td>${newCustomer.contact}</td>
                                    <td>${newCustomer.city}</td>
                                    <td><button type="button" onclick="onCustomerEdit(this)" class="btn btn-outline-success btn-sm">Edit</button></td>
                                    <td><button type="button" onclick="onCustomerRemove(this)" class="btn btn-outline-danger btn-sm">Remove</button></td>`
    customerTable.append(trs)
}

function onCustomerEdit(ele) {
    let editId = ele.closest('tr').id;
    // cl(editId)
    updateCustBtn.setAttribute('editId', editId)

    let editObj = customersArr.find(e => e.id === editId)
    // cl(editObj)

    name1.value = editObj.name
    email.value = editObj.email
    contact.value = editObj.contact
    city.value = editObj.city

    addCustBtn.classList.add('d-none')
    updateCustBtn.classList.remove('d-none')
}

function onCustUpdate(){
    let updateId = this.getAttribute('editId')
    this.removeAttribute('editId')
    cl(updateId)

    let updateObj = {
        name : name1.value,
        email : email.value,
        contact : contact.value,
        city : city.value,
        id:updateId
    }

    let getIndex = customersArr.findIndex(e => e.id === updateId)
    customersArr[getIndex] = updateObj

    let tr = document.getElementById(updateId).children;
    tr[1].innerText = updateObj.name
    tr[2].innerText = updateObj.email
    tr[3].innerText = updateObj.contact
    tr[4].innerText = updateObj.city

    addCustBtn.classList.remove('d-none')
    updateCustBtn.classList.add('d-none')
}


function onCustomerRemove(ele){
    let removeId = ele.closest('tr').id;
    cl(removeId)

    let getConfirm = confirm(`Are you sure you want to delete cusomer with id ${removeId}`)

    if(getConfirm){
        let getIndex = customersArr.findIndex(e => e.id === removeId)

        customersArr.splice(getIndex, 1)

        ele.closest('tr').remove()

        let trs = document.querySelectorAll('#customerTable tr td:first-child')
        trs.forEach((e, i) => e.innerText = i + 1)
    }
}

customerForm.addEventListener('submit',onSubmitCustHandler )
updateCustBtn.addEventListener('click', onCustUpdate)
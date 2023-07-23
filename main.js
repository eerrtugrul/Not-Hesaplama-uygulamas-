let students = []

let varMıLocalde = localStorage.getItem('students')

if (varMıLocalde) {
    students = JSON.parse(localStorage.getItem("students"));

} else{
    students = []
}

const studentForm = document.querySelector('#student-form')

const studentList = document.querySelector('#student-list')

const addButton = document.querySelector('.ekle')

studentForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const name = document.querySelector('#name').value
    
    const surname = document.querySelector('#surname').value
    
    const number = document.querySelector('#number').value
    
    const vize = document.querySelector('#vize').value
    
    const final = document.querySelector('#final').value

  
    const newStudent ={
        name: name,
        surname: surname,
        number: number,
        vize: Number(vize),
        final:Number(final),
    }

    students.push(newStudent)






    console.log('Her yenı ogrencıden biri', newStudent)
    studentForm.reset()
    saveToLocalStorage()
    console.log('students',students)
});

function saveToLocalStorage(){
    localStorage.setItem('students',JSON.stringify(students))
}


viewStudentList()

function viewStudentList() {
    const emptyList = document.querySelector('.empty')

    

    if (students.length) {

        if(emptyList){
            emptyList.style.display= 'none'

        }

        studentList.innerHTML = ''

        students.forEach((oAnkiOgrenci, index)=>{
            const studentCard =`
       
            <div class="student-item-info">
                <h3> ${oAnkiOgrenci.name} ${oAnkiOgrenci.surname} - ${oAnkiOgrenci.number}</h3>
                <span>Vize: ${oAnkiOgrenci.vize} Final: ${oAnkiOgrenci.final}</span>
                <p>Ortalama: ${((oAnkiOgrenci.vize+oAnkiOgrenci.final)/2).toFixed(2)}</p>
            </div>
            <div class="student-item-process">
                <i class="fa-regular fa-pen-to-square edit-button" onclick='editStudent(${index})' ></i>
                <i class="fa-regular fa-trash-can delete-button" onclick='deleteStudent(${index})'></i>
            </div>
        </div>`

        const studentItem =document.createElement('div')
        studentItem.classList.add('student-item')
        studentItem.innerHTML= studentCard

        const ortalama = ((oAnkiOgrenci.vize+oAnkiOgrenci.final)/2).toFixed(2)

        if (ortalama>80){
            console.log('80 den buyuk')
            studentItem.style.background= '#15aefe'
        } else if (ortalama > 60){
            console.log('60 dan buyuk')
            studentItem.style.background=  '#f47121';

        } else if (ortalama > 45){
            console.log('45 den buyuk')
            studentItem.style.background= '#630eff;'

        }  else {
            console.log('45 den dusuk')
            studentItem.style.background= 'red';
        }
        




        console.log('studentList', studentList)
        studentList.appendChild(studentItem)
            
        })
       
    } else {
        console.log('bos')
        const forEmpty = `<p class="empty">Listenizde Öğrenci Bulunmamaktadır.</p>`
        studentList.innerHTML = forEmpty;
    }
}
function deleteStudent(gelenIndex){
    //console.log('deleteStudent fonksiyonu çalıştı', gelenIndex)
    const sonuc = students.filter((oankiDeger, index)=>{
        
       if(index === gelenIndex){
         Toastify({

            text: `${oankiDeger.name} adındaki ögrenci listesinden silindi. `,
            
            duration: 1000
            
            }).showToast();
       } 
        
        return index !== gelenIndex} )
    console.log('sonuca gore students=>', sonuc)

    students= sonuc
    
    saveToLocalStorage()
    //localStorage.setItem('students',JSON.stringify(students))
    
    viewStudentList()
    
}

function editStudent(gelenIndex){
   // console.log('editStudent çalıştı', gelenIndex)

    //const editStudent = students[gelenIndex]
    //console.log('editStudent çalıştı', editStudent)

    //const editStudent= students.filter((oAnkiOgrenci,index)=> index===gelenIndex)
    //console.log('editStudent çalıştı', editStudent)

    const editStudent = students.find((oAnkiOgrenci,index)=>index===gelenIndex)
    console.log('editStudent çalıştı', editStudent)

document.querySelector('#name').value = editStudent.name
document.getElementById('surname').value = editStudent.surname
document.getElementById('number').value = editStudent.number
document.getElementById('vize').value = editStudent.vize
document.getElementById('final').value = editStudent.final

deleteStudent(gelenIndex)
saveToLocalStorage()

}

























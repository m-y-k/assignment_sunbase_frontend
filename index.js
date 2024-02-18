const inputBox = document.getElementById('inputBox')
const selectBox = document.getElementById('selectBox')
const textAreaBox = document.getElementById('textAreaBox')
const saveButton = document.getElementById('save-btn');
const form = document.getElementById('form')


let data = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
]

function loadFormFields() {
    form.innerHTML = ``
    
    data.forEach((inputType, index) => {
        const box = document.createElement('div');
        box.classList.add('draggable')
        box.classList.add('form-component')
        box.id = inputType.id;
        box.draggable = true;
        let inputElement;
    
        if (inputType.type === 'input') {
            inputElement = `<input type="text" placeholder="${inputType.placeholder}" />`;
        } else if (inputType.type === 'select') {
            let options = '';
            inputType.options.forEach(option => {
                options += `<option value="${option}">${option}</option>`;
            });
            inputElement = `<select>${options}</select>`;
        } else if (inputType.type === 'textarea') {
            inputElement = `<textarea placeholder="${inputType.placeholder}"></textarea>`;
        }

        box.innerHTML = `<div class="text-options">
                            <p>${inputType.label}</p>
                            <svg onClick="deleteById('${inputType.id}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 
                                32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 
                                6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 
                                467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                        </div>
                        <div class="text-body">
                            ${inputElement}
                        </div>`;
        form.appendChild(box);
    });


    enableDraggableOption()
    
}


saveButton.addEventListener('click', () => {
    console.log(data);
});


inputBox.addEventListener('click', () => {
    const newField = {
        "id": generateUUID(),
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    }

    data = [...data, newField]
    // console.log(data)
    loadFormFields()
})

textAreaBox.addEventListener('click', () => {
    const newField = {
        "id": generateUUID(),
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    }

    data = [...data, newField]
    // console.log(data)
    loadFormFields()
})

selectBox.addEventListener('click', () => {
    const newField = {
        "id": generateUUID(),
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    }

    data = [...data, newField]
    // console.log(data)
    loadFormFields()
})

function deleteById(id) {
    // console.log('clicked ', id)
    data = data.filter(inputType => inputType.id !== id)
    loadFormFields()
}

function generateUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

loadFormFields()


function enableDraggableOption() {
    
    const draggables = document.querySelectorAll('.draggable')
    const container = document.querySelector('.container')

    draggables.forEach(draggable => {
        
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        // console.log(afterElement)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }

    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        // console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return { offset : offset, element : child }
        } else {
            return closest
        }
        }, { offset : Number.NEGATIVE_INFINITY }).element
    }

}
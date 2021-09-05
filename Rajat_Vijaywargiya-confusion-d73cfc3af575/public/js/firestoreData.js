var db = firebase.firestore();

function renderUI3(datav) {
    let item = document.getElementById(datav.Cuisine.split(" ").join("_") + "2");
    let col = document.createElement("div");
    col.className = "col-sm-3";
    col.innerHTML = `
                        <div class="card flip-card">
                            <div class="card-body flip-card-inner" style="background-image: url(${datav.Image_URL});">
                                <div class="flip-card-front text-white" style="background-color: rgba(255, 0, 0, 0.3);">
                                    <h5 class="card-title">${datav.TranslatedRecipeName}</h5>
                                    <p class="card-text" style="font-size: small;">Price: ₹ <span>${datav.Price}</span></p>
                                </div>
                                <div class="flip-card-back">
                                    <button class="add-cart btn btn-primary" onclick="addTocart(event);">Add to Cart</button>
                                </div>
                            </div>
                        </div>
    `
    item.appendChild(col);
}


function getData(key) {
    var docRef = db.collection("menu").doc(key).collection("List");

    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            renderUI3(data);
        });
    });
}

function renderUI2(data) {
    data = data.split(" ").join("_");
    let content = document.getElementById("mycontent");
    let div = document.createElement("div");
    div.id = data + '1';
    div.className = "tab-pane fade";
    div.setAttribute("role", "tabpanel");
    div.setAttribute("aria-labelledby", '(${ data })');
    div.innerHTML = `
    <div class="row" id='${data+'2'}'>
    </div>
    `
    content.appendChild(div);
}

function renderUI1(data) {
    data = data.split(" ").join("_");
    let main = document.getElementById("myTab");
    let card = document.createElement("li");
    card.className = "foodinks"
    card.innerHTML = `
      
    <a class="nav-link text-white" style="text-align:center;font-weight:700" id='${data}' data-toggle="tab" href="#${data+'1'}" role="tab" aria-controls=${data+'1'} aria-selected="false">${data}</a>
    
    `;
    main.appendChild(card);
    renderUI2(data)
}

function classAdder() {
    var x = document.querySelectorAll(".foodinks");
    for (var i = 0; i < x.length; i++) {
        x[i].className = "nav-item col-sm-3";
    }
    document.getElementById("Andhra1").className = "tab-pane fade active show";
}

var arr = ['Andhra', 'Arab', 'Asian', 'Bengali', 'Chettinad', 'Chinese', 'Coastal Karnataka', 'Continental', 'Coorg', 'European', 'Fusion', 'Goan', 'Gujarati', 'Hyderabadi', 'Indian',
    'Italian', 'Karnataka', 'Kashmiri', 'Kerala', 'Lucknowi', 'Maharashtrian', 'Mexican', 'North Indian', 'Punjabi', 'Rajasthani', 'Sindhi', 'South Indian', 'Tamil Nadu', 'Thai', 'Udupi'
]

for (let key in arr) {
    renderUI1(arr[key]);
    getData(arr[key]);
}

classAdder();
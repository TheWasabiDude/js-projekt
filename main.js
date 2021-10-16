async function query() {
    const data = await fetch("movielist.json");

    let eredmeny = document.getElementById("result");

    if (!data.ok) {
        throw new Error('Query failed'); //todo hiba üzenet
    }

    let list = await data.json();
    list.sort((a, b) => {
        if (a.year < b.year) {
            return 1;
        } else {
            return -1;
        }
    }).forEach(element => {
        eredmeny.innerHTML += `<div class=\"clickable\" id=\"${element.title}\"> ${element.title} (${element.year}) </div>`;
    });

    const titles = document.getElementsByClassName("clickable")
    for (let i = 0; i < titles.length; i++) {
        titles[i].addEventListener('click', (e) => {
            const target = e.target
            eredmeny.innerHTML = "";

            let index
            for (let j = 0; j < list.length; j++) {
                if (list[j].title === target.id) {
                    index = j;
                    break;
                }
            }

            eredmeny.innerHTML += `<div> Név: ${list[index].title} </div>`;
            eredmeny.innerHTML += `<div> Kiadási év: ${list[index].year}`;
            eredmeny.innerHTML += `<div id=\"cast\"> Szereplő lista: ${list[index].cast.toString().replace(/,/g, ', ')} </div>`;
            eredmeny.innerHTML += `<div id=\"genre\"> Műfaj: ${list[index].genres.toString().replace(/,/g, ', ')}</div>`;

            function createResetButton() {
                const reset = document.createElement("BUTTON");
                reset.innerHTML = "Reset";
                reset.setAttribute("id", "resetButton")
                document.body.appendChild(reset);
    
                document.getElementById("resetButton").addEventListener('click', () => {
                    eredmeny.innerHTML = "";
                    query();
                });
            }

            createResetButton();

            document.getElementById("cast").addEventListener('click', () => {
                eredmeny.innerHTML = "";
           
                for (let j = 0; j < list.length; j++) {
                    let print = false;
                    for (let k = 0; k < list[j].cast.length; k++) {
                        if (list[index].cast.includes(list[j].cast[k])) {
                            print = true;
                            break;
                        }
                    }

                    if (print) {
                        eredmeny.innerHTML += `<div> ${list[j].title} (${list[j].year}) </div>`;
                    }
                }

                createResetButton();
            });

            document.getElementById("genre").addEventListener('click', () => {
                eredmeny.innerHTML = "";
           
                for (let j = 0; j < list.length; j++) {
                    let print = false;
                    for (let k = 0; k < list[j].genres.length; k++) {
                        if (list[index].genres.includes(list[j].genres[k])) {
                            print = true;
                            break;
                        }
                    }

                    if (print) {
                        eredmeny.innerHTML += `<div> ${list[j].title} (${list[j].year}) </div>`;
                    }
                }

                createResetButton();
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gomb").addEventListener("click", () => {
        document.getElementById('gomb').style.visibility = 'hidden';
        query();
    });
});
$(
  (function () {
    $(".form").submit(function (event) {
      event.preventDefault();

      // Ссылка, которую получили на этапе публикации приложения
      let appLink =
        "https://script.google.com/macros/s/AKfycbzCGGyq-ta7ZSAqn-nEZScSK6zuMdDU2Bg6xPe13DvV4KB0XBtxViC4MusopNt3vyLgXg/exec";

      // Id текущей формы
      let form = $("#" + $(this).attr("id"))[0];

      // FormData
      let fd = new FormData(form);

      $.ajax({
        url: appLink,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
    });
  })(jQuery)
);



// $(document).ready(function () {
//   $.getJSON(
//     "https://sheets.googleapis.com/v4/spreadsheets/1QtK2Y98kBhAUA5ZQA5VGHgg13dLO7lO8mnbXmDplaXE/values/responses?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
//     function (elemEdded) {
//       elemEdded = elemEdded["values"];
//       // console.log(done);
//       showGoods(elemEdded);
//     }
//   );
//   function showGoods(elemEdded) {
//     const code = document.getElementById("code");
//     for (let k = 0; k < elemEdded.length; k++) {
      
//         console.log(elemEdded[k][1]);
//         if (code.value == elemEdded[k][1]) {
//           alert("Urządzenie już sprawdzone !!!");
//       }
//       // else{
//       //   alert("Urządzenie niema??");
//       // }
//     }
//   }
// });

$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1QtK2Y98kBhAUA5ZQA5VGHgg13dLO7lO8mnbXmDplaXE/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
    function (data) {
      data = data["values"];
      // console.log(data);
      showGoods(data);
    }
  );

  function showGoods(data) {
    var out = "";
    // for (let i = 0; i < data.length; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    //     out += `<div>`;
    //     out += `<p>...........${data[i][j]}</p>`;
    //     out += `</div>`;
    //     //   function checkAvailability(arr, val) {
    //     //     return arr.some(function(arrVal) {
    //     //       return val === arrVal;
    //     //     });
    //     //   }
    //     //   console.log(checkAvailability(data[i], 'ACP/4/17'));
    //   }
    // }

    const btn = document.querySelectorAll(".btn");
    const display_none_dodane = document.querySelector(".display_none_dodane");
    const display_none_nie_dodane = document.querySelector(
      ".display_none_nie_dodane"
    );
    const code = document.getElementById("code");
    const message = document.getElementById("message");

    code.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();

        let flag = true;
        // for (let k = 0; k < done.length; k++) {
        //   for (let l = 0; l < done[k].length; l++) {
        //     if (code.value == done[k][0]) {
        //       alert("Urządzenie już sprawdzone !!!");
        //     }
        //   }
        // }

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            
            // if (($.cookie()[i+1]) == code.value) {
            //   alert("Urządzenie już sprawdzone !!!");
            // }
              if (code.value == data[i][0]) {
              let dodac_urzadzenie = document.createElement("td");
              dodac_urzadzenie.className = "td-on";
              dodac_urzadzenie.textContent = `${data[i][j]}`;
              document.querySelector(".dodawanie").appendChild(dodac_urzadzenie);
              // localStorage.setItem('localStorageOut', JSON.stringify(`${data[i][j]}`));
              // localStorage['localStorageOut'] = JSON.stringify(data[i][j]);
              //  document.querySelectorAll('td')[1].localName = "Lokalizacja";

              flag = false;
              // alert("Urządzenie dodane");
              display_none_dodane.classList.remove("display_none_dodane");
              btn[0].addEventListener("click", btnClick);
              function btnClick() {
                // document.cookie = `${i + 1}=${code.value}`;
                setTimeout(function(){
                  location.reload();
              }, 3000);
                // location.reload();
              }
            }
            
          }
        }
        if (flag == false) {
          display_none_nie_dodane.remove();
          let lokalizacja_td = document.querySelectorAll(".td-on")[1];
          let numer_seryjny_td = document.querySelectorAll(".td-on")[2];
          let dzial_td = document.querySelectorAll(".td-on")[3];
          let model_td = document.querySelectorAll(".td-on")[4];

          let lokalizacja = "";
          let numer_seryjny = "";
          let dzial = "";
          let model = "";
          lokalizacja += `<input name="Lokalizacja" value="${lokalizacja_td.textContent}">`;
          numer_seryjny += `<input name="Numer_seryjny" value="${numer_seryjny_td.textContent}">`;
          dzial += `<input name="Dzial" value="${dzial_td.textContent}">`;
          model += `<input name="Model" value="${model_td.textContent}">`;
          $(".lokalizacja").html(lokalizacja);
          $(".numer_seryjny").html(numer_seryjny);
          $(".dzial").html(dzial);
          $(".model").html(model);


          fetch('https://ipapi.co/json/')
  .then(d => d.json())
  .then(d => document.querySelector('.ip').value = d.ip)
  .then(d => document.querySelector('.city').value = d.city)
  .then(d => document.querySelector('.org').value = d.org);
        }
        if (flag == true) {
          display_none_dodane.remove();
          alert("Brak urządzenia w bazie, dodaj nowe urządzenie");
          display_none_nie_dodane.classList.remove("display_none_nie_dodane");
          btn[1].addEventListener("click", btnClick);
              function btnClick() {
                // document.cookie = `${i + 1}=${code.value}`;
                setTimeout(function(){
                  location.reload();
              }, 3000);
                // location.reload();
              }
        }
      }
    });
    // $(".dodaj_tu").html(out);
  }
});

$("input").keyup(function () {
  this.value = this.value.toUpperCase();
});

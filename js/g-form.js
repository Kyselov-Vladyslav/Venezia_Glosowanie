$(
  (function () {
    $(".form").submit(function (event) {
      event.preventDefault();
      let appLink =
        "https://script.google.com/macros/s/AKfycbyMCKFMXhok_XZzaNW9OYqF9MjBqfqMDCVeExgIN_DNnC0S1dwptwH6a_Opkin0a1hF/exec";

      let form = $("#" + $(this).attr("id"))[0];

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

$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1mLA9bNvbs5Ls2zb3SZLK9va_7eq_6JdGh6qKubQdAdQ/values/responses?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
    function (elemEdded) {
      elemEdded = elemEdded["values"];
      // console.log(elemEdded);

      $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
        console.log(JSON.stringify(data, null, 2));
      });

      const ip = 'https://ipapi.co/json/';
      const getCity = async () => {
          try{
              const response = await fetch(ip);
              const dataIp = await response.json();
              return dataIp
          }catch(err){
              console.error(err);
          }
      }
      getCity().then(dataIp => {
              const ipUser = document.querySelector('.ip');
              const ipCity = document.querySelector('.city');
              const ipOrg = document.querySelector('.org');
              ipUser.value = `${dataIp.ip}`;
              ipCity.value = `${dataIp.region} | ${dataIp.city}`;
              ipOrg.value = `${dataIp.org}`;
      });





      // fetch("https://ipapi.co/json/").then((ipJson) => ipJson.json()).then((ipJson) => (document.querySelector(".ip").value = ipJson.ip));

      // fetch("https://ipapi.co/json/").then((cityJson) => cityJson.json()).then((cityJson) => (document.querySelector(".city").value = cityJson.city));

      // fetch("https://ipapi.co/json/").then((orgJson) => orgJson.json()).then((orgJson) => (document.querySelector(".org").value = orgJson.org));

      const generateToken = (length = 8) => {
        if(typeof length != 'number'){
            return "nie można";
        }
        const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ123456789!@#$%^&*()';
    
        const tabRandom = [];
    
        for(let i = 0; i<parseInt(length); i++){
           const char = Math.floor(Math.random() * (string.length - 1));
            tabRandom.push(string[char]);
        }
    
       return tabRandom.join('');
    }
  
      const btn = document.querySelector(".btn");
      const ready = document.querySelector(".ready");
      const kod = document.querySelector(".kod");
      const radioDiv = document.querySelector(".radio-div");
      const kandydat = document.querySelectorAll(".kandydat");
      const form = document.querySelector(".form");

if (!$.cookie("kod")){
       const losoKod= generateToken(12);

      $.cookie("kod", losoKod, { expires : 100 });
      console.log(kod.value);
    }
    kod.value = $.cookie("kod");
      // console.log(document.cookie = `kod=`)

        form.addEventListener("input", function (event) {

         if(kandydat[1].value != ""){
          
        if (kandydat[3].checked ) {

          
          btn.addEventListener("click", () => {
            
            // document.cookie = 'user=voted; expires=Tue, 19 Jan 2023 00:00:00 GMT';
            // localStorage.setItem('user', 'voted');
            // document.cookie = `kod=${kod.value}; expires=Tue, 19 Jan 2023 00:00:00 GMT`;
            btn.classList.add("none");
            ready.classList.remove("none");
            kandydat[0].classList.add("none");
            kandydat[1].classList.add("none");
            kandydat[2].classList.add("none");
            radioDiv.classList.add("none");
          });
        
        }
      
        if (kandydat[4].checked) {
          
          btn.addEventListener("click", () => {

            // document.cookie = `kod=${kod.value}; expires=Tue, 19 Jan 2023 00:00:00 GMT`;

            document.cookie = 'user=voted; expires=Tue, 19 Jan 2023 00:00:00 GMT';
            localStorage.setItem('user', 'voted');
            btn.classList.add("none");
            ready.classList.remove("none");
            kandydat[0].classList.add("none");
            kandydat[1].classList.add("none");
            kandydat[2].classList.add("none");
            radioDiv.classList.add("none");
          });
        }
      }
    });
      

      if (
        document.cookie != "user=voted" &&
        localStorage.getItem("user") != "voted"
      ) {
        btn.classList.remove("none");
        ready.classList.add("none");
        kandydat[0].classList.remove("none");
        kandydat[1].classList.remove("none");
        kandydat[2].classList.remove("none");
        radioDiv.classList.remove("none");
      }
      // for (let i = 0; i < elemEdded.length; i++) {
      //   console.log(elemEdded[i][1]);

      // }

      // for (let i = 1; i < elemEdded.length; i++) {

      //   let dodac_tr = document.createElement("tr");
      //   dodac_tr.className = "added";

      //   for (let j = 0; j < elemEdded[i].length; j++) {

      //       let dodac_urzadzenie = document.createElement("td");
      //       dodac_urzadzenie.innerHTML = elemEdded[i][j];
      //       dodac_tr.appendChild(dodac_urzadzenie);
      //  }
      //  if (elemEdded[i][6] == "#"){
      //   document.querySelector(".sprawdzone").appendChild(dodac_tr);
      //  }else {
      //   document.querySelector(".migracja").appendChild(dodac_tr);
      //  }
      // }
    }
  );
});

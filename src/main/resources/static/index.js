$(function () {
  $(document).ready(function() {
    $.ajax({
      url: "api/user"
    }).done(function(){
      loadWrapper();
      window.addEventListener("hashchange", loadContent, false);
    });
  });

  function loadWrapper(){
    var component = {
      name: "wrapper",
      id: null
    };
    index_loadTemplate(component, function(template) {
      dust.renderSource(template, {}, function (err, out) {
        $("#app").empty().append(out);

        //Обработчики обвязки
        index_loadScript(component);

        //Загружаем контент
        loadContent();
      });
    });
  }

  //Загружаем контент
  function loadContent() {
    var component = parseHash(window.location.hash);
    if (!component.name)
      component.name = "main";
    index_loadTemplate(component, function(template) {
      index_loadScript(component, template)
    });
  }
}).ajaxError(function(event, XHR) {
  if (XHR.status === 401)
    window.location.href = 'auth.html';
});

//Загружаем шаблон
function index_loadTemplate(component, loadCallback, errorCallback) {
    $.ajax({
        url: "components/" + component.name + "/" + component.name + ".dust"
    }).done(function (template) {
        loadCallback ? loadCallback(template) : null;
    }).fail(function (XHR) {
        console.error("Ошибка загрузки шаблона: " + component.name + ".dust");
        errorCallback ? errorCallback(XHR) : null;
    })
}

//Запускаем нужный скрипт
function index_loadScript(component, template, errorCallback) {
    $.ajax({
        url: "components/" + component.name + "/" + component.name + ".js"
    }).done(function (script) {
        script ? window["init"](template) : null;
    }).fail(function (XHR) {
        console.error("Ошибка загрузки скрипта: " + component.name + ".js");
        errorCallback ? errorCallback(XHR) : null;
    });
}


function parseHash(hash) {
  var component = {
    name: null,
    id: null
  };
  if (hash.indexOf("/") === -1) {
    component.name = hash.substring(1,hash.length);
  }
  else {
    component.name = hash.substring(1, hash.indexOf("/"));
    component.id = hash.substring(hash.indexOf("/")+1, hash.length);
  }
  return component;
}

// function loadContent() {
// $.ajax({
//       url: "api/" + category + "/" + id,
//       type: "GET"
//   }).done(function(data){
//       dataInMem = data;
//       $.ajax({
//           url: "components/" + category + "/" + category + ".dust",
//           type: "GET"
//       }).done(function(coursesTemplate) {
//           dust.renderSource(coursesTemplate, data, function (err, out) {
//           $app.empty().append(out);
//           $.ajax({
//               url: "components/" + category + "/" + category + ".js",
//               type: "GET"
//           }).done(function() {
//               window["init"](dataInMem);
//           });
//           });
//       });
//   }).fail(function(XHR) {
//         console.log("We are in 1 error");
//         console.log(XHR);
//   });
// }

// $(window).on("load", function() {
//     parseHash(window.location.hash);
//     loadContent();
// });

// $(window).on("hashchange", function() {
//     parseHash(window.location.hash);
//     loadContent();
// });

//var $app = $("#app");
//var category;
//var id;
//var dataInMem = "";
//
//function parseHash(hash) {
//if (hash.indexOf("/") === -1) {
//    category = hash.substring(1,hash.length);
//    id = "";
//} else {
//    category = hash.substring(1, hash.indexOf("/"));
//    id = hash.substring(hash.indexOf("/")+1, hash.length);
//}
//}
//
//function loadContent() {
//$.ajax({
//      url: "api/" + category + "/" + id,
//      type: "GET"
//  }).done(function(data){
//      dataInMem = data;
//      $.ajax({
//          url: "components/" + category + "/" + category + ".dust",
//          type: "GET"
//      }).done(function(coursesTemplate) {
//          dust.renderSource(coursesTemplate, data, function (err, out) {
//          $app.empty().append(out);
//          $.ajax({
//              url: "components/" + category + "/" + category + ".js",
//              type: "GET"
//          }).done(function() {
//              window["init"](dataInMem);
//          });
//          });
//      });
//  }).fail(function(XHR) {
//        console.log("We are in 1 error");
//        console.log(XHR);
//  });
//}
//
//$(window).on("load", function() {
//    parseHash(window.location.hash);
//    loadContent();
//});
//
//$(window).on("hashchange", function() {
//    parseHash(window.location.hash);
//    loadContent();
//});
//
//
//
////  $.ajax({
////      url: "api/students/",
////      type: "GET"
////  }).done(function(data){
////      console.log("We get all students");
////      $.ajax({
////          url: "components/tableOfStudents/tableOfStudents.dust",
////          type: "GET"
////      }).done(function(studentsTemplate) {
////          console.log("Template loaded");
////          dust.renderSource(studentsTemplate, data, function (err, out) {
////          $app.empty().append(out);
////
//////          $.ajax({
//////              url: "components/tableOfCourses/addButtonsOnTable.js",
//////              type: "GET"
//////          }).done(function() {
//////              console.log("tableOfCourses.js loaded");
//////              window["addButtonsOnTable"]("btn");
//////          });
////
////          });
////      });
////  }).fail(function(XHR) {
////
////  })
//
//
//
//
//
////$(window).on("hashchange", function() {
////
////});
////
////$.ajax({
////    url: "api/buttons.json",
////    type: "GET"
////}).done(function(data) {
////
////    console.log("Data loaded");
////    $.ajax({
////        url: "components/buttons/buttons.dust",
////        type: "GET"
////    }).done(function(buttonsTemplate) {
////        console.log("Template loaded");
////        dust.renderSource(buttonsTemplate, data, function (err, out) {
////            $app.empty().append(out);
////
////            $.ajax({
////                url: "components/buttons/buttons.js",
////                type: "GET"
////            }).done(function() {
////                console.log("JS loaded");
////                window["buttons"]("button");
////            });
////        });
////    });
////}).fail(function(XHR) {
////
////})
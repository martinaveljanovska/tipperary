

var config = {
  packages: [
    "109267",
    "111329",
    "114686",
    "117098",
    "118587",
    "122090",
    "124083"
  ],
  item_id: getParameterByName('id'),
  service_url: "https://services.inplayer.com"
}



$('.inplayer-paywall-logout').parent().hide();

paywall.on('authenticated', function () {
  $('.inplayer-paywall-login').parent().hide();
  $('.inplayer-paywall-logout').parent().show();
});

paywall.on('logout', function () {
  location.reload();
});

$('#weekend-pass').click(() => {
  paywall.showPaywall({
    asset: {
      assetId: 124080,
      preselectedFeeId: 140835
    }
  });
})


// $('#asset-btn').click(() => {
//   paywall.showPaywall({
//     asset: {
//       assetId: 122046
//     }
//   });
// })
$('#season-pass').click(() => {
  paywall.showPaywall({
    asset: {
      assetId: 109261,
      preselectedFeeId: 132884
    }
  });
})


paywall.on('access', (e, data) => {
  // debugger;
  // if (data.hasAccess == true && data.asset.id == 109263) {
  //   $('#weekend-pass').hide();
  //   console.log(`id is 109263 - weekend pass`)
  // }
  // if (data.hasAccess == true && data.asset.id == 109261) {
  //   $('#season-pass').hide();
  //   console.log(`id is 109261 - season pass`)

  // }
})

function createItemElement(assetId, assetPhoto, assetTitle, assetDesc) {
  var output =
    '<div class="package-item"><div class="content" style="background-image:url(' +
    assetPhoto +
    ')">';
  output +=
    '<a href="./item.html?id=' +
    assetId +
    '" class="overlay-link"></a></div><div class="item-label"><div class="name">';
  output += '<a href="./item.html?id=' +
    assetId +
    '" class="overlay-link"><h3>' + assetTitle + '</h3></a>';
  output += '<div class="assetDesc">' + assetDesc + '</div>';
  output += "</div>";
  output += "</div></div>";
  return output;
}


config.packages.forEach((package, i) => {
  $.get(config.service_url + "/items/packages/" + package, response => {
    // console.log(response.id)
    var packageTitle = response.title;

    $("#package-title-" + package).html(packageTitle);

    $.get(
      config.service_url + "/items/packages/" + package + "/items?limit=500",
      response => {
        console.log($('#package-title-' + package))

        var output = "";

        for (var i = 0; i < response.collection.length; i++) {
          var asset = response.collection[i];
          // var asset1 = asset.access_fees;

          var assetId = asset.id;
          var assetPhoto = asset.metahash.paywall_cover_photo;

          var assetDesc = asset.metahash.preview_description;
          // console.log(assetDesc);

          var assetTitle = asset.title;
          output += createItemElement(assetId, assetPhoto, assetTitle, assetDesc);
          document.getElementById(
            "package-items-" + package
          ).innerHTML = output;

        } // for


      }
    ); // get items
  }); // get packages
}); //for each

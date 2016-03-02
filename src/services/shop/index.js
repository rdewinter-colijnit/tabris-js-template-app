/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/

var resizeImageURLByWidth = require('./../../helpers/img_resize').resizeImageURLByWidth;

function getItems(feedConfig){
	return new Promise(function(resolve, reject) {


    var qq = {
 			catalog: "672oqm0oqpyrc4ullpfeclz66", // jewlerry
 			//catalog:"0135pruepnxsbh6gw2ve714rv", //flowers
 			account:"bbhntrjt16yvunll9iyayufn4",
 			//keyword: "Fossil Watch Men",
 			keyword: "G-shock",
 			category: 1,
 			include_discounts: "true",
 			results_per_page: 100,
 			//price_min: 2000
 			//page: 1
 		}

 		var str = '';
 		var tmp = []
 		for (var key in qq){
 			tmp.push(key + "=" + encodeURIComponent(qq[key]));
 		}
 		str = tmp.join("&");
 	// 	console.log("https://www.popshops.com/v3/products.json?" + str);


 		fetch( "https://www.popshops.com/v3/products.json?" + str ).then(function( res ){
			return res.json();
		}).then(function( res ){
			var itemsProcessed = res.results.products.product;
			itemsProcessed.forEach(function(item){
        console.log(item.title);
        item.title = item.name;
        item.image = resizeImageURLByWidth ( item.image_url_large );
			});
			resolve(itemsProcessed);
		}).catch(function (err){
			reject(err);
		});
	});
}

module.exports = {
	getItems: getItems
};

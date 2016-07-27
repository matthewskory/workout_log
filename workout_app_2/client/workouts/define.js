// $(function() {

// 	$("#define-success").hide();
// 	$("#define-fail").hide();
// 	// takes WorkoutLog object and merges in another module on top of it
//     $.extend(WorkoutLog, {
//         definition: {
//             userDefinitions: [],
//             create: function() {
//                 var def = {
//                     desc: $("#def-description").val(),
//                     type: $("#def-logtype").val()
//                 };
//                 var postData = {
//                     definition: def
//                 };
//                 var define = $.ajax({
//                     type: "POST",
//                     url: WorkoutLog.API_BASE + "definition",
//                     data: JSON.stringify(postData),
//                     contentType: 'application/json'
//                 });

//                 define.done(function(data) {
//                     WorkoutLog.definition.userDefinitions.push(data.definition);
//                 });

//                 define.fail(function() {
//                     console.log('oh no');
//                 });
//             },

//             delete: function(){
//             	var thisDefId = {

//             		id: $("#log-definition").find("option:selected").val()
//             	};
//             	var deleteData = { definition: thisDefId };
// 				var deleteDefinition = $.ajax({
// 					type: "DELETE",
// 					url: WorkoutLog.API_BASE + "definition",
// 					data: JSON.stringify(deleteData),
// 					contentType: "application/json"
// 				});

// 				// removes value and hides option
// 				$("select option:selected").text("");
// 				$("select option:selected").hide();

// 				// removes option (definition) from array
// 				for(var i = 0; i < WorkoutLog.definition.userDefinitions.length; i++){
// 					if(WorkoutLog.definition.userDefinitions[i].id == thisDefId.id){
// 						WorkoutLog.definition.userDefinitions.splice(i, 1);
// 					}
// 				}
// 				deleteDefinition.fail(function(){
// 					console.log("nope. you didn't delete category.");
// 				});
//             },

//             fetchAll: function() {
//                 var getDefs = $.ajax({
//                         type: "GET",
//                         url: WorkoutLog.API_BASE + "definition",
//                         headers: {
//                             "Authorization": window.localStorage.getItem("sessionToken")
//                         }
//                     })
//                     .done(function(data) {
//                         WorkoutLog.definition.userDefinitions = data;
//                     })
//                     .fail(function(err) {
//                         console.log(err);
//                     });
//             }
//         }
//     });

//     $("#def-save").on("click", WorkoutLog.definition.create);

//     if (window.localStorage.getItem("sessionToken")) {
//         WorkoutLog.definition.fetchAll();
//     }
// });

//ryans code below------------------------------------------------
$(function(){
	
	$("#define-success").hide();
	$("#define-fail").hide();
	// takes WorkoutLog object and merges in another module on top of it
	$.extend(WorkoutLog, {
		definition: {
			// mine is singular - yours might be "userDefinitions"
			userDefinitions: [],
			// updating the array with new additions
			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data){
					WorkoutLog.definition.userDefinitions.push(data.definition);
					// show success
					$("#define-success").fadeIn();
					// clear inputted fields
					$("#def-description").val("");
				});
				define.fail(function(){
					console.log("yea...so...that didn't work");
					$("#define-fail").fadeIn();
				});
			},

			delete: function(){
				var thisDefId = {
					// targets select element, then traverses down to find value of option that's selected
					id: $("#log-definition").find("option:selected").val()
				};
				var deleteData = { definition: thisDefId };
				var deleteDefinition = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});
				
				// removes value and hides option
				$("select option:selected").text("");
				$("select option:selected").hide();

				// removes option (definition) from array
				for(var i = 0; i < WorkoutLog.definition.userDefinitions.length; i++){
					if(WorkoutLog.definition.userDefinitions[i].id == thisDefId.id){
						WorkoutLog.definition.userDefinitions.splice(i, 1);
					}
				}

				deleteDefinition.fail(function(){
					console.log("nope. you didn't delete category.");
				});
			},

			fetchAll: function(){
				var getDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					// explictly sending header with request
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data){
					// return data from our Definition.findAll query
					WorkoutLog.definition.userDefinitions = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}
		}
	});





	// bind events
	// makes an ajax call based on which button you click
	$("#def-save").on("click", WorkoutLog.definition.create);
	
	// targets id of "Delete Category" span
	$("#delete-category").on("click", WorkoutLog.definition.delete);

	// if page is refreshed or at login and sessionToken is valid, fetch all
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});
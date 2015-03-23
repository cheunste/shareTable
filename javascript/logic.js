
$(function(){
	var field= $('input[type="text"]');
	var checkBtn=$("input[type='checkbox']");
	var $state;
	$(field).change(function(op){
		updateEntries(this.id);
	});

	$(checkBtn).change(function(op){
		updateCheckInput(this.id);
	});
});

//This function handles all the updates from any input field and 
//broadcasts it to all users who are currently using the whiteboard
function updateEntries(id){

	var elem = document.getElementById(id);
	//var id = val.id;
	var $state;
	sharejs.open(id, 'text', function(error, doc) {
			if(error){
				console.log("An Error occured: "+error+". Please contact Stephen.");
			}
			else{
				elem.disabled=false;
				doc.attach_textarea(elem);
			}
	});
}


//This funciton specifically updates the state of the radio buttons
//
function updateRadioInput(id){
}


function updateCheckInput(id,mode){

	var elem = document.getElementById(id);
	var onState	=1;
	var offState=0;
	var $state;
	sharejs.open(id,"json",function(error,doc){

		if(doc.created){
			doc.set({state:[offState]});
		}

		$state = doc.at('state');

		if(mode==="ONLOAD"){
			var getState=$state.get();
			if(getState==onState){
				$(elem).prop('checked',true);
			}
			if(getState==offState){
				$(elem).prop('checked',false);
			}
		}
		else{
			if($(elem).is(':checked')===true){
				$state.set(onState);
				dateSet(elem,true);
			}
			else{
				$state.set(offState);
				dateSet(elem,false);
			}
		}


		doc.on('change',function(op){
			$.each(op,function(key,val){
				$.each(val,function(key2,val2){
					if(key2=="oi"){
						if(val2==onState){
							$(elem).prop('checked',true);
						}
						else if (val2==offState){
							$(elem).prop('checked',false);
						}
					}

				});
			});
		});
	});
	console.log("???????");
	return;
}
//This function puts the timestamp of the site in the on/off section
function dateSet(elem,state){

	//Import from parameters
	siteName		=$(elem).attr("id").toString();
	siteOnOffDate	=(siteName.slice(0,-(("check").length+1)))+'-onoffDate';

	//Date and time stamp related:
	var dt		=new Date();
	var month	=(dt.getMonth()+1).toString();
	var day		=dt.getDate().toString();
	var hour	=dt.getHours().toString();
	var minute	=(dt.getMinutes() <10 ? '0':'')+dt.getMinutes().toString();

	var dateString=(state ? "ON": "OFF")+" "+month+"/"+day+" at "+hour+":"+minute;

	$("#"+siteOnOffDate).val(dateString);
	//Open up a sharejs document. update the snapshot and then update to all users
	sharejs.open(siteOnOffDate, 'text', function(error, doc) {
			if(error){
				console.log("An Error occured: "+error+". Please contact Stephen.");
			}
			else{
				doc.del(0,doc.getText().length);
				doc.insert(0,dateString);
			}
	});
}

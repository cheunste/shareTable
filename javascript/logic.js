
$(function(){
	var field= $('input[type="text"]');
	//var radioInput=$('input[type="radio"]');
	var checkBtn=$("input[type='checkbox']");
	var $state;
	$(field).change(function(op){
			
		updateEntries(this.id);
	});

	$(checkBtn).change(function(op){
		updateCheckInput(this.id);
	});
	//console.log("$STATE: " +$state);	

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
	console.log("RADDA RADDA: "+elem);

	var $state;
	sharejs.open(id,"json",function(error,doc){

		if(doc.created){
			doc.set({state:[offState]});
		}

		$state = doc.at('state');
		doc.on('change',function(op){
			console.log("OP: "+op);
			$.each(op,function(key,val){
				$.each(val,function(key2,val2){
					if(key2=="oi"){

						if(val2==onState){
							$(elem).prop('checked',true);
							//add code to state on off date auotmatically
							dateSet(elem,true);
						}
						else if (val2==offState){
							$(elem).prop('checked',false);
							//add code to state on off date auotmatically
							dateSet(elem,false);
						}
					}
				});
			});


		});

		//You do not need to calll dateSet in the onload state since the database will auotomatically load the last known state
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
			}
			else{
				$state.set(offState);
			}
		}

	});

}

//This function puts the timestamp of the site in the on/off section
function dateSet(elem,state){

	//Import from parameters
	siteName		=$(elem).attr("id").toString();
	siteOnOffDate	=(siteName.slice(0,-(("check3").length+1)))+'-onoffDate';

	//Date and time stamp related:
	var dt		=new Date();
	var month	=dt.getMonth().toString();
	var day		=dt.getDate().toString();
	var hour	=dt.getHours().toString();
	var minute	=dt.getMinutes().toString();

	var onOffTag	=document.getElementById(siteOnOffDate);

	var testLine=(state ? "ON": "OFF")+" "+month+"/"+day+" "+hour+":"+minute;

	//Open up a sharejs document. update the snapshot and then update to all users
	sharejs.open(siteOnOffDate, 'text', function(error, doc) {
			if(error){
				console.log("An Error occured: "+error+". Please contact Stephen.");
			}
			else{
				onOffTag.disabled=false;
				doc.del(0,doc.getText().length);
				doc.insert(0,testLine);
			}
	});
//	return;
}

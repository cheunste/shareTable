$(document).ready(function(){
	var siteTable="#siteTable";

	var siteArray = ['site1','site2','site3','site4','site5'];

	siteArray.sort();

	var headerRow = $(
	' <tr>'+
		'<th class="header">On-site					</th>'+ 
		'<th class="header">On/Off Site Date		</th>'+ 
		'<th class="header">Plant					</th>'+ 
		'<th class="header">Date					</th>'+ 
		'<th class="header">Turbines Faulted		</th>'+ 
		'<th class="header">Turb In Comms			</th>'+ 
		'<th class="header">Date					</th>'+ 
		'<th class="header">On-Call Primary			</th>'+ 
		'<th class="header">On-Call Secondary		</th>'+ 
		'<th class="header">Comments/Notes			</th>'+ 
	'</tr>'
	);

	$(siteTable).append(headerRow);
	for (site in siteArray){

		//Append to table
		
		siteName = siteArray[site]
		console.log(siteName);
		var row=$(	
		"<tr>"+
			//'<td class="center"><input type="checkbox" id="'+siteName+'-onSite"/>			</td>'+	
			'<td class="checkCenter">'+
				'<input type ="checkbox" id="'+siteName+'-check3">'+
			'</td>'+
			'<td><input type="text" id="'+siteName+'-onoffDate">							</td>'+
			'<td><input type="text" id="'+siteName+'">										</td>'+
			'<td><input type="text" id="'+siteName+'-date">									</td>'+
			'<td><input type="text" id="'+siteName+'-faults">								</td>'+
			'<td><input type="text" id="'+siteName+'-comms">								</td>'+
			'<td><input type="text" id="'+siteName+'-endDate">								</td>'+
			'<td><input type="text" id="'+siteName+'-onCallPrim">							</td>'+
			'<td><input type="text" id="'+siteName+'-onCallSec">							</td>'+
			'<td><input type="text" id="'+siteName+'-notes">								</td>'+
		"</tr>"	
		);	
		$(siteTable).append(row);	


	}

	//The following function calls are to update all input fields on document load.
	var fields = $("input[type='text']");
	$.each(fields,function(key,val){
		//See logic.js for method
		updateEntries(val.id);
			
	});

	var checkBtn=$("input[type='checkbox']");
	$.each(checkBtn,function(key,val){
		updateCheckInput(val.id,"ONLOAD");
	});


});

$(document).ready(function(){
	var siteTable="#siteTable";

//	var siteArray = [
//		'site01', 'site02', 'site03', 'site04', 'site05', 'site06', 'site07', 'site08', 'site09', 'site10', 'site11', 'site12', 'site13', 'site14', 'site15', 'site16', 'site17', 'site18', 'site19', 'site20', 'site21', 'site22', 'site23', 'site24', 'site25', 'site26', 'site27', 'site28', 'site29', 'site30', 'site31', 'site32', 'site33', 'site34', 'site35', 'site36', 'site37', 'site38', 'site39', 'site40', 'site41', 'site42', 'site43', 'site44', 'site45', 'site46', 'site47', 'site48', 'site49', 'site50'
//	];

	var siteArray=[
		'Baffin Bay',
		'Barton',
		'Barton Chapel',
		'Big Horn',
		'Big Horn II',
		'Blue Creek',
		'Buffalo Ridge I',
		'Buffalo Ridge II',
		'Casselman',
		'Cayuga Ridge',
		'Colorado Green',
		'Copper Crossing',
		'Dillon MVIII',
		'Dry Lake I and II',
		'Elk River',
		'Elm Creek',
		'Elm Creek II',
		'Farmers City',
		'Flying Cloud',
		'Groton',
		'Hardscrabble',
		'Hay Canyon',
		'Hoosac',
		'Juniper Canyon',
		'Klondike I II',
		'Klondike III IIIA',
		'Leaning Juniper 2',
		'Lempster',
		'Locust Ridge',
		'Locust Ridge II',
		'Manzana',
		'MinnDakota',
		'Moraine I and II',
		'New Harvest',
		'Pebble Springs',
		'Penascal I and II',
		'Providence Heights',
		'Rugby',
		'San Luis',
		'Shiloh',
		'South Chestnut',
		'Star Point',
		'Top of Iowa II',
		'Trimont',
		'Twin Buttes',
		'Winnebago'
	];

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
		
		//siteName = siteArray[site].replace(" and ","and").replace(" ","");
		siteName = siteArray[site].replace(/ /g,"");
		console.log(siteName);
		var row=$(	
		"<tr>"+
			//'<td class="center"><input type="checkbox" id="'+siteName+'-onSite"/>			</td>'+	
			'<td class="checkCenter yellow">'+
				'<input type ="checkbox" id="'+siteName+'-check">'+
			'</td>'+
			'<td class="yellow"><input class="yellow" type="text" id="'+siteName+'-onoffDate">							</td>'+
			//'<td><input type="text" id="'+siteName+'">										</td>'+
			'<td class="yellow"><div class="yellow" id="'+siteName+'">'+siteArray[site].replace("and","&")+											'</div></td>'+
			'<td><input type="text" id="'+siteName+'-date">									</td>'+
			'<td><input type="text" id="'+siteName+'-faults">								</td>'+
			'<td><input type="text" id="'+siteName+'-comms">								</td>'+
			'<td class="green"><input class="green" type="text" id="'+siteName+'-endDate">								</td>'+
			'<td class="green"><input class="green" type="text" id="'+siteName+'-onCallPrim">							</td>'+
			'<td class="green"><input class="green" type="text" id="'+siteName+'-onCallSec">							</td>'+
			'<td class="green"><input class="green" type="text" id="'+siteName+'-notes">								</td>'+
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

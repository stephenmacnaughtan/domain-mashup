// global namespace
var DOMAINMASHUP = {
	"available": "available",
	"unavailable": "unavailable",
	"displayWrapper": "ul",
	"displayItem": "li",
	"words": [],
	"names": [],
	"startSearch": function(id){
		this.nameIndex = 0;
		this.id = id;

		//Get list from local storage
		this.checkedNames = this.retrieveObject();
		this.sCheckedNames = JSON.stringify(this.checkedNames);

		//display the list
		this.makeList();

		//get words from json file
		this.getWords();
	},
	"retrieveObject": function(){
		var retrievedObject = localStorage.getItem(this.id+'CheckedNames');
		if(retrievedObject != null){
			return JSON.parse(retrievedObject);
		}else{
			return [];
		}
	},
	"makeList": function(){
		//Create local variables for easier reading
		var avail = this.available,
		unavail = this.unavailable,
		wrap = this.displayWrapper,
		item = this.displayItem,
		names = this.checkedNames;

		$("."+avail+" "+wrap).empty();
		$("."+unavail+" "+wrap).empty();

		for(var i=0; i < names.length; i++){
			if(names[i].available == true){
				$("."+avail+" "+wrap).prepend('<'+item+'>'+names[i].domain+'</'+item+'>');
			}else{
				$("."+unavail+" "+wrap).prepend('<'+item+'>'+names[i].domain+'</'+item+'>');
			}
		}
	},
	"getWords": function(){
		var self = this;
		$.get('data/'+this.id+'.json',
			function(data){
				self.words = data;
				//make the name combinations
				self.makeNames(self);		
			}
		);
	},
	"makeNames": function(){
		//loop through all words to get first word of name pair
		for(var firstWordIndex = 0; firstWordIndex < this.words.length; firstWordIndex++){
			//loop through all names to get the second word of the pair
			for(var secondWordIndex = 0; secondWordIndex < this.words.length; secondWordIndex++){
				this.names.push(this.words[firstWordIndex].name+this.words[secondWordIndex].name);
			}
		}

		//Lookup the domains from the names we just formed
		this.lookupDomain();
	},
	"lookupDomain": function(){
		//looks up one domain at a time
		var domain = this.names[this.nameIndex]+'.com',
		hasBeenChecked = false,
		timeOut = 1000 * 0,
		self = this;

		//check the current name hasn't already been checked
		if(this.sCheckedNames){
			if(this.sCheckedNames.search(domain) != -1){
				hasBeenChecked = true;
			}
		}

		if(hasBeenChecked == false){
			$.get('lookup.php?query=checkdomain&domain='+domain,
				function(data){
					if(data.status == "success"){
						//add to the names array
						console.log(data);
						self.checkedNames.push(data);					
					}else{
						// show the result
						console.log(data.status);
					}

					//Go to the next name
					setTimeout(function() {
						self.goToNextName();
					}, timeOut);
				}
			);
		}else{
			console.log(this.names[this.nameIndex]+'.com: '+hasBeenChecked);
			this.goToNextName();
		}
	},
	"goToNextName": function(){
		//check we're not on the last name
		if(this.nameIndex < this.names.length){
			//update local storage
			localStorage.setItem(this.id+'CheckedNames', JSON.stringify(this.checkedNames));

			//get from storage
			this.checkedNames = this.retrieveObject(this.id);
			this.sCheckedNames = JSON.stringify(this.checkedNames);

			//update list
			this.makeList();

			//update index
			this.nameIndex++;

			//loop
			this.lookupDomain();
		}
	}
}
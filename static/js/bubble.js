d3.csv("Data/combo-michelin-restaurants-stars.csv")
.then(function(data){

    // log cuisine types 
    var cuisines = data.map(data => data.cuisine);

    // Gather list of unique cuisines 
    var cuisineSet = new Set(cuisines);
    var cuisineList = Array.from(cuisineSet);

    // Initiate empty list to hold the count of each cuisine 
    var numCuisineList = [];

    // Loop through the full data set to get count of each cuisine 
    for (let i = 0; i < cuisineList.length; i++){
        
        var numCuisine = 0;
        cuisineSearch = data.filter(d => d.cuisine == cuisineList[i]);

        
        numCuisine = Object.keys(cuisineSearch).length;

        numCuisineList.push(numCuisine);

    };

    console.log(numCuisineList);

}).catch(function(error) {
    console.log(error);
  });

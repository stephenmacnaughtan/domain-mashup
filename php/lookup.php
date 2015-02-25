<?php
	//Get your API Key by signing up for free here - freedomainapi.com
	$domain = $_GET['domain'];
	$apiKey = "YOUR KEY HERE";

	checkDomain($domain, $apiKey);	

	function checkDomain($domain, $apiKey){
		// create curl resource 
	    $ch = curl_init(); 

	    // set url 
	    curl_setopt($ch, CURLOPT_URL, 'freedomainapi.com/?key='.$apiKey.'&domain='.$domain); 

	    //return the transfer as a string 
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

	    // $output contains the output string 
	    $output = curl_exec($ch); 

	    // close curl resource to free up system resources 
	    curl_close($ch);  

	    header('Content-Type: application/json');
		echo $output;
		//echo json_encode($output);
	}
?>
#!/bin/bash
var=$(grep $1 library.xml);
if [ -z "$var" ] 
	then
	ext=$(echo "$(youtube-dl -F $1 | grep "audio only" | tail -n1 | cut -d ' ' -f 11)");
	
	query=$3;

	$(java -jar Process.jar $query);
	var=$(cat output.txt);
	
	
	#sed -i.bak 's/<\/songs>//' library.xml
	#sed -i.bak 's/<\/songs>//' queue.xml
	#echo "<song><url>$1</url><name>$2</name><artist></artist><album></album><time></time><file>$2.$ext</file></song>" >> library.xml;
	#echo "<song><url>$1</url><name>$2</name><artist></artist><album></album><time></time><file>$2.$ext</file></song>" >> queue.xml;
	#echo "</songs>" >> library.xml;
	#echo "</songs>" >> queue.xml;
	#echo "here";
	#$(java -jar Process.jar $1);



	$(wget -o output.html "$var");
	file=$(grep "Saving to" output.html | cut -d ' ' -f 3 | sed 's/^.\(.*\).$/\1/');
	echo "File $file";

	if [ -z "$file" ]; then
		file="N/A";
	fi

	name=$(grep -m 1 "colspan=\"2\" class=\"summary\" style=\"text-align:center;font-size:125%" $file | cut -d "\"" -f 8);
	
	if [ -z "$name" ]; then
		name=$2;
	fi	

	lineNum=$(grep -nm 1 "Length" $file | cut -d ':' -f 1);
	lineNum=$((lineNum+1));
	timeVar=$(sed -n "${lineNum}p" $file | cut -d '>' -f 2 | cut -d '<' -f 1);

	if [ -z "$timeVar" ]; then
		timeVar="N/A";
	fi

	artist=$(grep -m 1 "<th colspan=\"2\" class=\"description\" style=\"text-align:center" $file | cut -d '"' -f 14);

	if [ -z "$artist" ]; then
		artist="N/A";
	fi

	youtube-dl -f bestaudio  $1 -o "~/Music/$name.$ext";

	sed -i.bak 's/<\/songs>//' library.xml
	echo "<song><url>$1</url><name>$name</name><artist>$artist</artist><album></album><time>$timeVar</time><file>$name.$ext</file></song>" >> library.xml;
	echo "</songs>" >> library.xml;

	rm $file;
	rm output.html;


else 
	sed -i.bak 's/<\/songs>//' queue.xml;
	echo "$var" >> queue.xml;
	echo "</songs>" >> queue.xml;
fi

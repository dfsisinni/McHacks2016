var=$(grep $1 library.xml);
if [ -z "$var" ]; 
then
	echo "ok";
else
	sed -i.bak 's/<\/songs>//' queue.xml;
	echo "$var" >> queue.xml;
	echo "</songs>" >> queue.xml;
fi

ext=$(echo "$(youtube-dl -F $1 | grep "audio only" | tail -n1 | cut -d ' ' -f 11)");
youtube-dl -f bestaudio  $1 -o "~/Music/$2.$ext";
echo "Downloaded";
sed -i.bak 's/<\/songs>//' library.xml
sed -i.bak 's/<\/songs>//' queue.xml
echo "<song><url>$1</url><name>$2</name><artist></artist><album></album><time></time><file>$2.$ext</file></song>" >> library.xml;
echo "<song><url>$1</url><name>$2</name><artist></artist><album></album><time></time><file>$2.$ext</file></song>" >> queue.xml;
echo "</songs>" >> library.xml;
echo "</songs>" >> queue.xml;
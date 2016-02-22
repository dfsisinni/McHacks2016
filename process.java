import java.io.IOException;

public class process {

	

	public static void main (String [] args) throws IOException {
		System.out.println(args[0]);
	}

	public static String getVideoId (String watchLink) {
		return watchLink.substring(watchLink.length() - 11);
	}

}
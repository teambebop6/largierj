package com.cnhalo.largierj;

//import com.cnhalo.largierj.model.Concert;
//import com.mongodb.DB;
//import com.mongodb.DBCursor;
//import com.mongodb.MongoClient;
//import com.mongodb.MongoCredential;
//import com.mongodb.client.FindIterable;
//import com.mongodb.client.MongoCollection;
//import com.mongodb.client.MongoDatabase;
//import java.util.Date;
//import java.util.Iterator;
//import org.apache.commons.lang3.time.DateFormatUtils;
//import org.bson.Document;

/**
 * Created by Henry Huang on 2022/9/24.
 */
public class EventsExport {

//    public static void main(String[] args) {
//
//        String hostname = "0.0.0.0";
//        String dbName = "app";
//        int port = 27017;
//
//        MongoClient mongoClient = new MongoClient(hostname, port);
//        MongoDatabase database = mongoClient.getDatabase(dbName);
//
//        System.out.println("");
//        System.out.println("");
//        System.out.println("");
//
//        MongoCollection<Document> collection = database.getCollection("events");
//        FindIterable findIterable = collection.find();
//        Iterator it = findIterable.iterator();
//        while (it.hasNext()) {
//            Document document = (Document) it.next();
//            Concert concert = new Concert();
//            concert.setTitle(document.getString("title"));
//            concert.setLocation(document.getString("location"));
//            concert.setVenue(document.getString("venue"));
//            concert.setDate(document.getDate("date"));
//            concert.setLink(document.getString("link"));
//            concert.setType(document.getString("type"));
//            concert.setSortOrder(document.getInteger("order"));
//            concert.setVisible(document.getBoolean("visible"));
//            concert.setCreationDate(document.getDate("creation_date"));
//            concert.setLastModifiedDate(document.getDate("last_modified_date"));
//            System.out.println(toSQL(concert));
//        }
//
//    }
//
//    private static String toSQL(Concert concert) {
//
//        String format = "insert into concert (title, location, date, link, type, visible, sort_order, creation_date, last_modified_date, venue) values ('%s', '%s',  %s, '%s', '%s', %d, %d, %s, %s, '%s');";
//
//        return String.format(format,
//            null2Empty(concert.getTitle()),
//            null2Empty(concert.getLocation()),
//            useParseDateTime(concert.getDate()),
//            null2Empty(concert.getLink()),
//            null2Empty(concert.getType()),
//            concert.getVisible() ? 1 : 0,
//            concert.getSortOrder(),
//            useParseDateTime(concert.getCreationDate()),
//            useParseDateTime(concert.getLastModifiedDate()),
//            null2Empty(concert.getVenue())
//        );
//    }
//
//    private static String null2Empty(String str) {
//        return str == null ? "" : str;
//    }
//
//    private static String formatDate(Date date) {
//        return date == null ? "" : DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss.SSS");
//    }
//
//    private static String useParseDateTime(Date date) {
//        String dateString = formatDate(date);
//        if (dateString.isEmpty()) {
//            return "null";
//        } else {
//            return "parsedatetime('" + dateString + "', 'yyyy-MM-dd HH:mm:ss.SSS')";
//        }
//    }

}

import mysql.connector 

def get_db_connection():
    return mysql.connector.connect(
        host= "bbzs5uhupardgtjsrj2e-mysql.services.clever-cloud.com",
        user="unqepeoln1jfpyhn",
        password="xMaEL61aZuYjz0iL9CVw",
        database="bbzs5uhupardgtjsrj2e"
    )


package com.mycompany.eleven.store.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class conexion {

    private static final String URL = "jdbc:mysql://localhost:3306/elevenstore";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public Connection conectar() {

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection conexion = DriverManager.getConnection(URL, USER, PASSWORD);

            System.out.println("Conexión exitosa a MySQL.");

            return conexion;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        }

    }

}
package com.mycompany.eleven.store;

import com.mycompany.eleven.store.conexion.conexion;

public class PruebaConexion {

    public static void main(String[] args) {

        conexion prueba = new conexion();

        prueba.conectar();

    }

}
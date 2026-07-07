/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.mycompany.eleven.store.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.mycompany.eleven.store.conexion.conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.mindrot.jbcrypt.BCrypt; 

/**
 *
 * @author FIDEL JR
 */
@WebServlet(name = "RegistroServlet", urlPatterns = {"/registro"})
public class RegistroServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet RegistroServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RegistroServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

    response.setContentType("text/html");

    PrintWriter out = response.getWriter();

    out.println("<h1>EL SERVLET FUNCIONA</h1>");
}

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
   @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

    String nombre = request.getParameter("nombre");
    String correo = request.getParameter("correo");
    String usuario = request.getParameter("usuario");
    String password = request.getParameter("password");

    conexion con = new conexion();
    Connection cn = con.conectar();
    System.out.println(cn);
    
    if (cn == null) {
    response.getWriter().println("ERROR: La conexión es NULL");
    return;
} else {
    System.out.println("La conexión llegó correctamente al Servlet.");
}

    try {

        String sql = "INSERT INTO usuarios (nombre, correo, usuario, password) VALUES (?, ?, ?, ?)";

        PreparedStatement ps = cn.prepareStatement(sql);
        
        String passwordEncriptada = BCrypt.hashpw(password, BCrypt.gensalt());

        ps.setString(1, nombre);
        ps.setString(2, correo);
        ps.setString(3, usuario);
        ps.setString(4, passwordEncriptada); 

        int resultado = ps.executeUpdate();

        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        if (resultado > 0) {

            out.println("<h1>✅ Usuario registrado correctamente.</h1>");

        } else {

            out.println("<h1>❌ No fue posible registrar el usuario.</h1>");

        }

    } catch (SQLException e) {

        response.getWriter().println("Error: " + e.getMessage());

    }

}
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
